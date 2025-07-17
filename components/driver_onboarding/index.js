import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import OnboardingWelcome from './screens/OnboardingWelcome';
import OnboardingFeatureOne from './screens/OnboardingFeatureOne';
import OnboardingFeatureTwo from './screens/OnboardingFeatureTwo';
import OnboardingDocuments from './screens/OnboardingDocuments';
import OnboardingPermissions from './screens/OnboardingPermissions';

const OnboardingStack = createStackNavigator();

const DriverOnboarding = ({ onComplete }) => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen
        name="OnboardingWelcome"
        component={OnboardingWelcome}
      />
      <OnboardingStack.Screen
        name="OnboardingFeatureOne"
        component={OnboardingFeatureOne}
      />
      <OnboardingStack.Screen
        name="OnboardingFeatureTwo"
        component={OnboardingFeatureTwo}
      />
      <OnboardingStack.Screen
        name="OnboardingDocuments"
        component={OnboardingDocuments}
      />
      <OnboardingStack.Screen name="OnboardingPermissions">
        {(props) => <OnboardingPermissions {...props} onComplete={onComplete} />}
      </OnboardingStack.Screen>
    </OnboardingStack.Navigator>
  );
};

export default DriverOnboarding;
