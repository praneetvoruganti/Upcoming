/**
 * Happening Places Screen
 * Main screen that orchestrates the Happening Places feature with rich UI
 * Uses plain JS (no JSX)
 */
import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../styles/happeningStyles';
import CategoryFilter from '../components/CategoryFilter';
import PlacesMap from '../components/PlacesMap';
import PlaceDetail from '../components/PlaceDetail';
import { fetchPlaces, bookService } from '../services/happeningService';

/**
 * Creates the main screen for the Happening Places feature
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onBook - Callback when a booking is made
 * @param {Object} props.navigation - Navigation object
 * @returns {Object} React component
 */
const HappeningPlacesScreen = (props) => {
  // Destructure props
  const { onBook, navigation } = props;
  
  // Component state
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // References
  const mapRef = useRef(null);
  const placeDetailRef = useRef(null);
  
  // Mock user location - in a real app, this would come from the device
  const userLocation = {
    lat: 19.0760,
    lng: 72.8777,
    locationName: 'Mumbai, India' // Added for UI enhancement
  };
  
  /**
   * Fetch places based on current category and location
   */
  const fetchPlacesData = async () => {
    setLoading(true);
    try {
      const filters = {
        lat: userLocation.lat,
        lng: userLocation.lng,
        category: selectedCategory
      };
      
            const placesData = await fetchPlaces(filters);
      setPlaces(placesData);
      

    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Handles category change
   * 
   * @param {string} category - Selected category
   */
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  /**
   * Handles marker tap
   * 
   * @param {string} placeId - ID of the tapped place
   */
  const handleMarkerTap = (placeId) => {
    const selectedPlace = places.find(place => place.id === placeId);
    if (selectedPlace && placeDetailRef.current && placeDetailRef.current.showDetail) {
      placeDetailRef.current.showDetail(selectedPlace);
    }
  };
  
  /**
   * Handles booking request
   * 
   * @param {string} serviceType - Type of service to book
   * @param {string} placeId - ID of the place to book
   */
  const handleBook = (serviceType, placeId) => {
    // Pass the booking request to parent component
    if (onBook) {
      onBook(serviceType, placeId);
    }
  };
  
  // Fetch places on mount and when category changes
  useEffect(() => {
    fetchPlacesData();
  }, [selectedCategory]);
  
  // Create the screen component using React.createElement (no JSX)
  const screenComponent = React.createElement(
    View,
    { style: styles.container },
    // Category filter
    React.createElement(
      CategoryFilter,
      { 
        selectedCategory,
        onCategoryChange: handleCategoryChange 
      }
    ),
    // Places component (previously Map component)
    React.createElement(
      PlacesMap,
      {
        places,
        onMarkerTap: handleMarkerTap
      }
    ),
    // Place detail modal
    React.createElement(
      PlaceDetail,
      { 
        ref: placeDetailRef,
        onBook: handleBook
      }
    )
  );
  
  return screenComponent;
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)'
  }
});

export default HappeningPlacesScreen;
