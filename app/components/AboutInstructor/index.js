import React, { useCallback } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Style } from './style';
import I18n from '../I18n';
import { translation } from './messages';
import { routes } from '../../utils/navigation/routes';
import AboutInstructorFooter from './AboutInstructorFooter';

const AboutInstructor = ({
  offer,
  navigation,
  onPressBook,
  showFooter = true,
  item,
  readOnly = false,
}) => {
  const avatar = offer.coach.photo;
  const name = `${offer.coach.lastName} ${offer.coach.firstName}`;
  const about = offer.coach.about;
  const price = offer.price;
  const coachId = offer.coach.id;
  const type = offer.coach.type;
  const currency = offer?.currency;
  const pricePerAdult = offer?.pricePerAdult;

  const handleReadMore = useCallback(() => {
    let scoreAverage = offer?.coach?.scoreAverage;
    navigation.navigate(routes.COACH_DETAILS, { coachId, scoreAverage, item });
  }, [coachId, item, navigation, offer]);

  return (
    <View style={Style.container}>
      <Text style={Style.title}>
        <I18n {...translation.title} />
      </Text>
      <View style={Style.header}>
        <View style={Style.infoContainer}>
          <Image style={Style.image} source={{ uri: avatar }} />
          <View style={Style.nameContainer}>
            <Text style={Style.name}>{name}</Text>
            <Text style={Style.type}>{type}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={Style.instructorText}>{about}</Text>
        <TouchableOpacity onPress={handleReadMore}>
          <Text style={Style.readMore}>
            <I18n {...translation.readmore} />
          </Text>
        </TouchableOpacity>
      </View>
      {showFooter && (
        <AboutInstructorFooter
          onPressBook={onPressBook}
          price={price || pricePerAdult}
          currency={currency}
          readOnly={readOnly}
        />
      )}
    </View>
  );
};
export default AboutInstructor;
