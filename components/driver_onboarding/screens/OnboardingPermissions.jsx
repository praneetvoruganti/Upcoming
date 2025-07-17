import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import PagerDots from '../components/PagerDots';
import onboardService from '../services/onboardService';
import { colors } from '../styles/colors';

// Image asset removed to use a placeholder.

const OnboardingPermissions = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async () => {
    setIsLoading(true);
    try {
      await onboardService.requestPermissions();
      await onboardService.recordOnboardComplete();
      Alert.alert('Setup Complete!', 'You are all set to start driving.', [
        { text: 'OK', onPress: onComplete },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while finalizing setup.');
    } finally {
      setIsLoading(false);
    }
  };

  const footer = (
    <View style={styles.footerContent}>
      <PagerDots total={4} currentIndex={3} />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : (
        <PrimaryButton label="Allow & Finish" onPress={handleFinish} />
      )}
    </View>
  );

  return (
    <OnboardingSlide
      title="Enable App Permissions"
      subtitle="Allow location and notifications so we can match rides and send real-time alerts."
      
      footer={footer}
    />
  );
};

const styles = StyleSheet.create({
  footerContent: {
    alignItems: 'center',
  },
  loader: {
    marginVertical: 16,
    height: 50, // Match button height
  },
});

export default OnboardingPermissions;
