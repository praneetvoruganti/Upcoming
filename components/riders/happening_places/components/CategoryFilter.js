/**
 * Category Filter Component
 * A premium filter bar of pill buttons for rider-relevant categories
 * Uses plain JS (no JSX)
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { colors, spacing, typography, getCategoryColor, elevation } from '../styles/happeningStyles';

/**
 * Creates a category filter bar component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onCategoryChange - Callback when category is selected
 * @param {string} props.selectedCategory - Currently selected category
 * @returns {Object} React component
 */
const CategoryFilter = (props) => {
  // Destructure props with defaults
  const { onCategoryChange, selectedCategory = 'all' } = props;
  
  // Available categories with enhanced information
  const categories = [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'tour', label: 'Tours', icon: '🗺️' },
    { id: 'market', label: 'Markets', icon: '🛒' },
    { id: 'restaurant', label: 'Food', icon: '🍽️' },
    { id: 'mall', label: 'Malls', icon: '🛍️' },
    { id: 'airport', label: 'Airports', icon: '✈️' },
    { id: 'station', label: 'Stations', icon: '🚉' },
    { id: 'hotel', label: 'Hotels', icon: '🏨' }
  ];
  
  // Create premium filter tabs using React.createElement (no JSX) with horizontal scroll
  return React.createElement(
    View,
    { style: styles.wrapper },
    React.createElement(
      View,
      { style: styles.container },
      React.createElement(
        ScrollView,
        { 
          horizontal: true,
          showsHorizontalScrollIndicator: false,
          contentContainerStyle: styles.scrollContent,
          decelerationRate: 'fast',
          snapToAlignment: 'center'
        },
        categories.map(category => {
          const isSelected = selectedCategory === category.id;
          const categoryColor = getCategoryColor(category.id);
          
          return React.createElement(
            TouchableOpacity,
            { 
              key: category.id,
              style: [
                styles.categoryButton,
                isSelected && styles.selectedButton,
                isSelected && { backgroundColor: categoryColor },
                !isSelected && styles.unselectedButton
              ],
              activeOpacity: 0.7,
              onPress: () => onCategoryChange(category.id)
            },
            // Icon element
            React.createElement(
              Text,
              { style: styles.categoryIcon },
              category.icon
            ),
            // Text element
            React.createElement(
              Text,
              { 
                style: [
                  styles.categoryText,
                  isSelected && styles.selectedText,
                  !isSelected && styles.unselectedText
                ] 
              },
              category.label
            ),
            // Selected indicator dot
            isSelected && React.createElement(
              View,
              { style: styles.selectedIndicator },
              null
            )
          )
        })
      )
    )
  );
};

// Premium category colors now come directly from the happeningStyles.js getCategoryColor function

// Premium styles for the component
const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: spacing.medium,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    ...elevation.z1
  },
  container: {
    height: spacing.filterBarHeight,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingRight: spacing.xlarge, // Extra padding for end of scroll
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    marginRight: spacing.medium,
    borderRadius: 28,
    height: 56,
    minWidth: 100,
  },
  unselectedButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
    ...elevation.z1
  },
  selectedButton: {
    backgroundColor: colors.primary,
    ...elevation.z2
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: spacing.small,
  },
  categoryText: {
    fontSize: typography.sizes.regular,
    fontWeight: typography.weights.semibold,
    marginLeft: spacing.xsmall,
  },
  unselectedText: {
    color: colors.text.secondary,
  },
  selectedText: {
    color: colors.text.light,
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: spacing.xsmall,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text.light
  }
});

export default CategoryFilter;
