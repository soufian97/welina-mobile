import React, { useCallback } from 'react';
import { TextInput, View } from 'react-native';
import Style from './style';
import { MapPin, DeleteIcon } from '../../assets/svgs';
import { colors } from '../../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchBar = ({
  placeholder,
  width,
  onChangeText,
  value,
  onSearchPress,
}) => {
  const handleClearPressed = useCallback(() => {
    onChangeText('');
    onSearchPress && onSearchPress('');
  }, [onChangeText, onSearchPress]);
  const handleSubmitEditing = useCallback(() => {
    onSearchPress && onSearchPress(value);
  }, [onSearchPress, value]);

  const renderClearIcon = () => {
    return value ? (
      <TouchableOpacity style={Style.deleteButton} onPress={handleClearPressed}>
        <DeleteIcon width={22} height={22} />
      </TouchableOpacity>
    ) : null;
  };
  return (
    <View style={Style.container(width)}>
      <View style={Style.iconContainer}>
        <MapPin width={19} height={22} />
      </View>
      <View style={Style.searchContainer}>
        <TextInput
          placeholder={placeholder}
          style={Style.input}
          placeholderTextColor={colors.GRAY}
          onChangeText={onChangeText}
          value={value}
          returnKeyType={'search'}
          onBlur={handleSubmitEditing}
        />
      </View>
      {renderClearIcon()}
    </View>
  );
};

export default SearchBar;
