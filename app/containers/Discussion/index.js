import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, Animated, Text, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import { Style } from './style';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ArrowLeft } from '../../assets/svgs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { sendSms } from './store/actions.creator';
import { getTokenSelector } from '../Messages/store/selectors';
import { getCurrentUser } from '../Auth/store/selectors';
import { TwilioService } from '../../utils/twilio-service';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import discussionReducerConfig from './store/reducer';
import discussionSagaConfig from './store/saga';
import messagesReducerConfig from '../Messages/store/reducer';
import messagesSagaConfig from '../Messages/store/saga';
import { ChatLoader } from './components/ChatLoader';
import {
  JOINED,
  SURFER,
  ANDROID,
  ERROR_MODAL,
} from '../../config/app.constant';
import { isEmpty } from 'lodash';
import { colors } from '../../utils/colors';
import I18n from '../../components/I18n';
import { translation } from './messages';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { getToken } from '../Messages/store/actions.creator';
import { openModal } from '../Modal/store/actions.creator';

export const Discussion = ({
  route,
  navigation,
  token,
  currentUser,
  sendSms,
  getToken,
  openModal,
}) => {
  useInjectReducer(discussionReducerConfig);
  useInjectSaga(discussionSagaConfig);
  useInjectReducer(messagesReducerConfig);
  useInjectSaga(messagesSagaConfig);

  const { item } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomConfig, setRoomConfig] = useState('');

  const chatClientChannel = useRef();
  const chatMessagesPaginator = useRef();

  const coordinate = {
    latitude: item?.location?.latitude || 23.7,
    longitude: item?.location?.longitude || -15.94,
  };

  const initialRegion = {
    latitudeDelta: 0.4864195044303443,
    longitudeDelta: 0.40142817690068,
  };

  const getReceiverType = () => {
    return currentUser.type === SURFER ? (
      <I18n {...translation.coach} />
    ) : (
      <I18n {...translation.surfer} />
    );
  };
  const renderHeader = () => {
    return (
      <View style={Style.header}>
        <TouchableOpacity style={Style.backButton} onPress={navigation.pop}>
          <ArrowLeft />
        </TouchableOpacity>
        <View style={Style.coachName}>
          <Text numberOfLines={1} style={Style.coachNameText}>
            {`${item.coachLastName || item.lastName} ${
              item.coachFirstName || item.firstName
            }`}
          </Text>
          <Text numberOfLines={1} style={Style.receiverType}>
            {currentUser && getReceiverType()}
          </Text>
        </View>
      </View>
    );
  };

  const setChannelEvents = useCallback((channel) => {
    chatClientChannel.current = channel;
    chatClientChannel.current.on('messageAdded', (message) => {
      const newMessage = TwilioService.getInstance().parseMessage(message);
      const { giftedId } = message.attributes;
      if (giftedId) {
        setMessages((prevMessages) => {
          if (prevMessages.some(({ _id }) => _id === giftedId)) {
            return prevMessages.map((m) =>
              m._id === giftedId ? newMessage : m,
            );
          }
          return [newMessage, ...prevMessages];
        });
      }
    });
    return chatClientChannel.current;
  }, []);

  const getFriendlyName = useCallback(() => {
    let currentData = `${currentUser.lastName
      .split(' ')
      .join('*')}.${currentUser.firstName.split(' ').join('*')}`;
    let senderData = `${(item.coachLastName || item.lastName)
      .split(' ')
      .join('*')}.${(item.coachFirstName || item.firstName)
      .split(' ')
      .join('*')}`;

    let friendlyName =
      currentUser.type === SURFER
        ? `${currentData}-${senderData}`
        : `${senderData}-${currentData}`;

    return friendlyName;
  }, [currentUser, item]);

  const getChannelId = useCallback(() => {
    let currentData = currentUser.id;
    let senderData = item.coachId || item.id;
    return currentUser.type === SURFER
      ? `${currentData}.${senderData}`
      : `${senderData}.${currentData}`;
  }, [currentUser, item]);

  useEffect(() => {
    if (currentUser && isEmpty(roomConfig)) {
      setRoomConfig({
        identity: getChannelId(),
        channelId: getChannelId(),
      });
    }
  }, [currentUser, getChannelId, item, roomConfig]);

  const onCreateOrJoin = useCallback(() => {
    TwilioService.getInstance()
      .getChatClient()
      .then((client) =>
        client
          .getChannelByUniqueName(roomConfig.channelId)
          .then((channel) =>
            channel.channelState.status !== JOINED ? channel.join() : channel,
          )
          .catch(() =>
            client
              .createChannel({
                uniqueName: roomConfig.channelId,
                friendlyName: getFriendlyName(),
              })
              .then((channel) => channel.join()),
          ),
      )
      .catch((err) =>
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        }),
      );
  }, [roomConfig.channelId, getFriendlyName, openModal]);

  const handleApiCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      }
    },
    [openModal],
  );

  useEffect(() => {
    !token && getToken(handleApiCallback);
  }, [getToken, handleApiCallback, token]);

  useEffect(() => {
    let componentMounted = true;

    token &&
      currentUser &&
      !isEmpty(roomConfig) &&
      Promise.resolve()
        .then(() => TwilioService.getInstance().getChatClient(token))
        .then(() => TwilioService.getInstance().addTokenListener())
        .then(onCreateOrJoin)
        .then(() => {
          TwilioService.getInstance()
            .getChatClient()
            .then((client) =>
              componentMounted
                ? client.getChannelBySid(roomConfig.channelId)
                : null,
            )
            .then((channel) =>
              componentMounted ? setChannelEvents(channel) : null,
            )
            .then((currentChannel) =>
              componentMounted ? currentChannel.getMessages() : null,
            )
            .then((paginator) => {
              if (componentMounted) {
                chatMessagesPaginator.current = paginator;
                const newMessages = TwilioService.getInstance().parseMessages(
                  paginator.items,
                );
                setMessages(newMessages);
              }
            });
        })
        .catch((err) =>
          openModal(ERROR_MODAL, {
            error: err?.response?.code,
            withBackground: false,
          }),
        )
        .finally(() => {
          componentMounted ? setLoading(false) : null;
        });

    return () => {
      TwilioService.getInstance().clientShutdown();
      componentMounted = false;
    };
  }, [
    currentUser,
    onCreateOrJoin,
    openModal,
    setChannelEvents,
    token,
    roomConfig,
  ]);

  const handleSendSmsToTheCoach = useCallback(() => {
    currentUser.firstName &&
      sendSms(
        {
          id: item.coachId || item.id,
          user: `${currentUser.lastName} ${currentUser.firstName}`,
        },
        handleApiCallback,
      );
  }, [currentUser, handleApiCallback, item, sendSms]);

  const onSend = useCallback(
    (newMessages = []) => {
      if (!loading) {
        if (messages.length === 0) {
          currentUser && handleSendSmsToTheCoach();
        }
        const attributes = { giftedId: newMessages[0]._id };
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, newMessages),
        );
        chatClientChannel.current?.sendMessage(newMessages[0].text, attributes);
      }
    },
    [currentUser, handleSendSmsToTheCoach, loading, messages.length],
  );

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: Style.secondaryText,
          left: Style.whiteText,
        }}
        linkStyle={{
          right: Style.secondaryText,
          left: Style.whiteText,
        }}
        timeTextStyle={{
          left: Style.whiteText,
          right: Style.secondaryText,
        }}
        tickStyle={{
          color: colors.SECONDARY,
        }}
      />
    );
  };

  return (
    <View style={Style.container}>
      <MapView
        style={Style.mapsStyle}
        initialRegion={{
          ...initialRegion,
          longitude: coordinate.longitude,
          latitude: coordinate.latitude,
        }}
        provider={PROVIDER_GOOGLE}
        minZoomLevel={2}
        maxZoomLevel={6}
        customMapStyle={mapsStyle}
      />
      {renderHeader()}
      <Animated.View style={Style.topLayer}>
        {loading ? (
          <ChatLoader />
        ) : (
          <>
            <GiftedChat
              messages={messages}
              alwaysShowSend={true}
              renderAvatarOnTop
              bottomOffset={Platform.select({
                ios: () => 33,
                android: () => 0,
              })()}
              renderBubble={renderBubble}
              onSend={(messages) => onSend(messages)}
              user={{ _id: currentUser?.email }}
            />
            {Platform.OS === ANDROID ? <KeyboardSpacer /> : null}
          </>
        )}
      </Animated.View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: getCurrentUser(),
  token: getTokenSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendSms, openModal, getToken }, dispatch);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Discussion);
