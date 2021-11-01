import React from 'react';
import { Image, Text, View } from 'react-native';
import I18n from '../../../../components/I18n';
import i18n from '../../../../config/i18n';
import { translation } from './messages';
import { Style } from './style';
import CoachGallery from '../CoachGallery';

const CoachDescription = ({ description }) => {
  const getCoachLanguages = () =>
    description?.languages?.map((item) => item.name).join(', ');

  const getWorkExperiences = () =>
    description?.workExperiences?.map((item, index) => (
      <Text style={Style.textCoachInfo} key={`${index}`}>
        {i18n.t(translation.years.id, {
          years: item.yearsOfExperience,
          skill: item.skill,
          location: item.location,
        })}
      </Text>
    ));

  return (
    <View style={Style.descriptionContainer}>
      <View style={Style.descriptionHeader}>
        <View style={Style.profileInfo}>
          <Image
            source={{ uri: description.photo }}
            style={Style.profileFrame}
          />
          <View style={Style.textNameContainer}>
            <Text
              style={Style.textName}
            >{`${description.firstName} ${description.lastName}`}</Text>
            <Text style={Style.textStatus}>{description.type}</Text>
          </View>
        </View>
      </View>
      <View>
        {description?.description && (
          <>
            <Text style={Style.mainTitle}>
              <I18n {...translation.basicInforamtion} />
            </Text>
            <Text
              style={Style.textBasicInfo}
            >{`" ${description.description} "`}</Text>
          </>
        )}
      </View>
      <View>
        <Text style={Style.mainTitle}>
          <I18n {...translation.myWorkExperience} />
        </Text>
        {getWorkExperiences()}
        <Text style={Style.mainTitle}>
          <I18n {...translation.language} />
        </Text>
        <Text style={[Style.textCoachInfo, Style.marginBottom]}>
          {getCoachLanguages()}
        </Text>
      </View>
      <Text style={Style.mainTitle}>
        <I18n {...translation.gallery} />
      </Text>
      <View style={Style.galleryContainer}>
        <CoachGallery images={description?.gallery} />
      </View>
    </View>
  );
};

export default CoachDescription;
