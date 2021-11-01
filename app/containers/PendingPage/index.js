import React, { useCallback } from 'react';
import { View, Dimensions, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';
import { Style } from './style';
import i18n from '../../config/i18n';
import { translation } from './messages';
import Button from '../../components/Buttons/Button';
import GoBackHeader from '../../components/Headers/GobackHeader';
import hourglass from '../../assets/images/hourglass.png';
import { routes } from '../../utils/navigation/routes';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from '../Auth/store/selectors';
import { createStructuredSelector } from 'reselect';
import { SURFER } from '../../config/app.constant';

const { width, height } = Dimensions.get('window');

const buttonSize = {
  width: width * 0.8,
  height: height * 0.07,
  font: 18,
  radius: 10,
};

const initialRegion = {
  latitude: 33.597739,
  longitude: -7.635933,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
};

export const PendingPage = ({ navigation, currentUser }) => {
  let screenImage = hourglass;
  let primaryText = i18n.t(translation.submissionPending.id);
  let secondaryText = i18n.t(translation.willGoBack.id);

  const handleGoBack = useCallback(() => {
    const dashboardRoute =
      currentUser?.type === SURFER ? routes.DISCOVER : routes.COACH_DASHBOARD;
    navigation.navigate(dashboardRoute);
  }, [currentUser, navigation]);

  return (
    <View style={Style.container}>
      <MapView
        initialRegion={initialRegion}
        style={Style.maps}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapsStyle}
        maxZoomLevel={2}
      />

      <View style={Style.topLayer}>
        <GoBackHeader />
        <View style={Style.noResultContainer}>
          <Image source={screenImage} width={width / 3} height={height / 4} />
          <View>
            <Text style={Style.noResult}>{primaryText}</Text>
            <Text style={Style.noResultDescription}>{secondaryText}</Text>
          </View>
          <Button
            title={i18n.t(translation.goBack.id)}
            size={buttonSize}
            onPress={handleGoBack}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: getCurrentUser(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(PendingPage);
