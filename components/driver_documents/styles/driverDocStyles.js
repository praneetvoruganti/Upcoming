/**
 * Premium Design System for Driver Documents Feature
 */
import { StyleSheet } from 'react-native';

// 1. Color Palette - Official OK2GO Brand Colors
export const colors = {
  primary: '#EE436E',       // Primary brand color - bright pink/magenta
  primaryLight: '#fef7f9',  // Light tint of primary for backgrounds
  secondary: '#FBDA25',     // Secondary brand color - bright yellow
  success: '#10b981',       // For success states, e.g., 'Approved'
  warning: '#FBDA25',       // Use secondary for pending states
  danger: '#ef4444',        // For error or rejection states
  
  background: '#FEFEFE',    // Brand white for main background
  card: '#FEFEFE',          // Brand white for cards and surfaces
  divider: '#f5f5f5',       // Subtle divider color
  overlay: 'rgba(32, 30, 30, 0.6)', // Brand black overlay

  text: {
    primary: '#201E1E',     // Brand black for primary text
    secondary: '#201E1E',   // Brand black with opacity for secondary text
    light: '#FEFEFE',       // Brand white for dark backgrounds
    link: '#EE436E',        // Primary brand color for links
    placeholder: '#201E1E', // Brand black with opacity for placeholder
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
      fontWeight: '800',
      color: colors.text.primary,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontFamily: fontFamilies.regular,
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.secondary,
      opacity: 0.8,
    },
    body: {
      fontFamily: fontFamilies.regular,
      fontSize: 16,
      fontWeight: '400',
      color: colors.text.primary,
      opacity: 0.9,
    },
    bodySmall: {
      fontFamily: fontFamilies.regular,
      fontSize: 14,
      fontWeight: '400',
      color: colors.text.secondary,
      opacity: 0.7,
    },
    label: {
      fontFamily: fontFamilies.regular,
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    button: {
      fontFamily: fontFamilies.bold,
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.light,
      letterSpacing: 0.3,
    },
  },
};

// 4. Elevation & Shadow System - Using Brand Colors
export const elevation = {
  z1: {
    shadowColor: '#201E1E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  z2: {
    shadowColor: '#201E1E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  z3: {
    shadowColor: '#201E1E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
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
