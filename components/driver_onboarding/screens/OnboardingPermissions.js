import React from 'react';
import { View, Alert } from 'react-native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import PagerDots from '../components/PagerDots';
import onboardService from '../services/onboardService';

const OnboardingPermissions = ({ route }) => {
  const { onComplete } = route.params;

  const handleFinish = async () => {
    const permissions = await onboardService.requestPermissions();
    if (permissions.location === 'granted') {
      await onboardService.recordOnboardComplete();
      Alert.alert('Setup Complete!', 'You are all set to start driving.', [
        { text: 'OK', onPress: onComplete },
      ]);
    } else {
      Alert.alert('Permissions Required', 'Please enable permissions to continue.');
    }
  };

  return (
    <OnboardingSlide
      title="Enable App Permissions"
      subtitle="Allow location and notifications so we can match rides and send real-time alerts."
      image={require('../assets/img-permissions.png')}
      footer={(
        <>
          {/* Empty view for spacing */}
          <View />
          <PagerDots total={4} currentIndex={3} />
          <PrimaryButton label="Allow & Finish" onPress={handleFinish} />
        </>
      )}
    />
  );
};

export default OnboardingPermissions;
