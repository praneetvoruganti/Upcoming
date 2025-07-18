import React from 'react';
import { View } from 'react-native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import LinkButton from '../components/LinkButton';
import PagerDots from '../components/PagerDots';

const OnboardingFeatureOne = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('OnboardingFeatureTwo');
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingPermissions');
  };

  return (
    <OnboardingSlide
      title="Real-Time Earnings Dashboard"
      subtitle="Track trips, net payouts, and bonuses instantly after each ride."
      image={require('../assets/img-feature-earnings.png')}
      footer={(
        <>
          <LinkButton label="Skip" onPress={handleSkip} />
          <PagerDots total={4} currentIndex={0} />
          <PrimaryButton label="Next" onPress={handleNext} />
        </>
      )}
    />
  );
};

export default OnboardingFeatureOne;
