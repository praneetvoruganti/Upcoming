import React, { useEffect } from 'react';
import { View } from 'react-native';
import { splashService } from '../services/splashService';
import SplashLogo from '../components/SplashLogo';

import { splashStyles } from '../styles/splashStyles';

const SplashScreen = ({ onReady }) => {
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch settings, config, etc.
        await splashService.loadSettings();
        // Signal that loading is complete
        if (onReady) {
          onReady();
        }
      } catch (error) {
        console.error('Failed to load splash screen settings:', error);
        // Handle error, maybe show an error message or retry
        // For now, we'll still proceed to ensure the app doesn't get stuck
        if (onReady) {
          onReady();
        }
      }
    };

    loadData();
  }, [onReady]);

  return (
    <View style={splashStyles.container}>
      <SplashLogo />

    </View>
  );
};

export default SplashScreen;
