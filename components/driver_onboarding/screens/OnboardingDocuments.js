import React from 'react';
import { Alert } from 'react-native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import LinkButton from '../components/LinkButton';
import PagerDots from '../components/PagerDots';
import onboardService from '../services/onboardService';

const OnboardingDocuments = ({ navigation }) => {
  const handleUpload = async () => {
    // In a real app, you would use a document picker library.
    const result = await onboardService.uploadDocuments(['mock-file.pdf']);
    if (result.success) {
      Alert.alert('Success', 'Documents uploaded successfully!');
      navigation.navigate('OnboardingPermissions');
    } else {
      Alert.alert('Error', 'Could not upload documents.');
    }
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingPermissions');
  };

  return (
    <OnboardingSlide
      title="Upload Your Documents"
      subtitle="Keep your DL, RC, and insurance handy for quick verification."
      image={require('../assets/img-upload-docs.png')}
      footer={(
        <>
          <LinkButton label="Skip" onPress={handleSkip} />
          <PagerDots total={4} currentIndex={2} />
          <PrimaryButton label="Upload Now" onPress={handleUpload} />
        </>
      )}
    />
  );
};

export default OnboardingDocuments;
