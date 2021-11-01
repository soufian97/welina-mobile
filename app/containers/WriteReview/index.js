import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Switch } from 'react-native';
import { Style } from './style';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import GoBackHeader from '../../components/Headers/GobackHeader';
import i18n from '../../config/i18n';
import I18n from '../../components/I18n';
import { translation } from './message';
import {
  RatingEmptyStar,
  RadioButtonIcon,
  RatingStar,
  Quote,
} from '../../assets/svgs';
import Button from '../../components/Buttons/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../utils/colors';
import ProgressLoader from 'rn-progress-loader';
import { addReviewAction } from './store/actions.creator';
import { getLoadingStateSelector } from './store/selectors';
import writeReviewReducer from './store/reducer';
import writeReviewSaga from './store/saga';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { useInjectReducer } from '../../utils/store/injectReducer';
import { useInjectSaga } from '../../utils/store/injectSaga';
import { routes } from '../../utils/navigation/routes';
import { ERROR_MODAL } from '../../config/app.constant';
import { openModal } from '../Modal/store/actions.creator';

const WriteReview = ({
  addReviewAction,
  addReviewLoading,
  openModal,
  route,
  navigation,
}) => {
  useInjectReducer(writeReviewReducer);
  useInjectSaga(writeReviewSaga);

  const { user, item } = route.params;
  const _map = useRef(null);

  const initialRegion = {
    latitude: 30.597739,
    longitude: -3.635933,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };
  const size = { radius: 10, height: 45 };
  const [isRecommended, setIsRecommended] = useState(true);
  const [starRate, setStarRate] = useState(5);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [textComment, setTextComment] = useState('');

  useEffect(() => {
    _map.current &&
      _map.current.animateToRegion(
        {
          ...initialRegion,
        },
        800,
      );
  });

  const getRadioButtonState = (state) =>
    isRecommended === state ? (
      <RadioButtonIcon />
    ) : (
      <View style={Style.circle} />
    );

  const getStarState = (state) =>
    starRate >= state ? <RatingStar /> : <RatingEmptyStar />;

  const onPressStarRateHandler = (rate) => () => {
    setStarRate(rate);
  };

  const onPressRadioButtonHandler = (state) => () => {
    setIsRecommended(state);
  };

  const addReviewCallback = useCallback(
    (err) => {
      if (err) {
        openModal(ERROR_MODAL, {
          error: err?.response?.code,
          withBackground: false,
        });
      } else if (item) {
        navigation.replace(routes.COACH_DETAILS, {
          coachId: user.userId,
          item,
          reviewTab: 2,
        });
      } else {
        navigation.replace(routes.SURFER_PROFILE, { surferId: user.userId });
      }
    },
    [user, item, navigation, openModal],
  );

  const onPressSendReviewHandler = useCallback(() => {
    if (user.userId) {
      const review = {
        score: starRate,
        comment: textComment,
        recommend: isRecommended,
        isAnonymous,
      };
      addReviewAction({ userId: user.userId, review }, addReviewCallback);
    }
  }, [
    addReviewAction,
    addReviewCallback,
    user,
    isAnonymous,
    isRecommended,
    starRate,
    textComment,
  ]);

  return (
    <View style={Style.container}>
      <MapView
        ref={_map}
        style={Style.mapsStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        maxZoomLevel={2}
        customMapStyle={mapsStyle}
      />
      <View style={Style.topLayer}>
        <KeyboardAwareScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={Style.keyboardAvoidContainer}
        >
          <GoBackHeader />
          <View style={Style.firstQuestion}>
            <Text style={Style.textRegular}>
              {i18n.t(translation.howWouldYouRate.id, {
                name: `${user?.firstName} ${user?.lastName}`,
              })}
            </Text>
          </View>
          <View style={Style.ratingContainer}>
            <View style={Style.starContainer}>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <TouchableOpacity
                    style={Style.star}
                    key={`${index}`}
                    onPress={onPressStarRateHandler(index + 1)}
                  >
                    {getStarState(index + 1)}
                  </TouchableOpacity>
                ))}
            </View>
          </View>
          <Text style={Style.textRegular}>
            {i18n.t(translation.wouldYouRecommend.id, {
              name: `${user?.firstName} ${user?.lastName}`,
            })}
          </Text>
          <View style={Style.radioButtonContainer}>
            <TouchableOpacity
              style={Style.radioButton}
              onPress={onPressRadioButtonHandler(true)}
            >
              {getRadioButtonState(true)}
              <Text style={Style.texRadioButton}>
                <I18n {...translation.yes} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Style.radioButton}
              onPress={onPressRadioButtonHandler(false)}
            >
              {getRadioButtonState(false)}
              <Text style={Style.texRadioButton}>
                <I18n {...translation.no} />
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={Style.textBoldTitle}>
            <I18n {...translation.writeReview} />
          </Text>
          <Quote />
          <TextInput
            style={Style.textAreaInput}
            value={textComment}
            onChangeText={setTextComment}
            multiline={true}
            placeholder={i18n.t(translation.tellPeople.id)}
            placeholderTextColor={colors.GRAY}
          />
          <View style={Style.publicAnonymouslyContainer}>
            <Text style={Style.textRegular}>
              <I18n {...translation.publicAnonymously} />
            </Text>
            <Switch
              value={isAnonymous}
              thumbColor={isAnonymous ? colors.PRIMARY : colors.WHITE}
              trackColor={{
                true: colors.LIGHT_GRAY_BACKGROUND,
                false: colors.BLACK_OPACITY,
              }}
              onValueChange={setIsAnonymous}
            />
          </View>
          <Button
            title={i18n.t(translation.sendReview.id)}
            size={size}
            onPress={onPressSendReviewHandler}
          />
        </KeyboardAwareScrollView>
      </View>
      <ProgressLoader
        visible={addReviewLoading}
        isModal={true}
        isHUD={true}
        hudColor={colors.SECONDARY}
        color={colors.PRIMARY}
      />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  addReviewLoading: getLoadingStateSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openModal, addReviewAction }, dispatch);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WriteReview);
