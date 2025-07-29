import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { animatedBackgroundStyles } from '../styles/animatedBackgroundStyles';

const { width, height } = Dimensions.get('window');
const NUM_STARS = 70;

const STAR_COLORS = ['rgba(238, 67, 110, 0.4)', 'rgba(251, 218, 37, 0.4)'];

const Star = ({ initialStyles, color }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: Math.random() * 2000 + 1500, // Fade in duration
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: Math.random() * 2000 + 1500, // Fade out duration
          useNativeDriver: true,
        }),
      ]),
    );

    const delay = setTimeout(() => animation.start(), Math.random() * 5000);

    return () => {
      clearTimeout(delay);
      animation.stop();
    };
  }, [opacity]);

  return <Animated.View style={[animatedBackgroundStyles.star, initialStyles, { opacity, backgroundColor: color }]} />;
};

const AnimatedBackground = () => {
  const stars = useRef(
    Array.from({ length: NUM_STARS }).map(() => {
      const size = Math.random() * 4 + 1.5;
      return {
        id: Math.random(),
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        styles: {
          left: Math.random() * width,
          top: Math.random() * height,
          width: size,
          height: size,
        },
      };
    })
  ).current;

  return (
    <View style={animatedBackgroundStyles.container}>
      {stars.map(star => (
        <Star key={star.id} initialStyles={star.styles} color={star.color} />
      ))}
    </View>
  );
};

export default AnimatedBackground;
