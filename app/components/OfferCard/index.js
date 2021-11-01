import React, { useRef, memo } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Style } from './style';
import bitmap from '../../assets/images/bitmap.png';
import profile from '../../assets/images/avatar.png';
import { API_URL } from '../../utils/http/http';
import MenuOptions from './MenuOptions';
import Sender from './Sender';
import Button from '../Buttons/Button';
import { translation } from './messages';
import i18n from '../../config/i18n';

const localhostLink = 'http://localhost:8080/api/v1';

const { width, height } = Dimensions.get('window');
const size = {
  radius: 8,
  width: width * 0.18,
  height: height * 0.041,
  font: width * 0.029,
};
const OfferCard = ({
  showSender,
  surfer,
  onPress,
  item,
  onPressDeleteOffer,
  showMenuOption = true,
  showReview = false,
  onPressReview,
}) => {
  const { startDate } = item?.offer;
  const menu = useRef();
  const deleteOfferMenu = () => {
    menu.current.hide(() => onPressDeleteOffer(item));
  };

  const updateOfferMenu = () => {
    menu.current.hide(handleOfferPressed);
  };

  const handleOfferPressed = () => {
    onPress(item);
  };

  const showMenu = () => {
    menu.current.show();
  };

  const getSurferProfilePicture = () =>
    surfer?.photo
      ? { uri: surfer.photo.replace(localhostLink, API_URL) }
      : profile;

  return (
    <View style={Style.container}>
      <View style={Style.header}>
        <Text style={Style.offerTitle} numberOfLines={1}>
          {`${item?.offer?.title} , ${
            item?.offer?.location?.city || item?.offer?.city?.label
          }`}
        </Text>
        <View style={Style.ratingAndOptions}>
          {showMenuOption && (
            <MenuOptions
              refMenu={menu}
              showMenu={showMenu}
              updateOfferMenu={updateOfferMenu}
              deleteOfferMenu={deleteOfferMenu}
            />
          )}
          {showReview && (
            <Button
              size={size}
              title={i18n.t(translation.review.id)}
              onPress={onPressReview}
            />
          )}
        </View>
      </View>
      <TouchableOpacity style={Style.content} onPress={handleOfferPressed}>
        <View style={Style.offerImages}>
          {Array(3)
            .fill(
              item?.offer?.photo
                ? { uri: item?.offer.photo.replace(localhostLink, API_URL) }
                : bitmap,
            )
            .map((item, index) => {
              return (
                <Image
                  source={item}
                  key={index}
                  style={Style.offerImage(index)}
                />
              );
            })}
        </View>
        <View style={Style.offerDescription}>
          <Text style={Style.offerDescriptionText} numberOfLines={2}>
            {item?.description}
          </Text>
          {showSender && (
            <Sender surfer={surfer} avatar={getSurferProfilePicture()} />
          )}
          <View style={Style.cardFooter}>
            <Text style={Style.eventDate}>{startDate}</Text>
            <Text style={Style.offerPriceText} numberOfLines={1}>
              {`${item?.currency} ${item?.price || item?.totalAmount}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(OfferCard);
