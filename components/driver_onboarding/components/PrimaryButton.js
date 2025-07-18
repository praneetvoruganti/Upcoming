import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { onboardingStyles } from '../styles/onboarding.styles';

const PrimaryButton = ({ label, onPress }) => (
  <TouchableOpacity style={onboardingStyles.primaryButton} onPress={onPress}>
    <Text style={onboardingStyles.primaryButtonText}>{label}</Text>
  </TouchableOpacity>
);

export default PrimaryButton;
