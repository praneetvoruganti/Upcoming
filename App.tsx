import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerScreenProps } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EarningsScreen from './components/earnings_tab';
import DriverDocumentsScreen from './components/driver_documents';
import DriverOnboarding from './components/driver_onboarding';

import { completedBookings } from './components/earnings_tab/mockData';

// Define the ParamList for the drawer navigator
// Define ParamLists for the navigators
type RootStackParamList = {
  Main: NavigatorScreenParams<RootDrawerParamList>;
  Onboarding: undefined;
};

type RootDrawerParamList = {
  Home: undefined;
  Earnings: undefined;
  DriverDocuments: undefined;
};

const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
    <Text>Swipe right to open the menu!</Text>
  </View>
);

type EarningsScreenWrapperProps = DrawerScreenProps<RootDrawerParamList, 'Earnings'>;

const EarningsScreenWrapper = ({ navigation }: EarningsScreenWrapperProps) => (
  <EarningsScreen 
    completedBookings={completedBookings} 
    currency={{ symbol: '₹', decimal: 2 }} 
    isLoading={false} 
    navigation={navigation} 
  />
);

const DriverDocumentsScreenWrapper = () => (
  <DriverDocumentsScreen onSave={() => console.log('Save action triggered')} />
);

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Earnings" component={EarningsScreenWrapper} />
      <Drawer.Screen
        name="DriverDocuments"
        component={DriverDocumentsScreenWrapper}
        options={{ title: 'Driver Documents' }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Start Onboarding"
        onPress={() => props.navigation.navigate('Onboarding')}
      />
    </DrawerContentScrollView>
  );
};

const App = () => {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  const handleOnboardingComplete = () => {
    navigationRef.current?.navigate('Main', { screen: 'DriverDocuments' });
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainDrawerNavigator} />
        <Stack.Screen name="Onboarding">
          {() => <DriverOnboarding onComplete={handleOnboardingComplete} />}
        </Stack.Screen>
      </Stack.Navigator>
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

