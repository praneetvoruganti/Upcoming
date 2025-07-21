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

// Premium place card component with enhanced UI elements
const PlaceCard = ({ place, onCardTap }) => {
  const [isPressed, setIsPressed] = useState(false);
  const categoryColor = getCategoryColor(place.categoryId) || colors.primary;
  const categoryName = getCategoryDisplayName(place.categoryId);
  
  // Handle badges display
  const renderBadges = () => {
    if (!place.badges || place.badges.length === 0) return null;
    
    return React.createElement(View, { style: styles.badgeContainer },
      place.badges.map((badge, index) => 
        React.createElement(View, 
          { 
            key: `badge-${index}`, 
            style: [styles.badge, index > 0 && { marginLeft: spacing.small }] 
          },
          React.createElement(Text, { style: styles.badgeText }, 
            badge === 'hourly' ? '⏱️ Hourly' : '🔄 C2C'
          )
        )
      )
    );
  };
  
  // Handle additional property rows
  const renderPropertyRows = () => {
    if (!place.additionalProps) return null;
    
    const propertyIcons = {
      popularity: '👥',
      estimatedTime: '⏱️',
      bestTime: '🕒',
      openHours: '🕙',
      busyTimes: '⏰',
      priceRange: '💰',
      cuisine: '🍽️',
      stores: '🛍️',
      facilities: '🏬',
      terminals: '🛫',
      platforms: '🚉',
      peakHours: '📊',
      stars: '⭐',
      roomTypes: '🛏️',
      amenities: '🛁'
    };
    
    return Object.entries(place.additionalProps).map(([key, value], index) => {
      if (!value) return null;
      
      return React.createElement(View, 
        { 
          key: `prop-${index}`,
          style: styles.propertyRow 
        },
        React.createElement(Text, { style: styles.propertyIcon }, propertyIcons[key] || '•'),
        React.createElement(Text, { style: styles.propertyLabel }, key.charAt(0).toUpperCase() + key.slice(1) + ':'),
        React.createElement(Text, { style: styles.propertyValue }, value)
      );
    });
  };

  return React.createElement(TouchableOpacity, {
    style: [styles.card, isPressed && styles.cardPressed],
    onPress: () => onCardTap(place.id),
    onPressIn: () => setIsPressed(true),
    onPressOut: () => setIsPressed(false),
    activeOpacity: 0.9
  },
    // Card Image with Overlay
    React.createElement(ImageBackground, 
      { 
        source: { uri: place.imageUrl }, 
        style: styles.cardImage,
        imageStyle: { borderTopLeftRadius: spacing.cardBorderRadius, borderTopRightRadius: spacing.cardBorderRadius }
      },
      // Rating overlay
      React.createElement(View, { style: styles.ratingContainer },
        React.createElement(Text, { style: styles.ratingText }, `${place.rating}`),
        React.createElement(Text, { style: styles.ratingIcon }, '⭐'),
        React.createElement(Text, { style: styles.ratingCount }, `(${place.ratingCount})`)
      ),
      // Badge overlay
      renderBadges()
    ),
    // Card Body
    React.createElement(View, { style: styles.cardBody },
      // Title and Category
      React.createElement(View, { style: styles.cardHeader },
        React.createElement(Text, { style: styles.cardTitle, numberOfLines: 1 }, place.name),
        React.createElement(View, { style: [styles.categoryBadge, { backgroundColor: categoryColor }] },
          React.createElement(Text, { style: styles.categoryText }, categoryName)
        )
      ),
      // Description
      React.createElement(Text, { style: styles.cardDescription, numberOfLines: 2 }, place.description),
      // Property rows
      renderPropertyRows(),
      // Footer with distance
      React.createElement(View, { style: styles.cardFooter },
        React.createElement(View, { style: styles.distanceContainer },
          React.createElement(Text, { style: styles.distanceIcon }, '📍'),
          React.createElement(Text, { style: styles.distanceText }, formatDistance(place.distance))
        ),
        React.createElement(Text, { style: styles.bookNowText }, 'See Booking Options →')
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
  
  // Card styles
  card: {
    backgroundColor: colors.card,
    borderRadius: spacing.cardBorderRadius,
    marginBottom: spacing.large,
    overflow: 'hidden',
    width: CARD_WIDTH,
    ...elevation.card,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    ...elevation.z1,
  },
  cardImage: {
    width: '100%',
    height: spacing.cardImageHeight,
    justifyContent: 'space-between',
  },
  cardBody: {
    padding: spacing.cardPadding,
  },
  
  // Rating styles
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderRadius: spacing.small,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.xsmall,
    margin: spacing.medium,
  },
  ratingText: {
    color: colors.text.light,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.regular,
    marginRight: 2,
  },
  ratingIcon: {
    fontSize: typography.sizes.small,
    marginRight: spacing.xsmall,
  },
  ratingCount: {
    color: colors.text.light,
    fontSize: typography.sizes.small,
    opacity: 0.9,
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
