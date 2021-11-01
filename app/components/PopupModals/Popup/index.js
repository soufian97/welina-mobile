import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Style } from '../style';
import { translation } from '../messages';
import I18n from '../../I18n';
import { errors } from '../../../utils/http/errorCodes';
import { closeModal } from '../../../containers/Modal/store/actions.creator';
import { useDispatch } from 'react-redux';

export const Popup = ({ error, confirmPressed, withBackground = true }) => {
  const dispatch = useDispatch();

  const onPressConfirm = useCallback(() => {
    confirmPressed ? confirmPressed() : dispatch(closeModal());
  }, [confirmPressed, dispatch]);

  return (
    <View style={Style.container(withBackground)}>
      <View style={Style.modal}>
        <View style={Style.modalTextView}>
          <Text style={Style.modalText}>{errors(error)}</Text>
        </View>

        <View style={Style.modalButtonContainer}>
          <TouchableOpacity
            style={Style.buttonContainer}
            onPress={onPressConfirm}
          >
            <Text style={Style.buttonText}>
              <I18n {...translation.back} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Popup;
