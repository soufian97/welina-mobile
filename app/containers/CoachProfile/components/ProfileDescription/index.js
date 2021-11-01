import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Style } from '../../style';
import I18n from '../../../../components/I18n';
import { translation } from '../../messages';
import { DotUlIcon, UpdateIcon } from '../../../../assets/svgs';
import i18n from '../../../../config/i18n';
import { chunk } from 'lodash';
import { API_URL } from '../../../../utils/http/http';
import ImageView from 'react-native-image-viewing';
import { colors } from '../../../../utils/colors';
import React from 'react';

const localhostLink = 'http://localhost:8080/api/v1';
const MAX_GALLERY_ITEMS = 9;

const ProfileDescription = ({
  handleUpdateBasicInfoPressed,
  description,
  onImagePress,
  isVisible,
  onRequestClose,
  currentIndex,
}) => (
  <ScrollView
    style={Style.flatListElement}
    showsVerticalScrollIndicator={false}
  >
    <View style={Style.overviewAndUpdate}>
      <Text style={Style.titleText}>
        <I18n {...translation.overview} />
      </Text>
      <TouchableOpacity
        style={Style.updateIcon}
        onPress={handleUpdateBasicInfoPressed}
      >
        <UpdateIcon />
      </TouchableOpacity>
    </View>
    <Text style={Style.contentText} numberOfLines={3}>
      {description?.description}
    </Text>
    <Text style={Style.titleText}>
      <I18n {...translation.requirements} />
    </Text>
    {description?.workExperiences?.map((item, index) => (
      <View key={`${index}`} style={Style.itemQualification}>
        <View style={Style.dotIcon}>
          <DotUlIcon />
        </View>
        <Text style={Style.itemText}>
          {i18n.t(translation.qualifExperience.id, {
            years: item.yearsOfExperience,
            label: item.skill,
            location: item.location,
          })}
        </Text>
      </View>
    ))}
    <Text style={Style.titleText}>
      <I18n {...translation.gallery} />
    </Text>

    {chunk(description?.gallery, MAX_GALLERY_ITEMS).map((itemArr, indexTop) => (
      <View key={`${indexTop}`} style={Style.galleryContainer}>
        {itemArr.map((item, indexBottom) => (
          <TouchableOpacity
            key={`${indexBottom}`}
            onPress={onImagePress(indexTop, indexBottom)}
          >
            <Image
              key={`${item}`}
              source={{ uri: item.replace(localhostLink, API_URL) }}
              style={Style.galleryImage}
            />
          </TouchableOpacity>
        ))}
      </View>
    ))}
    <ImageView
      backgroundColor={colors.SECONDARY_OPACITY}
      images={description?.gallery?.map((imageUrl) => ({ uri: imageUrl }))}
      visible={isVisible}
      imageIndex={currentIndex}
      onRequestClose={onRequestClose}
      presentationStyle={'overFullScreen'}
    />
  </ScrollView>
);

export default ProfileDescription;
