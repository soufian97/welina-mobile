import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Style } from './style';
import { ContactUsIcon } from '../../assets/svgs';
import { getCurrentUser } from '../../containers/Auth/store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { openBetaTestModalAction } from '../../containers/Splash/store/actions.creator';

const BetaSticker = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser());

  const handlePress = useCallback(() => {
    dispatch(openBetaTestModalAction());
  }, [dispatch]);

  return currentUser?.isBetaTester ? (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={handlePress}
      style={Style.container}
    >
      <View>
        <ContactUsIcon />
      </View>
    </TouchableOpacity>
  ) : null;
};
export default BetaSticker;
