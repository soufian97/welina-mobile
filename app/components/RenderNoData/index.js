import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Style } from './style';
import { NoDataIcon } from '../../assets/svgs';
import { translation } from './messages';
import i18n from '../../config/i18n';

const { width } = Dimensions.get('window');
const RenderNoData = ({
  title = i18n.t(translation.noResult.id),
  description,
  iconHeight = (3 * width) / 4,
  iconWidth = (3 * width) / 4,
}) => {
  return (
    <View style={Style.noResultContainer}>
      <NoDataIcon width={iconWidth} height={iconHeight} />
      <Text style={Style.noResult}>{title}</Text>
      {description && (
        <Text style={Style.noResultDescription}>{description}</Text>
      )}
    </View>
  );
};

export default RenderNoData;
