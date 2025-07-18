import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';

import SplashScreen from './components/splash_screen';
import EarningsScreen from './components/earnings_tab';
import DriverDocumentsScreen from './components/driver_documents';
import DriverOnboarding from './components/driver_onboarding';
import { mockBookings } from './components/earnings_tab/mockData';

// Define the ParamList for the drawer navigator
type RootDrawerParamList = {
  Home: undefined;
  Earnings: undefined;
  DriverDocuments: undefined;
  DriverOnboarding: undefined;
};

// Define the type for the wrapper component's props
type EarningsScreenWrapperProps = DrawerScreenProps<RootDrawerParamList, 'Earnings'>;

const HomeView = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
    <Text>Swipe right to open the menu!</Text>
  </View>
);

const EarningsScreenWrapper: React.FC<EarningsScreenWrapperProps> = ({ navigation }) => {
  return (
    <EarningsScreen
      completedBookings={mockBookings}
      currency={{ symbol: '₹', decimal: 2 }}
      isLoading={false}
      navigation={navigation}
    />
  );
};

// Define the type for the onboarding wrapper's props
type OnboardingWrapperProps = DrawerScreenProps<RootDrawerParamList, 'DriverOnboarding'>;

const DriverOnboardingWrapper: React.FC<OnboardingWrapperProps> = ({ navigation }) => {
  const handleOnboardingComplete = () => {
    navigation.navigate('Home');
  };

  return <DriverOnboarding onComplete={handleOnboardingComplete} />;
};

const DriverDocumentsScreenWrapper = () => (
  <DriverDocumentsScreen onSave={() => console.log('Save action triggered')} />
);

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onReady={() => setIsLoading(false)} />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeView} />
        <Drawer.Screen name="Earnings" component={EarningsScreenWrapper} />
        <Drawer.Screen name="DriverDocuments" component={DriverDocumentsScreenWrapper} options={{ title: 'Driver Documents' }} />
        <Drawer.Screen name="DriverOnboarding" component={DriverOnboardingWrapper} options={{ title: 'Driver Onboarding (Test)' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;


