import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingSlide from '../components/OnboardingSlide';
import PrimaryButton from '../components/PrimaryButton';
import LinkButton from '../components/LinkButton';
import PagerDots from '../components/PagerDots';
import onboardService from '../services/onboardService';
import { colors } from '../styles/colors';

// Image asset removed to use a placeholder.

const OnboardingDocuments = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      // In a real app, you would use a document picker to get files.
      const result = await onboardService.uploadDocuments(['file1.pdf', 'file2.jpg']);
      if (result.success) {
        Alert.alert('Success', 'Documents uploaded successfully!');
        navigation.navigate('OnboardingPermissions');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload documents.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingPermissions');
  };

  const footer = (
    <View style={styles.footerContent}>
      <PagerDots total={4} currentIndex={2} />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : (
        <PrimaryButton label="Upload Now" onPress={handleUpload} />
      )}
      <LinkButton label="Skip for now" onPress={handleSkip} />
    </View>
  );

  return (
    <OnboardingSlide
      title="Upload Your Documents"
      subtitle="Keep your DL, RC, and insurance handy for quick verification."
      
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

export default OnboardingDocuments;
