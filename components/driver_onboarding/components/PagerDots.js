import React from 'react';
import { View } from 'react-native';
import { onboardingStyles } from '../styles/onboarding.styles';

const PagerDots = ({ total, currentIndex }) => (
  <View style={onboardingStyles.pagerDotsContainer}>
    {Array.from({ length: total }).map((_, index) => (
      <View
        key={index}
        style={[onboardingStyles.dot, currentIndex === index && onboardingStyles.dotActive]}
      />
    ))}
  </View>
);

export default PagerDots;
