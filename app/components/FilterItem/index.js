import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Style } from './style';
import { RadioIcon, ArrowListIcon } from '../../assets/svgs';

const FilterItem = ({ title, hasError = false, children }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleChildren = useCallback(() => {
    setShowDetails(!showDetails);
  }, [showDetails]);
  const handleShowDetails = useCallback(() => {
    setShowDetails(true);
  }, []);

  return (
    <TouchableOpacity
      style={Style.container(hasError)}
      onPress={handleShowDetails}
      activeOpacity={0.9}
    >
      <View style={Style.header}>
        <View style={Style.headerLeft}>
          <RadioIcon />
          <Text style={Style.title}>{title}</Text>
        </View>
        <TouchableOpacity
          style={Style.headerRight}
          onPress={handleToggleChildren}
        >
          <ArrowListIcon />
        </TouchableOpacity>
      </View>
      {showDetails && children}
    </TouchableOpacity>
  );
};
export default FilterItem;
