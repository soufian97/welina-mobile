import React from 'react';
import { Text, View } from 'react-native';
import { Style } from './style';
import i18n from '../../config/i18n';
import { translation } from './messages';
import { isEmpty } from 'lodash';

const AboutOfferDetails = ({ offerDetails, numberOfDays = null }) => {
  return (
    <>
      {numberOfDays ? (
        <View style={Style.feature}>
          <View style={Style.dot} />
          <Text style={Style.txtFeature}>
            {i18n.t(translation.numberOfDays.id, {
              days: numberOfDays,
            })}
          </Text>
        </View>
      ) : null}
      {offerDetails?.duration ? (
        <View style={Style.feature}>
          <View style={Style.dot} />
          <Text style={Style.txtFeature}>
            {i18n.t(translation.duration.id, {
              duration: offerDetails.duration,
            })}
          </Text>
        </View>
      ) : null}
      {offerDetails?.groupSize ? (
        <View style={Style.feature}>
          <View style={Style.dot} />
          <Text style={Style.txtFeature}>
            {i18n.t(translation.groupSize.id, {
              groupSize: offerDetails.groupSize,
            })}
          </Text>
        </View>
      ) : null}
      {!isEmpty(offerDetails.languages) && (
        <View style={Style.feature}>
          <View style={Style.dot} />
          <Text style={Style.txtFeature}>
            {i18n.t(translation.languages.id, {
              languages: offerDetails.languages
                .map((item) => item.name)
                .join(', '),
            })}
          </Text>
        </View>
      )}
      {!isEmpty(offerDetails.skillLevels) && (
        <View style={Style.feature}>
          <View style={Style.dot} />
          <Text style={Style.txtFeature}>
            {i18n.t(translation.skillLevel.id, {
              skillLevel: offerDetails.skillLevels
                .map((item) => item.toLowerCase())
                .join(', '),
            })}
          </Text>
        </View>
      )}
      {offerDetails?.withKids && (
        <View style={Style.feature}>
          <View style={Style.dot} />
          <Text style={Style.txtFeature}>
            {i18n.t(translation.withKids.id)}
          </Text>
        </View>
      )}
    </>
  );
};
export default AboutOfferDetails;
