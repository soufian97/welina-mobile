import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal } from 'react-native';
import {
  EmojiAlright,
  EmojiAwesome,
  EmojiGood,
  EmojiNegative,
  EmojiVeryBad,
  ShakaIcon,
} from '../../assets/svgs';
import { EMOJI_FEELING } from '../../config/app.constant';
import i18n from '../../config/i18n';
import { colors } from '../../utils/colors';
import Button from '../Buttons/Button';
import I18n from '../I18n';
import { translation } from './messages';
import { Style } from './style';
import {
  openModalAction,
  closeModalAction,
  addBetaGeneralReviewAction,
} from '../../containers/Splash/store/actions.creator';
import {
  getModalVisibilitySelector,
  getErrorSelector,
  getHomeLoaderSelector,
} from '../../containers/Splash/store/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import FullScreenLoader from '../FullScreenLoader';
import PopupIcon from '../PopupModals/PopupIcon';
import Popup from '../PopupModals/Popup';
import { closeModal } from '../../containers/Modal/store/actions.creator';

const EmojiArray = [
  {
    label: <EmojiVeryBad style={Style.emoji} />,
    value: EMOJI_FEELING.VERY_BAD,
  },
  {
    label: <EmojiNegative style={Style.emoji} />,
    value: EMOJI_FEELING.NEGATIVE,
  },
  { label: <EmojiAlright style={Style.emoji} />, value: EMOJI_FEELING.ALRIGHT },
  { label: <EmojiGood style={Style.emoji} />, value: EMOJI_FEELING.GOOD },
  { label: <EmojiAwesome style={Style.emoji} />, value: EMOJI_FEELING.AWESOME },
];
const { width } = Dimensions.get('window');

const size = { radius: 25, height: 45, width: width * 0.37 };
const BetaGeneralFeedBack = ({
  addBetaGeneralReviewLoading,
  error,
  modalVisibility,
  closeModal,
  openModalAction,
  closeModalAction,
  addBetaGeneralReviewAction,
}) => {
  const [feeling, setFeeling] = useState(EMOJI_FEELING.GOOD);
  const [successModalVisibility, setSuccessModalVisibility] = useState(false);
  const onPressEmoji = (value) => () => {
    setFeeling(value);
  };

  const onPressSubmitEmojiCallback = useCallback(
    (err) => {
      if (err) {
        openModalAction(err?.response?.code);
      } else {
        setSuccessModalVisibility(true);
      }
    },
    [openModalAction],
  );

  const onPressSubmitEmoji = useCallback(() => {
    addBetaGeneralReviewAction(
      { globalFeedBackType: feeling },
      onPressSubmitEmojiCallback,
    );
  }, [addBetaGeneralReviewAction, feeling, onPressSubmitEmojiCallback]);

  const onPressSuccessModalConfirm = useCallback(() => {
    setSuccessModalVisibility(false);
    closeModal();
  }, [closeModal]);

  return (
    <View style={Style.wrapper}>
      <Modal animationType="fade" transparent={true} visible={modalVisibility}>
        <Popup confirmPressed={closeModalAction} error={error} />
      </Modal>
      <Modal visible={successModalVisibility} transparent={true}>
        <PopupIcon
          buttonTitle={i18n.t(translation.ok.id)}
          confirmPressed={onPressSuccessModalConfirm}
          message={i18n.t(translation.thankYou.id)}
          icon={<ShakaIcon width={140} height={140} />}
        />
      </Modal>
      <View style={Style.container}>
        <TouchableOpacity style={Style.dismissButton} onPress={closeModal}>
          <Text style={Style.textDismissIcon}>X</Text>
        </TouchableOpacity>
        <Text style={Style.textTitle}>
          <I18n {...translation.title} />
        </Text>
        <View style={Style.emojiContainer}>
          {EmojiArray.map(({ label, value }, index) => (
            <TouchableOpacity
              style={[
                Style.emojiWrapper,
                value === feeling && Style.emojiBackground,
              ]}
              key={`${index}`}
              onPress={onPressEmoji(value)}
            >
              {label}
            </TouchableOpacity>
          ))}
        </View>
        <View style={Style.emojiContainer}>
          <Button
            size={size}
            color={[colors.SECONDARY, colors.SECONDARY]}
            title={i18n.t(translation.later.id)}
            onPress={closeModal}
          />
          <Button
            size={size}
            title={i18n.t(translation.submit.id)}
            onPress={onPressSubmitEmoji}
          />
        </View>
      </View>
      <FullScreenLoader visible={addBetaGeneralReviewLoading} />
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  error: getErrorSelector(),
  modalVisibility: getModalVisibilitySelector(),
  addBetaGeneralReviewLoading: getHomeLoaderSelector(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openModalAction,
      closeModalAction,
      closeModal,
      addBetaGeneralReviewAction,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BetaGeneralFeedBack);
