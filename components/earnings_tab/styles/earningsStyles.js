// Centralized stylesheet for the Earnings Tab.
// Defines a consistent color palette and styles for all components.

import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Color Palette
const COLORS = {
  primary: '#007bff', // A professional blue
  white: '#ffffff',
  lightGray: '#f0f2f5', // Softer background color
  gray: '#adb5bd',
  darkGray: '#495057',
  black: '#000000',
  green: '#28a745',
  red: '#dc3545',
  border: '#dee2e6',
};

export const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  // Header
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  // Filter buttons
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  // Card style for wrapping content
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // Dashboard metrics
  dashboardContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  dashboardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: 8,
  },
  primaryMetricValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  secondaryMetricsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  secondaryMetricBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginHorizontal: 15,
  },
  secondaryMetricLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginRight: 5,
  },
  secondaryMetricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  tertiaryMetricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tertiaryMetricBox: {
    alignItems: 'center',
  },
  tertiaryMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  tertiaryMetricLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  savedValue: {
    color: COLORS.green,
  },
  // Chart
  chartContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  // Trip History List
  listContainer: {
    flex: 1,
  },
  // Trip Item
  tripItem: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tripItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripDate: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  fareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripFare: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  indicatorIcon: {
    fontSize: 16,
    color: COLORS.gray,
    marginLeft: 8,
  },
  tripLocations: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  locationText: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  // Earnings Breakdown
  earningsBreakdown: {
    backgroundColor: '#fafafa', // Slightly different background for emphasis
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  breakdownLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  deductionText: {
    color: COLORS.red,
  },
  // Weekly Summary
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 15,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryColumn: {
    alignItems: 'center',
  },
  summaryColumnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  summaryPrimaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  summaryMetaValue: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  // Tax Summary
  taxSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taxLabel: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  taxValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  taxDisclaimer: {
    fontSize: 12,
    color: COLORS.gray,
    fontStyle: 'italic',
    marginTop: 10,
  },
});