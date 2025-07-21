/**
 * Premium Design System for Driver Documents Feature
 */
import { StyleSheet } from 'react-native';

// 1. Color Palette
export const colors = {
  primary: '#007BFF',       // A professional and trustworthy blue
  primaryLight: '#E6F2FF',
  secondary: '#6c757d',     // Muted secondary color for less emphasis
  success: '#28a745',       // For success states, e.g., 'Approved'
  warning: '#ffc107',       // For pending states, e.g., 'In Review'
  danger: '#dc3545',        // For error or rejection states
  
  background: '#F8F9FA',   // A very light grey for the main background
  card: '#FFFFFF',          // White for cards and surfaces
  divider: '#E9ECEF',       // Light grey for dividers
  overlay: 'rgba(0, 0, 0, 0.6)',

  text: {
    primary: '#212529',     // Dark grey for primary text
    secondary: '#6c757d',   // Lighter grey for secondary text
    light: '#FFFFFF',         // White text for dark backgrounds
    link: '#007BFF',          // Blue for links
    placeholder: '#ADB5BD',  // Placeholder text color
  },
};

// 2. Spacing and Sizing
export const spacing = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
  
  // Component-specific sizes
  borderRadius: 12,
  cardBorderRadius: 16,
  buttonHeight: 50,
  inputHeight: 50,
};

// 3. Typography
const fontFamilies = {
  regular: 'System',
  bold: 'System',
};

export const typography = {
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  sizes: {
    small: 12,
    regular: 14,
    medium: 16,
    large: 18,
    xlarge: 24,
    title: 28,
  },
  styles: {
    title: {
      fontFamily: fontFamilies.bold,
      fontSize: 28,
      fontWeight: '700',
      color: colors.text.primary,
    },
    subtitle: {
      fontFamily: fontFamilies.regular,
      fontSize: 18,
      fontWeight: '500',
      color: colors.text.secondary,
    },
    body: {
      fontFamily: fontFamilies.regular,
      fontSize: 16,
      fontWeight: '400',
      color: colors.text.primary,
    },
    bodySmall: {
      fontFamily: fontFamilies.regular,
      fontSize: 14,
      fontWeight: '400',
      color: colors.text.secondary,
    },
    label: {
      fontFamily: fontFamilies.regular,
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    button: {
      fontFamily: fontFamilies.bold,
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.light,
    },
  },
};

// 4. Elevation & Shadow System
export const elevation = {
  z1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  z2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  z3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

// 5. Shared Styles & Helpers
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.medium,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Add other global styles as needed
});
