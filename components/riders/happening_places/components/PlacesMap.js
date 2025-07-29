/**
 * PlacesMap Component
 * Renders a premium scrollable list of place cards with rich details and visual elements.
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { colors, spacing, typography, elevation, getCategoryColor, formatDistance, getCategoryDisplayName } from '../styles/happeningStyles';

// Get screen dimensions for responsive layouts
const { width } = Dimensions.get('window');
const CARD_WIDTH = width - spacing.medium * 2;
const COMPACT_IMAGE_SIZE = 80; // Smaller, square image for horizontal layout

// Enhanced placeholder for when no places are found
const NoPlacesFound = () => (
  React.createElement(View, { style: styles.noPlacesContainer },
    React.createElement(View, { style: styles.noPlacesIconContainer },
      React.createElement(Text, { style: styles.noPlacesIcon }, '🔍')
    ),
    React.createElement(Text, { style: styles.noPlacesTitle }, 'No places found'),
    React.createElement(Text, { style: styles.noPlacesText }, 'Try selecting a different category')
  )
);

// Compact, Action-Oriented PlaceCard component
const PlaceCard = ({ place, onCardTap }) => {
  const [isPressed, setIsPressed] = useState(false);
  const categoryColor = getCategoryColor(place.category);
  const categoryName = getCategoryDisplayName(place.category);
  
  // Get the most relevant property for quick display
  const getKeyProperty = () => {
    if (!place.properties) return null;
    
    const propertyPriority = {
      priceRange: '💰',
      estimatedTime: '⏰',
      bestTime: '🕒',
      openHours: '🕒',
      cuisine: '🍽️',
      stores: '🏪',
      facilities: '🎯',
      terminals: '✈️',
      platforms: '🚉',
      stars: '⭐',
    };
    
    for (const [key, icon] of Object.entries(propertyPriority)) {
      if (place.properties[key]) {
        return { key, value: place.properties[key], icon };
      }
    }
    return null;
  };
  
  const keyProperty = getKeyProperty();

  return React.createElement(TouchableOpacity, {
    style: [styles.compactCard, isPressed && styles.cardPressed],
    onPress: () => onCardTap(place.id),
    onPressIn: () => setIsPressed(true),
    onPressOut: () => setIsPressed(false),
    activeOpacity: 0.95
  },
    // Left side: Compact square image with rating overlay
    React.createElement(View, { style: styles.imageSection },
      React.createElement(ImageBackground, 
        { 
          source: { uri: place.imageUrl }, 
          style: styles.compactImage,
          imageStyle: { borderRadius: spacing.small }
        },
        React.createElement(View, { style: styles.compactRating },
          React.createElement(Text, { style: styles.ratingValue }, `${place.rating}`),
          React.createElement(Text, { style: styles.starIcon }, '⭐')
        )
      )
    ),
    
    // Right side: Content and CTA
    React.createElement(View, { style: styles.contentSection },
      // Top row: Title and Category
      React.createElement(View, { style: styles.titleRow },
        React.createElement(Text, { style: styles.compactTitle, numberOfLines: 1 }, place.name),
        React.createElement(View, { style: [styles.compactCategory, { backgroundColor: categoryColor }] },
          React.createElement(Text, { style: styles.categoryLabel }, categoryName)
        )
      ),
      
      // Middle: Key property or description
      keyProperty ? 
        React.createElement(View, { style: styles.propertyInfo },
          React.createElement(Text, { style: styles.propertyIcon }, keyProperty.icon),
          React.createElement(Text, { style: styles.propertyText, numberOfLines: 1 }, keyProperty.value)
        ) :
        React.createElement(Text, { style: styles.compactDescription, numberOfLines: 1 }, place.description),
      
      // Bottom: Distance and prominent CTA
      React.createElement(View, { style: styles.actionRow },
        React.createElement(View, { style: styles.distanceInfo },
          React.createElement(Text, { style: styles.distanceIcon }, '📍'),
          React.createElement(Text, { style: styles.distanceValue }, formatDistance(place.distance))
        ),
        React.createElement(View, { style: styles.ctaButton },
          React.createElement(Text, { style: styles.ctaText }, 'Book Now')
        )
      )
    )
  );
};

const PlacesMap = (props) => {
  const { places, onMarkerTap } = props;

  if (!places || places.length === 0) {
    return React.createElement(NoPlacesFound);
  }

  const renderItem = ({ item }) => React.createElement(PlaceCard, {
    place: item,
    onCardTap: onMarkerTap
  });

  // Header component for the list
  const ListHeader = () => {
    return React.createElement(View, { style: styles.listHeader },
      React.createElement(Text, { style: styles.listHeaderTitle }, 
        `${places.length} ${places.length === 1 ? 'Place' : 'Places'} Found`
      )
    );
  };

  return React.createElement(FlatList, {
    data: places,
    renderItem: renderItem,
    keyExtractor: (item) => item.id,
    contentContainerStyle: styles.listContainer,
    showsVerticalScrollIndicator: false,
    ListHeaderComponent: ListHeader,
    initialNumToRender: 5,
    maxToRenderPerBatch: 5,
    windowSize: 5
  });
};

const styles = StyleSheet.create({
  // List container and header styles
  listContainer: {
    padding: spacing.medium,
    paddingBottom: spacing.xxlarge,
  },
  listHeader: {
    marginBottom: spacing.medium,
    paddingVertical: spacing.small,
  },
  listHeaderTitle: {
    ...typography.styles.subtitle,
    color: colors.text.secondary,
  },
  
  // No places found styles
  noPlacesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.large,
    marginTop: spacing.xxlarge,
  },
  noPlacesIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  noPlacesIcon: {
    fontSize: 32,
  },
  noPlacesTitle: {
    ...typography.styles.title,
    color: colors.text.primary,
    marginBottom: spacing.small,
  },
  noPlacesText: {
    ...typography.styles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  
  // Compact Card styles
  compactCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.borderRadius,
    marginBottom: spacing.medium,
    overflow: 'hidden',
    width: CARD_WIDTH,
    flexDirection: 'row',
    height: 100, // Fixed compact height
    ...elevation.card,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    ...elevation.z1,
  },
  imageSection: {
    width: COMPACT_IMAGE_SIZE,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.small,
  },
  compactImage: {
    width: COMPACT_IMAGE_SIZE - spacing.small * 2,
    height: COMPACT_IMAGE_SIZE - spacing.small * 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  contentSection: {
    flex: 1,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    justifyContent: 'space-between',
  },
  
  // Compact Rating styles
  compactRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    margin: 4,
  },
  ratingValue: {
    color: colors.text.light,
    fontWeight: typography.weights.bold,
    fontSize: 10,
    marginRight: 2,
  },
  starIcon: {
    fontSize: 8,
  },
  
  // Compact Content styles
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xsmall,
  },
  compactTitle: {
    ...typography.styles.subtitle,
    color: colors.text.primary,
    fontSize: typography.sizes.regular,
    fontWeight: typography.weights.semibold,
    flex: 1,
    marginRight: spacing.small,
  },
  compactCategory: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  categoryLabel: {
    ...typography.styles.caption,
    color: colors.text.light,
    fontSize: 10,
    fontWeight: typography.weights.medium,
  },
  propertyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xsmall,
  },
  propertyIcon: {
    fontSize: 12,
    marginRight: spacing.xsmall,
    width: 14,
  },
  propertyText: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    fontSize: typography.sizes.small,
    flex: 1,
  },
  compactDescription: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    fontSize: typography.sizes.small,
    marginBottom: spacing.xsmall,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  distanceValue: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    fontSize: typography.sizes.small,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  ctaText: {
    ...typography.styles.button,
    color: colors.text.light,
    fontSize: 12,
    fontWeight: typography.weights.semibold,
  },
  
  // Badge styles
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    margin: spacing.medium,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: spacing.small,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xsmall,
    ...elevation.z1,
  },
  badgeText: {
    ...typography.styles.badge,
    color: colors.text.primary,
  },
  
  // Card content styles
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.small,
  },
  cardTitle: {
    ...typography.styles.title,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.small,
  },
  categoryBadge: {
    paddingVertical: spacing.xsmall,
    paddingHorizontal: spacing.small,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  categoryText: {
    ...typography.styles.badge,
    color: colors.text.light,
  },
  cardDescription: {
    ...typography.styles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.medium,
    lineHeight: 22,
  },
  
  // Property rows
  propertyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  propertyIcon: {
    fontSize: typography.sizes.regular,
    marginRight: spacing.xsmall,
    width: 24,
    textAlign: 'center',
  },
  propertyLabel: {
    ...typography.styles.bodySmall,
    color: colors.text.tertiary,
    marginRight: spacing.small,
    fontWeight: typography.weights.medium,
  },
  propertyValue: {
    ...typography.styles.bodySmall,
    color: colors.text.secondary,
    flex: 1,
  },
  
  // Footer styles
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.medium,
    paddingTop: spacing.small,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceIcon: {
    fontSize: 14,
    marginRight: spacing.xsmall,
  },
  distanceText: {
    ...typography.styles.caption,
    color: colors.text.secondary,
  },
  bookNowText: {
    ...typography.styles.bodySmall,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
});

export default PlacesMap;
