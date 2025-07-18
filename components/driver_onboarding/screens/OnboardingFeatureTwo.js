import React from 'react';
import { View } from 'react-native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import LinkButton from '../components/LinkButton';
import PagerDots from '../components/PagerDots';

const OnboardingFeatureTwo = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('OnboardingDocuments');
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingPermissions');
  };

  return (
    <OnboardingSlide
      title="Smart Safety Toolkit"
      subtitle="One-tap SOS, ride sharing live updates, and more to keep you secure."
      image={require('../assets/img-feature-safety.png')}
      footer={(
        <>
          <LinkButton label="Skip" onPress={handleSkip} />
          <PagerDots total={4} currentIndex={1} />
          <PrimaryButton label="Next" onPress={handleNext} />
        </>
      )}
    />
  );
};

export default OnboardingFeatureTwo;
