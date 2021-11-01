import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import GoBackHeader from '../../components/Headers/GobackHeader';
import { Style } from './style';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { colors } from '../../utils/colors';
import MessageItem from './components/MessageItem';
import { getTokenSelector } from './store/selectors';
import { TwilioService } from '../../utils/twilio-service';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import messagesReducerConfig from './store/reducer';
import messagesSagaConfig from './store/saga';
import { getToken } from './store/actions.creator';
import { getCurrentUser } from '../Auth/store/selectors';
import { ERROR_MODAL, SURFER } from '../../config/app.constant';
import { routes } from '../../utils/navigation/routes';
import I18n from '../../components/I18n';
import { translation } from './messages';
import ProgressLoader from 'rn-progress-loader';
import { openModal } from '../Modal/store/actions.creator';

const Messages = ({ token, getToken, currentUser, navigation, openModal }) => {
  useInjectReducer(messagesReducerConfig);
  useInjectSaga(messagesSagaConfig);

  const [channels, updateChannels] = useState([]);
  const channelPaginator = useRef();
  const [loading, setLoading] = useState(false);

  const initialRegion = {
    latitude: 33.597739,
    longitude: -7.635933,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };
  const _map = useRef(null);

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
    _map.current &&
      _map.current.animateToRegion(
        {
          ...initialRegion,
        },
        800,
      );
  });

  const getSubscribedChannels = useCallback(
    (client) =>
      client.getSubscribedChannels().then((paginator) => {
        channelPaginator.current = paginator;
        return channelPaginator.current.items;
      }),
    [],
  );

  const addLastMessageToChannel = useCallback((channel) => {
    channel.getMessages().then((messages) => {
      const newMessages = TwilioService.getInstance().parseMessages(
        messages.items,
      );
      let newChannel = {
        ...channel.channelState,
        sid: channel.sid,
        lastRecentMessage: newMessages[0],
        delete: channel.delete(),
      };
      updateChannels((oldArray) => [...oldArray, newChannel]);
    });
  }, []);

  useEffect(() => {
    token &&
      Promise.resolve()
        .then(() => setLoading(true))
        .then(() => TwilioService.getInstance().getChatClient(token))
        .then(() => TwilioService.getInstance().addTokenListener())
        .then(getSubscribedChannels)
        .then((channels) => {
          channels.map(addLastMessageToChannel);
        })
        .then(() => setLoading(false))
        .catch(() => {})
        .finally(() => {});

    return () => TwilioService.getInstance().clientShutdown();
  }, [getSubscribedChannels, token, addLastMessageToChannel]);

  const handleChannelClicked = useCallback(
    (item) => () => {
      if (item) {
        let senderIndex = currentUser.type === SURFER ? 1 : 0;
        let lastName = item.friendlyName
          .split('-')
          [senderIndex].split('.')[0]
          .split('*')
          .join(' ');

        let firstName = item.friendlyName
          .split('-')
          [senderIndex].split('.')[1]
          .split('*')
          .join(' ');
        let id = item.uniqueName.split('.')[senderIndex];
        let sender = { lastName, firstName, id };
        navigation.navigate(routes.DISCUSSION, {
          item: sender,
        });
      }
    },
    [currentUser.type, navigation],
  );

  const deleteChannel = useCallback(
    (myChannel) => () => {
      myChannel.delete
        .then(function (channel) {
          let newChannels = channels;
          newChannels = newChannels.filter((item) => item.sid !== channel.sid);
          updateChannels(newChannels);
        })
        .catch((err) =>
          openModal(ERROR_MODAL, {
            error: err?.response?.code,
            withBackground: false,
          }),
        );
    },
    [channels, openModal],
  );

  return (
    <View style={Style.screen}>
      <MapView
        ref={_map}
        style={Style.maps}
        provider={PROVIDER_GOOGLE}
        maxZoomLevel={2}
        customMapStyle={mapsStyle}
      />
      <View style={Style.container}>
        <GoBackHeader />
        <Text style={Style.messagesText}>
          <I18n {...translation.messages} />
        </Text>
        <View>
          <FlatList
            data={channels}
            keyExtractor={(item) => `${item.sid}`}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={10}
            renderItem={({ item }) => {
              return (
                <MessageItem
                  key={`${item.sid}`}
                  item={item}
                  handleDelete={deleteChannel(item)}
                  currentUser={currentUser}
                  handleClick={handleChannelClicked(item)}
                />
              );
            }}
            ItemSeparatorComponent={() => {
              return <View style={Style.messageSeparator} />;
            }}
          />
        </View>
        <ProgressLoader
          visible={loading}
          isModal={true}
          isHUD={true}
          hudColor={colors.SECONDARY}
          color={colors.PRIMARY}
        />
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  token: getTokenSelector(),
  currentUser: getCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getToken,
      openModal,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Messages);
