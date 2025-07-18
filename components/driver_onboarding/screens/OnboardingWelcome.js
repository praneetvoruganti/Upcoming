import React from 'react';
import { View } from 'react-native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import LinkButton from '../components/LinkButton';

const OnboardingWelcome = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('OnboardingFeatureOne');
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingPermissions'); // Skip to the last step
  };

  return (
    <OnboardingSlide
      title="Welcome to OK2GO Drivers"
      subtitle="Your companion for a smooth, profitable shift."
      image={require('../assets/img-welcome.png')}
      footer={(
        <>
          <LinkButton label="Skip" onPress={handleSkip} />
          <PrimaryButton label="Get Started" onPress={handleNext} />
        </>
      )}
    />
  );
};

export default OnboardingWelcome;
