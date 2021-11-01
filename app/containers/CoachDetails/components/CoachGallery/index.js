import React, { useCallback, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import Style from './style';
import ImageView from 'react-native-image-viewing';
import { colors } from '../../../../utils/colors';
import { chunk } from 'lodash';

const CoachGallery = ({ images, columnSize = 3 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onImagePress = (index) => () => {
    setCurrentIndex(index);
    setIsVisible(true);
  };

  const onRequestClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const renderItem = (item, index) => (
    <TouchableOpacity
      onPress={onImagePress(index)}
      activeOpacity={0.7}
      key={index}
    >
      <Image source={{ uri: item }} style={Style.imageCard(columnSize)} />
    </TouchableOpacity>
  );

  return (
    <View style={Style.galleryContainer}>
      {chunk(images, columnSize)?.map((row, rIndex) => (
        <View key={`row-${rIndex}`} style={Style.rowDirection}>
          {row.map((image, cIndex) =>
            renderItem(image, columnSize * rIndex + cIndex),
          )}
        </View>
      ))}
      <ImageView
        backgroundColor={colors.SECONDARY_OPACITY}
        images={images?.map((imageUrl) => ({ uri: imageUrl }))}
        visible={isVisible}
        imageIndex={currentIndex}
        onRequestClose={onRequestClose}
        presentationStyle={'overFullScreen'}
      />
    </View>
  );
};

export default CoachGallery;
