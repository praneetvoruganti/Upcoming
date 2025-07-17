import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import LinkButton from '../components/LinkButton';

// Image asset removed to use a placeholder.

const OnboardingWelcome = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('OnboardingFeatureOne');
  };

  const handleSkip = () => {
    // Navigate to the final screen for completion logic
    navigation.navigate('OnboardingPermissions');
  };

  const footer = (
    <View style={styles.footerContent}>
      <PrimaryButton label="Get Started" onPress={handleNext} />
    </View>
  );

  return (
    <View style={styles.container}>
      <OnboardingSlide
        title="Welcome to OK2GO Drivers"
        subtitle="Your companion for a smooth, profitable shift."
        
        footer={footer}
      />
      <View style={styles.skipButtonContainer}>
        <LinkButton label="Skip" onPress={handleSkip} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButtonContainer: {
    position: 'absolute',
    top: 50, // Adjust as needed for status bar height
    right: 20,
  },
  footerContent: {
    alignItems: 'center',
  },
});

export default OnboardingWelcome;
