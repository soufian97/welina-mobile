import React from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import { Style } from '../../style';
import Button from '../../../../components/Buttons/Button';
import i18n from '../../../../config/i18n';
import { translation } from '../../messages';
import OfferCard from '../../../../components/OfferCard';
import RenderNoData from '../../../../components/RenderNoData';

const { width, height } = Dimensions.get('window');
const buttonSize = {
  width: width * 0.87,
  height: height * 0.06,
  font: 18,
  radius: 10,
};

const OffersContainer = ({
  handleCreateOffer,
  offers,
  getMoreOffers,
  onPressUpdateHandler,
  onPressDeleteOfferOpenModalHandler,
}) => (
  <View style={Style.offersContainer}>
    <Button
      title={i18n.t(translation.createOffer.id)}
      size={buttonSize}
      onPress={handleCreateOffer}
      style={Style.createOfferButton}
    />
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => `${index}`}
      data={offers}
      onEndReached={getMoreOffers}
      onEndReachedThreshold={0.1}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={10}
      renderItem={({ item }) => (
        <OfferCard
          onPress={onPressUpdateHandler}
          onPressDeleteOffer={onPressDeleteOfferOpenModalHandler}
          item={{ offer: { ...item }, ...item }}
        />
      )}
      ListEmptyComponent={
        <RenderNoData
          title={i18n.t(translation.noOffers.id)}
          iconWidth={width / 2.5}
          iconHeight={width / 2.5}
        />
      }
    />
  </View>
);

export default OffersContainer;
