import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MapPin } from '../../../../assets/svgs';
import rescheduleIcon from '../../../../assets/images/reschedule.png';
import I18n from '../../../../components/I18n';
import { BOOKED, CANCELLED } from '../../../../config/app.constant';
import { colors } from '../../../../utils/colors';
import { translation } from '../../messages';
import { Style } from './style';
import { routes } from '../../../../utils/navigation/routes';

const statusColor = {
  PENDING: [colors.PRIMARY, colors.PRIMARY_DARK],
  BOOKED: [colors.TEXT_GREEN, colors.GREEN_TURQUOISE],
  CANCELLED: [colors.RED, colors.RED_INDIAN],
};
const BookingCard = ({ item, onPressCancel, navigation }) => {
  const {
    currency,
    totalAmount,
    reservationDate,
    offer: {
      city: { label },
      title,
      photo,
    },
    status,
    id: requestId,
    isSuggestedTimeSlot,
    suggestedTimeSlot,
  } = item;

  const onPressRequestHandler = (requestId, isSuggestedTimeSlot) => () => {
    if (isSuggestedTimeSlot) {
      navigation.navigate(routes.REQUEST_CANCELATION, {
        requestId,
        suggestedTimeSlot,
      });
    } else {
      navigation.navigate(routes.DETAILS, {
        item: { ...item?.offer, location: item?.location },
        readOnly: true,
      });
    }
  };

  return (
    <TouchableOpacity
      style={[
        Style.cardContainer,
        isSuggestedTimeSlot && Style.rescheduleContainer,
      ]}
      onPress={onPressRequestHandler(requestId, isSuggestedTimeSlot)}
    >
      {isSuggestedTimeSlot && (
        <Image source={rescheduleIcon} style={Style.rescheduleIcon} />
      )}
      <Image source={{ uri: photo }} style={Style.image} resizeMode={'cover'} />
      <View style={Style.infoContainer}>
        <View style={Style.infoHeader}>
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={Style.textTitle}
          >
            {title}
          </Text>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={statusColor[status]}
            style={Style.pending}
          >
            <Text numberOfLines={1} style={Style.textStatus}>
              {status}
            </Text>
          </LinearGradient>
        </View>
        <View style={Style.locationContainer}>
          <Text style={Style.textCity}>{label}</Text>
          <MapPin width={'10%'} height={'90%'} />
        </View>
        <View style={Style.infoHeader}>
          <Text>{reservationDate}</Text>
          <Text style={Style.price}>{`${currency} ${totalAmount}`}</Text>
        </View>
        {![BOOKED, CANCELLED].includes(status) && (
          <TouchableOpacity style={Style.cancelButton} onPress={onPressCancel}>
            <Text style={Style.textCancel}>
              <I18n {...translation.cancel} />
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
