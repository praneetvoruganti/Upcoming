/**
 * Happening Places Styles
 * Premium design system for the Happening Places feature
 */

// Enhanced color palette with semantic naming for premium feel
const colors = {
  // Brand colors
  primary: '#4361EE', // Refined blue
  secondary: '#FFBE0B', // Vibrant amber
  accent: '#FF4D6D', // Modern pink
  
  // Background variants
  background: '#F7F8FC',
  card: '#FFFFFF',
  overlay: 'rgba(13, 17, 54, 0.08)',
  divider: '#EAEDF5',
  
  // Semantic colors
  success: '#06D6A0',
  warning: '#FFB800',
  error: '#FF4D4D',
  info: '#4CC9F0',
  
  // Text colors
  text: {
    primary: '#0D1136',
    secondary: '#4E546A',
    tertiary: '#77798C',
    light: '#FFFFFF',
    inverse: '#FFFFFF'
  },
  
  // Category colors (enhanced for vibrant yet premium feel)
  categories: {
    all: '#4361EE',      // Primary blue
    tour: '#FFC300',     // Gold for tours
    market: '#10B981',   // Emerald green
    restaurant: '#F59E0B', // Amber
    mall: '#8B5CF6',     // Violet
    airport: '#3B82F6',   // Blue
    station: '#EF4444',   // Red
    hotel: '#8B5D44'      // Brown
  },
  
  // States
  states: {
    pressed: 'rgba(67, 97, 238, 0.15)',
    focused: 'rgba(67, 97, 238, 0.2)',
    disabled: 'rgba(78, 84, 106, 0.4)'
  },
  
  // Gradients (for premium elements)
  gradients: {
    primary: ['#4361EE', '#3A56D4'],
    card: ['rgba(255,255,255,0.9)', '#FFFFFF']
  }
};

// Enhanced spacing system for consistent rhythm
const spacing = {
  // Base spacing units
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
  
  // Specific component measurements
  filterBarHeight: 64, // Slightly taller for premium feel
  filterBarPadding: 12,
  cardBorderRadius: 16,
  cardImageHeight: 180,
  cardPadding: 20,
  badgeSize: 28,
  iconSize: {
    small: 16,
    medium: 20,
    large: 24
  },
  modalWidth: '90%',
  modalMaxWidth: 400,
  modalBorderRadius: 20
};

// Typography system with improved hierarchy
const typography = {
  // Font sizes with more precision for better hierarchy
  sizes: {
    xsmall: 10,
    small: 12,
    regular: 14,
    medium: 16,
    large: 18,
    xlarge: 20,
    xxlarge: 24,
    xxxlarge: 28,
    display: 32
  },
  
  // Font weights with semantic names
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },
  
  // Text styles (combinations of size, weight, and line height)
  // Ready-to-use text styles for consistent typography
  styles: {
    headline: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 32,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      lineHeight: 28,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 22,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    badge: {
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 16,
    }
  }
};

// Enhanced animation system
const animations = {
  // Duration in milliseconds
  duration: {
    xfast: 150,
    fast: 200,
    normal: 300,
    slow: 450,
    xslow: 600
  },
  
  // Easing curves for natural movement
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)', 
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)'
  }
};

// Enhanced elevation system with refined shadows for depth
const elevation = {
  // Z-depth 1: cards, buttons
  z1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  
  // Z-depth 2: floating action buttons, raised cards
  z2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  
  // Z-depth 3: navigation drawer, modal bottom sheets
  z3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 8,
  },
  
  // Z-depth 4: dialogs, pickers
  z4: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 12,
  },
  
  // Card specific elegant shadow
  card: {
    shadowColor: '#2A2E43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  }
};

/**
 * Helper functions for consistent styling across components
 */

// Get category color based on category ID
const getCategoryColor = (categoryId) => {
  return colors.categories[categoryId] || colors.primary;
};

// Get category display name
const getCategoryDisplayName = (categoryId) => {
  const displayNames = {
    all: 'All Places',
    market: 'Market',
    restaurant: 'Restaurant',
    mall: 'Mall',
    airport: 'Airport',
    station: 'Station',
    hotel: 'Hotel',
    tour: 'Tour',
  };
  
  return displayNames[categoryId] || 'Place';
};

// Get distance text in a friendly format
const formatDistance = (meters) => {
  if (!meters && meters !== 0) return '';
  if (meters < 1000) {
    return `${meters}m`;
  } else {
    const km = (meters / 1000).toFixed(1);
    return `${km}km`;
  }
};

// Export all style tokens and helper functions
export {
  colors,
  spacing,
  typography,
  animations,
  elevation,
  getCategoryColor,
  getCategoryDisplayName,
  formatDistance
};
