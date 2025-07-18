import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { splashStyles } from '../styles/splashStyles';

const SplashLogo = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, // Subtle fade-in over 1.5 seconds
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[splashStyles.logoContainer, { opacity: fadeAnim }]}>
      <Animated.Image
        source={require('../assets/logo.png')} // Assumes logo.png is in assets
        style={splashStyles.logo}
      />
    </Animated.View>
  );
};

export default SplashLogo;
