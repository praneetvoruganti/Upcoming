import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { onboardingStyles } from '../styles/onboarding.styles';

const LinkButton = ({ label, onPress }) => (
  <TouchableOpacity style={onboardingStyles.linkButton} onPress={onPress}>
    <Text style={onboardingStyles.linkButtonText}>{label}</Text>
  </TouchableOpacity>
);

export default LinkButton;
