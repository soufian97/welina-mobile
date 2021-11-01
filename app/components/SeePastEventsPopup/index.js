import React, { useCallback } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Style } from './style';
import { translation } from './messages';
import I18n from '../I18n';
import { colors } from '../../utils/colors';
import { ShakaIcon } from '../../assets/svgs';
import Button from '../Buttons/Button';
import i18n from '../../config/i18n';
import { COACH } from '../../config/app.constant';
import { routes } from '../../utils/navigation/routes';
import { closeModal } from '../../containers/Modal/store/actions.creator';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');
export const SeePastEventsPopup = ({ navigation, currentUser }) => {
  const dispatch = useDispatch();
  const handleSeePastEvents = useCallback(() => {
    dispatch(closeModal());
    currentUser && currentUser.type === COACH
      ? navigation.navigate(routes.COACH_PASTE_EVENTS)
      : navigation.navigate(routes.BOOKING_LIST, { pastEvent: true });
  }, [currentUser, dispatch, navigation]);

  const handleDisagree = useCallback(() => dispatch(closeModal()), [dispatch]);

  return (
    <View style={Style.container}>
      <View style={Style.modal}>
        <View style={Style.imageContainer}>
          <ShakaIcon />
        </View>
        <View style={Style.modalTextView}>
          <Text style={Style.modalText}>
            <I18n {...translation.pastEventsBody} />
          </Text>
        </View>
        <View style={Style.modalButtonContainer}>
          <Button
            size={{
              radius: height / 40,
              width: width * 0.3,
              height: height / 20,
              font: width / 23,
            }}
            color={[colors.PRIMARY_DARK, colors.PRIMARY]}
            title={i18n.t(translation.disagree.id)}
            onPress={handleDisagree}
          />
          <Button
            size={{
              radius: height / 40,
              width: width * 0.3,
              height: height / 20,
              font: width / 23,
            }}
            color={[colors.SECONDARY, colors.SECONDARY_LIGHT]}
            title={i18n.t(translation.agree.id)}
            onPress={handleSeePastEvents}
          />
        </View>
      </View>
    </View>
  );
};

export default SeePastEventsPopup;
