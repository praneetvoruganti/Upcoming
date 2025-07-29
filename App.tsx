import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';

import SplashScreen from './components/splash_screen';
import EarningsScreen from './components/earnings_tab';
import DriverDocumentsScreen from './components/driver_documents';
import DriverOnboarding from './components/driver_onboarding';
import HappeningPlaces from './components/riders/happening_places';
import { mockBookings } from './components/earnings_tab/mockData';
import { ShareBusinessCard } from './components/share_business_card';
import { mockDriverProfile } from './components/share_business_card/mockDriverProfiles';
import RateCard from './components/rate_card';
import { LocalInsiderTips } from './components/local_insider_tips';
import FunUIComponentsScreen from './components/fun_ui_components';

// Define the ParamList for the drawer navigator
type RootDrawerParamList = {
  Home: undefined;
  Earnings: undefined;
  DriverDocuments: undefined;
  DriverOnboarding: undefined;
  HappeningPlaces: undefined;
  ShareBusinessCard: undefined;
  RateCard: undefined;
  LocalInsiderTips: undefined;
  FunUIComponents: undefined;
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

// Define the type for the Happening Places wrapper's props
type HappeningPlacesWrapperProps = DrawerScreenProps<RootDrawerParamList, 'HappeningPlaces'>;

const HappeningPlacesWrapper: React.FC<HappeningPlacesWrapperProps> = ({ navigation }) => {
  const handleBook = (serviceType: string, placeId: string) => {
    console.log(`Booking ${serviceType} service for place ${placeId}`);
    // Here you would integrate with your actual booking flow
    // e.g., navigation.navigate('BookingScreen', { serviceType, placeId });
  };

  return <HappeningPlaces onBook={handleBook} navigation={navigation} />;
};

const ShareBusinessCardWrapper = () => (
  <ShareBusinessCard
    driverProfile={mockDriverProfile}
    onShare={() => console.log('Card shared!')}
  />
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
                <Drawer.Screen name="HappeningPlaces" component={HappeningPlacesWrapper} options={{ title: 'Happening Places' }} />
        <Drawer.Screen name="ShareBusinessCard" component={ShareBusinessCardWrapper} options={{ title: 'Share My Business Card' }} />
        <Drawer.Screen name="RateCard" component={RateCard} options={{ title: 'Earnings Guide' }} />
        <Drawer.Screen name="LocalInsiderTips" component={LocalInsiderTips} options={{ title: 'Local Food & Chai Tips' }} />
        <Drawer.Screen name="FunUIComponents" component={FunUIComponentsScreen} options={{ title: 'Fun UI Components' }} />
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


