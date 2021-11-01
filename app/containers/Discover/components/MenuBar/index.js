import React, { useCallback } from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { SessionIcon, PackageIcon } from '../../../../assets/svgs';
import LinearGradient from 'react-native-linear-gradient';
import { Style } from './style';
import { colors } from '../../../../utils/colors';

export const { height } = Dimensions.get('window');
const icons = [
  { index: 0, title: 'SessionIcon', icon: SessionIcon },
  { index: 1, title: 'PackageIcon', icon: PackageIcon },
];
export const MenuBar = ({ onChangeType, selectedType }) => {
  const handleBackground = (currentTab, Icon) =>
    currentTab === selectedType ? (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[colors.PRIMARY_DARK, colors.PRIMARY]}
        style={Style.icon}
      >
        <Icon
          color={colors.WHITE}
          width={height * 0.03}
          height={height * 0.03}
        />
      </LinearGradient>
    ) : (
      <Icon
        color={colors.BLUE_DARK}
        width={height * 0.03}
        height={height * 0.03}
      />
    );

  const onChangeTypeHandler = useCallback(
    (index) => () => {
      onChangeType(index);
    },
    [onChangeType],
  );

  return (
    <View style={Style.container}>
      {icons.map((item) => {
        return (
          <TouchableOpacity
            style={Style.icon}
            key={item.title}
            onPress={onChangeTypeHandler(item.index, item.title)}
          >
            {handleBackground(item.index, item.icon)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default MenuBar;
