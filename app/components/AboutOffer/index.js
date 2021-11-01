import React from 'react';
import { Text, View } from 'react-native';
import i18n from '../../config/i18n';
import { translation } from './messages';
import { Style } from './style';
import AboutOfferHeader from './AboutOfferrHeader';
import AboutOfferDetails from './AboutOfferDetails';
import AboutOfferFeature from './AboutOfferFeature';

const AboutOffer = ({ offer, offerType, showHeader = true }) => {
  const avatars = offer?.coach?.reviewersPhoto;
  const numberOfStars = offer?.coach?.scoreAverage;
  const about = offer?.description;
  const offerDetails = offer?.details;
  const features = offer?.skills;
  const offerTitle = offer?.title;

  return (
    <View style={Style.container}>
      {showHeader && (
        <AboutOfferHeader
          avatars={avatars}
          offerTitle={offerTitle}
          starsNumber={Number(numberOfStars).toFixed(1)}
        />
      )}
      <Text style={Style.about}>{about}</Text>
      <View style={Style.features}>
        <Text style={Style.title}>
          {i18n.t(translation.offerDetails.id, {
            type: offerType?.toLowerCase(),
          })}
        </Text>
        <AboutOfferDetails
          offerDetails={offerDetails}
          numberOfDays={offer?.numberOfDays}
        />
      </View>
      <View style={Style.features}>
        <Text style={Style.title}>{i18n.t(translation.whatIsIncluded.id)}</Text>
        {features?.map((item, index) => (
          <AboutOfferFeature key={`${index}`} feature={item} />
        ))}
      </View>
    </View>
  );
};

export default AboutOffer;
