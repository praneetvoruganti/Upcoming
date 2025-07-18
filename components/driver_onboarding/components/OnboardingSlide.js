import React from 'react';
import { View, Text, Image } from 'react-native';
import { onboardingStyles } from '../styles/onboarding.styles';

const OnboardingSlide = ({ title, subtitle, image, footer }) => (
  <View style={onboardingStyles.slideContainer}>
    <Image source={image} style={onboardingStyles.slideImage} />
    <Text style={onboardingStyles.title}>{title}</Text>
    <Text style={onboardingStyles.subtitle}>{subtitle}</Text>
    {footer && <View style={onboardingStyles.footer}>{footer}</View>}
  </View>
);

export default OnboardingSlide;
