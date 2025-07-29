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
            )
          )
        })
      )
    )
  );
};

// Premium category colors now come directly from the happeningStyles.js getCategoryColor function

// Compact, Premium styles for the component
const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: spacing.small,
    backgroundColor: colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider,
  },
  container: {
    height: 44, // Much more compact
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.medium,
    paddingRight: spacing.large, // Reduced padding
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.small + 2, // Tighter horizontal padding
    paddingVertical: 6, // Tighter vertical padding
    marginRight: spacing.small, // Reduced margin between buttons
    borderRadius: 20, // Smaller border radius for compact look
    height: 36, // Much more compact height
    minWidth: 70, // Reduced minimum width
  },
  unselectedButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
    opacity: 0.9,
  },
  selectedButton: {
    borderWidth: 1,
    borderColor: 'transparent',
    opacity: 1,
    transform: [{ scale: 1.02 }], // Subtle scale effect instead of shadow
  },
  categoryIcon: {
    fontSize: 14, // Smaller icon
    marginRight: 4, // Tighter spacing
  },
  categoryText: {
    fontSize: typography.sizes.small, // Smaller text
    fontWeight: typography.weights.medium, // Less bold
  },
  unselectedText: {
    color: colors.text.secondary,
  },
  selectedText: {
    color: colors.text.light,
    fontWeight: typography.weights.semibold, // Slightly bolder when selected
  },
  // Remove the selected indicator for cleaner design
});

export default CategoryFilter;
