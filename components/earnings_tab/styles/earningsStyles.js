/**
 * Premium Design System for Earnings Tab
 * Sophisticated color palette, typography, spacing, and elevation system
 * Designed for modern, professional financial interface
 */

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Premium Color Palette
const colors = {
  // Primary brand colors
  primary: '#1a73e8',
  primaryLight: '#4285f4',
  primaryDark: '#1557b0',
  
  // Semantic colors for financial data
  success: '#34a853',
  successLight: '#81c995',
  successMuted: '#e8f5e8',
  
  warning: '#fbbc04',
  warningLight: '#fdd663',
  warningMuted: '#fef7e0',
  
  danger: '#ea4335',
  dangerLight: '#f28b82',
  dangerMuted: '#fce8e6',
  
  info: '#1a73e8',
  infoLight: '#8ab4f8',
  infoMuted: '#e8f0fe',
  
  // Neutral colors
  background: '#f8f9fa',
  surface: '#ffffff',
  surfaceVariant: '#f1f3f4',
  
  // Text colors
  text: {
    primary: '#202124',
    secondary: '#5f6368',
    tertiary: '#80868b',
    disabled: '#bdc1c6',
    light: '#ffffff',
    inverse: '#ffffff',
  },
  
  // Border and divider colors
  border: '#dadce0',
  divider: '#e8eaed',
  outline: '#dadce0',
  
  // Interactive states
  hover: '#f1f3f4',
  focus: '#e8f0fe',
  pressed: '#e8eaed',
  
  // Overlay colors
  overlay: 'rgba(32, 33, 36, 0.6)',
  scrim: 'rgba(0, 0, 0, 0.32)',
};

// Spacing tokens
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  
  // Specific spacing
  cardPadding: 16,
  cardMargin: 12,
  sectionSpacing: 20,
  componentSpacing: 8,
};

// Typography system
const typography = {
  // Font sizes
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    xxxxl: 28,
    xxxxxl: 32,
    display: 48,
  },
  
  // Font weights
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  
  // Typography styles
  styles: {
    // Headers
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
    h2: { fontSize: 28, fontWeight: '700', lineHeight: 36 },
    h3: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
    h4: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    h5: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
    h6: { fontSize: 16, fontWeight: '600', lineHeight: 22 },
    
    // Body text
    body1: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
    body2: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    
    // Labels and captions
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    label: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
    overline: { fontSize: 10, fontWeight: '500', lineHeight: 16, letterSpacing: 1.5 },
    
    // Special styles
    button: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
    display: { fontSize: 48, fontWeight: '700', lineHeight: 56 },
  },
};

// Elevation system
const elevation = {
  none: {
    elevation: 0,
    shadowOpacity: 0,
  },
  
  level1: {
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  
  level2: {
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  
  level3: {
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 4,
  },
  
  level4: {
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.20,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Border radius tokens
const borderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 9999,
};

// Animation durations
const animations = {
  fast: 150,
  normal: 250,
  slow: 350,
};

// Export design tokens
export {
  colors,
  spacing,
  typography,
  elevation,
  borderRadius,
  animations,
  width as screenWidth,
};

// Premium StyleSheet using design tokens
export const styles = StyleSheet.create({
  // Main containers
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  scrollContainer: {
    paddingBottom: spacing.xxxxl,
  },
  
  // Header styles
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  
  headerTitle: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  
  headerSubtitle: {
    ...typography.styles.body2,
    color: colors.text.secondary,
  },
  
  // Filter buttons
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider,
  },
  
  filterButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.xxl,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  
  filterButtonText: {
    ...typography.styles.label,
    color: colors.text.secondary,
  },
  
  filterButtonTextActive: {
    color: colors.text.light,
    fontWeight: typography.weights.semibold,
  },
  
  // Premium card style
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.cardPadding,
    marginHorizontal: spacing.lg,
    marginTop: spacing.cardMargin,
    ...elevation.level2,
  },
  
  // Dashboard metrics - premium design
  dashboardContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  
  dashboardTitle: {
    ...typography.styles.overline,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  primaryMetricValue: {
    ...typography.styles.display,
    color: colors.primary,
  },
  
  primaryMetricCurrency: {
    ...typography.styles.h4,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  
  secondaryMetricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    width: '100%',
  },
  
  secondaryMetricBox: {
    alignItems: 'center',
  },
  
  secondaryMetricLabel: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  
  secondaryMetricValue: {
    ...typography.styles.h6,
    color: colors.text.primary,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.lg,
  },
  
  // Tertiary metrics row
  tertiaryMetricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.lg,
    borderTopWidth: 0.5,
    borderTopColor: colors.divider,
  },
  
  tertiaryMetricBox: {
    alignItems: 'center',
    flex: 1,
  },
  
  tertiaryMetricValue: {
    ...typography.styles.h5,
    color: colors.text.primary,
  },
  
  tertiaryMetricLabel: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  
  // Semantic value colors
  successValue: {
    color: colors.success,
  },
  
  warningValue: {
    color: colors.warning,
  },
  
  dangerValue: {
    color: colors.danger,
  },
  
  // Chart container
  chartContainer: {
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  
  // Trip History List - compact design
  listContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  
  listHeader: {
    ...typography.styles.h6,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  
  // Compact Trip Item
  tripItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...elevation.level1,
  },
  
  tripItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  tripDate: {
    ...typography.styles.label,
    color: colors.text.secondary,
  },
  
  fareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  tripFare: {
    ...typography.styles.h6,
    color: colors.primary,
  },
  
  indicatorIcon: {
    ...typography.styles.caption,
    color: colors.text.tertiary,
    marginLeft: spacing.sm,
  },
  
  tripLocations: {
    paddingTop: spacing.sm,
    borderTopWidth: 0.5,
    borderTopColor: colors.divider,
  },
  
  locationText: {
    ...typography.styles.body2,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  
  // Compact Earnings Breakdown
  earningsBreakdown: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  
  breakdownLabel: {
    ...typography.styles.body2,
    color: colors.text.secondary,
  },
  
  breakdownValue: {
    ...typography.styles.label,
    color: colors.text.primary,
  },
  
  deductionText: {
    color: colors.danger,
  },
  
  // Card titles
  cardTitle: {
    ...typography.styles.h5,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  
  // Summary styles
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  summaryColumn: {
    alignItems: 'center',
    flex: 1,
  },
  
  summaryColumnTitle: {
    ...typography.styles.label,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  
  summaryPrimaryValue: {
    ...typography.styles.h4,
    color: colors.primary,
  },
  
  summaryMetaValue: {
    ...typography.styles.caption,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  
  // Tax Summary - premium design
  taxSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  
  taxLabel: {
    ...typography.styles.body1,
    color: colors.text.primary,
  },
  
  taxValue: {
    ...typography.styles.h5,
    color: colors.primary,
  },
  
  taxDisclaimer: {
    ...typography.styles.caption,
    color: colors.text.tertiary,
    fontStyle: 'italic',
    marginTop: spacing.md,
    textAlign: 'center',
  },
  
  // Empty states
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxxl,
  },
  
  emptyText: {
    ...typography.styles.body2,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});