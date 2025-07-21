import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { splashStyles } from '../styles/splashStyles';

const SplashLogo = () => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current; // For the continuous pulse

  useEffect(() => {
    // Initial bounce-in animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Continuous pulse animation after bounce-in is complete
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05, // Slightly scale up
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1, // Scale back to normal
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [scaleAnim, opacityAnim, pulseAnim]);

  return (
    <Animated.View
      style={[
        splashStyles.logoContainer,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }, { scale: pulseAnim }],
        },
      ]}
    >
      <Animated.Image
        source={require('../assets/logo.png')}
        style={splashStyles.logo}
      />
    </Animated.View>
  );
};

export default SplashLogo;


