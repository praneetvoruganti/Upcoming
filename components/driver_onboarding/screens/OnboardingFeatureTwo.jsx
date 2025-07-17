import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import LinkButton from '../components/LinkButton';
import PagerDots from '../components/PagerDots';

// Image asset removed to use a placeholder.

const OnboardingFeatureTwo = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('OnboardingDocuments');
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingPermissions');
  };

  const footer = (
    <View style={styles.footerContent}>
      <PagerDots total={4} currentIndex={1} />
      <PrimaryButton label="Next" onPress={handleNext} />
      <LinkButton label="Skip" onPress={handleSkip} />
    </View>
  );

  return (
    <OnboardingSlide
      title="Smart Safety Toolkit"
      subtitle="One-tap SOS, ride sharing live updates, and more to keep you secure."
      
      footer={footer}
    />
  );
};

const styles = StyleSheet.create({
  footerContent: {
    alignItems: 'center',
  },
});

export default OnboardingFeatureTwo;
