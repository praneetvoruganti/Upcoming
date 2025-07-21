/**
 * Happening Places Feature
 * Entry point for the Happening Places feature
 * Exports a single HappeningPlaces component that takes onBook prop
 * and internally renders the onboarding flow
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import HappeningPlacesScreen from './screens/HappeningPlacesScreen';
import { colors } from './styles/happeningStyles';

/**
 * Main component for the Happening Places feature
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onBook - Callback when a booking is made (serviceType, placeId)
 * @param {Object} props.navigation - Navigation object
 * @returns {React.ReactNode} React component
 */
const HappeningPlaces = (props) => {
  // Destructure props
  const { onBook, navigation } = props;
  
  /**
   * Handles booking from the Happening Places screen
   * 
   * @param {string} serviceType - Type of service to book ('hourly' or 'c2c')
   * @param {string} placeId - ID of the place to book
   */
  const handleBook = (serviceType, placeId) => {
    // Pass booking information to parent component
    if (onBook) {
      onBook(serviceType, placeId);
    }
    
    // You could navigate to a booking flow screen here if needed
    // navigation.navigate('BookingScreen', { serviceType, placeId });
  };
  
  // Create the component using React.createElement (no JSX) that returns a ReactNode
  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(
      HappeningPlacesScreen,
      { 
        onBook: handleBook,
        navigation: navigation
      }
    )
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});

export default HappeningPlaces;
