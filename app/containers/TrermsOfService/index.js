import React, { useEffect, useRef } from 'react';
import { Text, ScrollView, View } from 'react-native';
import GoBackHeader from '../../components/Headers/GobackHeader';
import { Style } from './style';
import { translation } from './message';
import I18n from '../../components/I18n';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapsStyle from '../../utils/mapsStyle';

const TermsOfService = () => {
  const initialRegion = {
    latitude: 33.597739,
    longitude: -7.635933,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };
  const _map = useRef(null);
  useEffect(() => {
    _map.current &&
      _map.current.animateToRegion(
        {
          ...initialRegion,
        },
        800,
      );
  });

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
        <ScrollView
          style={Style.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={Style.title}>
            <I18n {...translation.title} />
          </Text>
          <Text style={Style.subTitle}>
            <I18n {...translation.mainSubTitle} />
          </Text>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <View key={`${index}`}>
                <Text style={Style.subTitle}>
                  <I18n {...translation[`subtitle${index + 1}`]} />
                </Text>
                <Text style={Style.paragraph}>
                  <I18n {...translation[`paragraph${index + 1}`]} />
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TermsOfService;
