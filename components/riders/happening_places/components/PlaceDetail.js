/**
 * Place Detail Component
 * Rich modal overlay with place details, category-specific information, and booking options
 * Uses plain JS (no JSX)
 */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { colors, spacing, typography, elevation } from '../styles/happeningStyles';

/**
 * Creates a place detail modal component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onBook - Callback when booking option is selected
 * @returns {Object} React component with showDetail method
 */
const PlaceDetail = (props) => {
  // Destructure props
  const { onBook } = props;
  
  // State for modal visibility and current place
  const [visible, setVisible] = React.useState(false);
  const [place, setPlace] = React.useState(null);
  
  /**
   * Shows the detail modal for a specific place
   * 
   * @param {Object} placeData - Place data object to display
   */
  const showDetail = (placeData) => {
    setPlace(placeData);
    setVisible(true);
  };
  
  /**
   * Handles booking button press
   * 
   * @param {string} serviceType - Type of service to book ('hourly' or 'c2c')
   */
  const handleBook = (serviceType) => {
    if (onBook && place) {
      onBook(serviceType, place.id);
    }
    setVisible(false);
  };
  
  /**
   * Closes the modal
   */
  const handleClose = () => {
    setVisible(false);
  };
  
  // Helper function to get color based on category
  const getCategoryColor = (id) => {
    if (!id) return colors.primary;
    if (id.startsWith('market-')) return '#4CAF50'; // Green
    if (id.startsWith('restaurant-')) return '#FF9800'; // Orange
    if (id.startsWith('mall-')) return '#9C27B0'; // Purple
    if (id.startsWith('airport-')) return '#2196F3'; // Blue
    if (id.startsWith('station-')) return '#F44336'; // Red
    if (id.startsWith('hotel-')) return '#795548'; // Brown
    return colors.primary; // default
  };
  
  // Helper function to get category name
  const getCategoryName = (id) => {
    if (!id) return 'Place';
    if (id.startsWith('market-')) return 'Market';
    if (id.startsWith('restaurant-')) return 'Restaurant';
    if (id.startsWith('mall-')) return 'Mall';
    if (id.startsWith('airport-')) return 'Airport';
    if (id.startsWith('station-')) return 'Station';
    if (id.startsWith('hotel-')) return 'Hotel';
    return 'Place';
  };
  
  // Helper to check if a service is available for the current place
  const isServiceAvailable = (serviceType) => {
    return place && place.availableServices && place.availableServices.includes(serviceType);
  };
  
  // Detail row component for additional information with premium styling
  const DetailRow = ({ icon, label, value }) => {
    return React.createElement(
      View, 
      { style: styles.detailRow },
      React.createElement(
        Text,
        { style: styles.detailIcon },
        icon
      ),
      React.createElement(
        View,
        { style: styles.detailInfo },
        React.createElement(
          Text,
          { style: styles.detailLabel },
          label
        ),
        React.createElement(
          Text,
          { style: styles.detailValue },
          value
        )
      )
    );
  };
  
  // Create the modal component using React.createElement (no JSX)
  const component = React.createElement(
    Modal,
    { 
      visible,
      transparent: true,
      animationType: 'slide',
      onRequestClose: handleClose
    },
    React.createElement(
      View,
      { style: styles.modalOverlay },
      React.createElement(
        View, 
        { style: styles.modalContent },
        // Close button
        React.createElement(
          TouchableOpacity,
          { 
            style: styles.closeButton,
            onPress: handleClose,
            activeOpacity: 0.7
          },
          React.createElement(
            Text,
            { style: styles.closeButtonText },
            '×'
          )
        ),
        // Place image with rating overlay
        place && place.imageUrl && React.createElement(
          View,
          { style: styles.imageContainer },
          React.createElement(
            Image,
            { 
              source: { uri: place.imageUrl },
              style: styles.placeImage 
            }
          ),
          // Rating badge overlay with improved styling
          place.rating && React.createElement(
            View,
            { style: styles.ratingOverlay },
            React.createElement(
              Text,
              { style: styles.ratingIcon },
              '⭐'
            ),
            React.createElement(
              Text,
              { style: styles.ratingText },
              `${place.rating}`
            ),
            React.createElement(
              Text,
              { style: styles.ratingCount },
              `(${place.ratingCount || 0})`
            )
          )
        ),
        // Place details
        React.createElement(
          ScrollView,
          { style: styles.detailsContainer },
          // Place name
          place && React.createElement(
            Text,
            { style: styles.placeName },
            place.name
          ),
          // Place type badge
          place && place.id && React.createElement(
            View,
            { style: styles.categoryBadgeContainer },
            React.createElement(
              View,
              { 
                style: [styles.categoryBadge, { backgroundColor: getCategoryColor(place?.id) }] 
              },
              React.createElement(
                Text,
                { style: styles.categoryBadgeText },
                getCategoryName(place?.id)
              )
            )
          ),
          // Place description
          place && place.description && React.createElement(
            Text,
            { style: styles.placeDescription },
            place.description
          ),
          // Category-specific details
          place && place.additionalProps && React.createElement(
            View,
            { style: styles.additionalDetailsContainer },
            Object.entries(place.additionalProps || {}).map(([key, value]) => {
              return React.createElement(DetailRow, { 
                key: key,
                icon: 'ℹ️',
                label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'), // Format key for display
                value: value
              });
            }),
            place.priceRange && React.createElement(
              DetailRow,
              { 
                icon: '💰',
                label: 'Price range',
                value: `${place.priceRange || ''}${place.cuisine ? ' • ' + place.cuisine : ''}` 
              }
            ),
            place.stars && React.createElement(
              DetailRow,
              { 
                icon: '⭐',
                label: 'Rating',
                value: `${place.stars} Stars` 
              }
            ),
            place.amenities && React.createElement(
              DetailRow,
              { 
                icon: '🛎️',
                label: 'Amenities',
                value: place.amenities 
              }
            ),
            place.stores && React.createElement(
              DetailRow,
              { 
                icon: '🛍️',
                label: 'Stores',
                value: place.stores 
              }
            ),
            place.facilities && React.createElement(
              DetailRow,
              { 
                icon: '🏢',
                label: 'Facilities',
                value: place.facilities 
              }
            ),
            place.popularity && React.createElement(
              DetailRow,
              { 
                icon: '📊',
                label: 'Popularity',
                value: `${place.popularity.charAt(0).toUpperCase() + place.popularity.slice(1)}` 
              }
            ),
            place.bestTime && React.createElement(
              DetailRow,
              { 
                icon: '⏰',
                label: 'Best time to visit',
                value: place.bestTime 
              }
            ),
            place.estimatedTime && React.createElement(
              DetailRow,
              { 
                icon: '⌛',
                label: 'Time needed',
                value: place.estimatedTime 
              }
            ),
            place.terminals && React.createElement(
              DetailRow,
              { 
                icon: '✈️',
                label: 'Terminals',
                value: place.terminals 
              }
            ),
            place.platforms && React.createElement(
              DetailRow,
              { 
                icon: '🚉',
                label: 'Platforms',
                value: place.platforms 
              }
            ),
            place.openHours && React.createElement(
              DetailRow,
              { 
                icon: '🕒',
                label: 'Opening hours',
                value: place.openHours 
              }
            ),
            (place.peakHours || place.busyTimes) && React.createElement(
              DetailRow,
              { 
                icon: '⚠️',
                label: 'Peak hours',
                value: place.peakHours || place.busyTimes 
              }
            ),
            place.roomTypes && React.createElement(
              DetailRow,
              { 
                icon: '🛏️',
                label: 'Room types',
                value: place.roomTypes 
              }
            )
          ),

          // Available services section
          React.createElement(
            View,
            { style: styles.servicesContainer },
            // Section title
            React.createElement(
              Text,
              { style: styles.sectionTitle },
              'Available Services'
            ),
            // Dynamic booking buttons
            React.createElement(
              View,
              { style: styles.bookingActionsContainer },
              React.createElement(
                TouchableOpacity,
                {
                  style: [styles.bookingButton, styles.scheduleButton],
                  onPress: () => handleBook(isServiceAvailable('hourly') ? 'schedule_hourly' : 'schedule_c2c'),
                  activeOpacity: 0.8
                },
                React.createElement(
                  Text,
                  { style: styles.bookingButtonText },
                  'Schedule Ride'
                )
              ),
              React.createElement(
                TouchableOpacity,
                {
                  style: [styles.bookingButton, styles.bookNowButton],
                  onPress: () => handleBook(isServiceAvailable('hourly') ? 'now_hourly' : 'now_c2c'),
                  activeOpacity: 0.8
                },
                React.createElement(
                  Text,
                  { style: styles.bookingButtonText },
                  'Book Now'
                )
              )
            )
          )
        )
      )
    )
  );
  
  // Attach the showDetail method to the component
  component.showDetail = showDetail;
  
  return component;
};

// Styles for the component
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    marginTop: 50,
    marginHorizontal: 20,
    borderRadius: spacing.modalBorderRadius,
    maxHeight: '90%',
    overflow: 'hidden',
    ...elevation.z3,
  },
  closeButton: {
    position: 'absolute',
    right: spacing.medium,
    top: spacing.medium,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...elevation.z1,
  },
  closeButtonText: {
    color: colors.text.light,
    fontSize: typography.sizes.xlarge,
    fontWeight: typography.weights.medium,
    lineHeight: 36,
  },
  imageContainer: {
    width: '100%',
    height: spacing.cardImageHeight + spacing.large,
    position: 'relative',
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  ratingOverlay: {
    position: 'absolute',
    bottom: spacing.medium,
    left: spacing.medium,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingVertical: spacing.xsmall,
    paddingHorizontal: spacing.small,
    borderRadius: spacing.small,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: typography.sizes.small,
    marginRight: spacing.xsmall / 2,
  },
  ratingText: {
    color: colors.text.light,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.regular,
    marginRight: 3,
  },
  ratingCount: {
    color: colors.text.light,
    fontSize: typography.sizes.small,
    opacity: 0.9,
  },
  detailsContainer: {
    padding: spacing.cardPadding,
  },
  placeName: {
    ...typography.styles.headline,
    color: colors.text.primary,
    marginBottom: spacing.small,
  },
  categoryBadgeContainer: {
    marginBottom: spacing.medium,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xsmall,
    paddingHorizontal: spacing.small,
    borderRadius: spacing.small,
  },
  categoryBadgeText: {
    ...typography.styles.badge,
    color: colors.text.light,
  },
  placeDescription: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginBottom: spacing.large,
    lineHeight: 24,
  },
  additionalDetailsContainer: {
    marginBottom: spacing.large,
    borderRadius: spacing.medium,
    backgroundColor: colors.overlay,
    padding: spacing.medium,
    marginHorizontal: -spacing.small,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  detailIcon: {
    fontSize: typography.sizes.medium,
    marginRight: spacing.small,
    width: spacing.large,
    textAlign: 'center',
  },
  detailInfo: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.styles.bodySmall,
    color: colors.text.tertiary,
    fontWeight: typography.weights.medium,
    marginRight: spacing.small,
  },
  detailValue: {
    ...typography.styles.bodySmall,
    color: colors.text.primary,
    flex: 1,
  },
  servicesContainer: {
    marginBottom: spacing.large,
  },
  sectionTitle: {
    ...typography.styles.subtitle,
    color: colors.text.primary,
    marginBottom: spacing.medium,
  },
  bookingActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.medium,
  },
  bookingButton: {
    flex: 1,
    borderRadius: spacing.medium,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.small,
    ...elevation.z1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xsmall,
  },
  bookNowButton: {
    backgroundColor: colors.primary,
  },
  scheduleButton: {
    backgroundColor: colors.accent,
  },
  bookingButtonText: {
    color: colors.text.light,
    fontSize: typography.sizes.medium,
    fontWeight: typography.weights.semibold,
  }
});

export default PlaceDetail;
