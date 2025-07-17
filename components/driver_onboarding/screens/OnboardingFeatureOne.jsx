import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import LinkButton from '../components/LinkButton';
import PagerDots from '../components/PagerDots';

// Image asset removed to use a placeholder.

const OnboardingFeatureOne = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('OnboardingFeatureTwo');
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingPermissions');
  };

  const footer = (
    <View style={styles.footerContent}>
      <PagerDots total={4} currentIndex={0} />
      <PrimaryButton label="Next" onPress={handleNext} />
      <LinkButton label="Skip" onPress={handleSkip} />
    </View>
  );

  return (
    <OnboardingSlide
      title="Real-Time Earnings Dashboard"
      subtitle="Track trips, net payouts, and bonuses instantly after each ride."
      
      footer={footer}
    />
  );
};

const styles = StyleSheet.create({
  footerContent: {
    alignItems: 'center',
  },
});

export default OnboardingFeatureOne;
