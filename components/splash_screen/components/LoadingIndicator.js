import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { splashStyles } from '../styles/splashStyles';

const LoadingIndicator = () => {
  return (
    <View style={splashStyles.indicatorContainer}>
      <ActivityIndicator size="small" color="#000000" />
    </View>
  );
};

export default LoadingIndicator;
