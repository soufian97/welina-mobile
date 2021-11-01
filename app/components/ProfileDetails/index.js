import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Star } from '../../assets/svgs';
import { Style } from './style';
import { colors } from '../../utils/colors';
import i18n from '../../config/i18n';
import { translation } from './messages';
import { COACH } from '../../config/app.constant';

const tabs = [
  i18n.t(translation.description.id),
  i18n.t(translation.offers.id),
  i18n.t(translation.reviews.id),
];
const CoachProfile = ({ profile, onPress, scoreAverage, selected }) => {
  const tab = (backgroundColor, txtColor, item) => {
    return (
      <View style={Style.tab(backgroundColor)}>
        <Text style={Style.textTab(txtColor)}>{item}</Text>
      </View>
    );
  };
  const handleTab = (item) =>
    item === tabs[selected]
      ? tab(colors.BLUE_HIGH_OPACITY, colors.BLUE, item)
      : tab(colors.WHITE, colors.BLUE_TEXT, item);

  const handlePress = (index) => () => {
    onPress(index);
  };

  const getNumberOfStars = () =>
    scoreAverage ? Number(scoreAverage).toFixed(1) : null;

  return (
    <View style={Style.container}>
      <Image
        style={Style.coverPicture}
        source={{ uri: profile?.coverPicture }}
        resizeMode={'cover'}
      />
      <View style={Style.profileInfoContainer}>
        <View style={Style.avatarContainer}>
          <Image
            style={Style.avatar}
            source={{ uri: profile.photo }}
            resizeMode={'cover'}
          />
        </View>
        <View style={Style.infoContainer}>
          <View style={Style.nameContainer}>
            <Text
              style={Style.name}
            >{`${profile.firstName} ${profile.lastName}`}</Text>
            <View style={Style.rating}>
              <Star color={colors.BLACK} />
              <Text style={Style.value}>{getNumberOfStars()}</Text>
            </View>
          </View>
          <Text style={Style.type}>{`${profile.type}`}</Text>
        </View>
        <View style={Style.bioContainer}>
          <Text style={Style.bio} numberOfLines={1}>
            {profile.description}
          </Text>
        </View>
      </View>
      {profile?.type?.toUpperCase() === COACH && (
        <View style={Style.tabBar}>
          {tabs.map((_, index) => {
            return (
              <TouchableOpacity key={`${index}`} onPress={handlePress(index)}>
                {handleTab(tabs[index])}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
export default CoachProfile;
