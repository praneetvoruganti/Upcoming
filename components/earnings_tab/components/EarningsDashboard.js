
// Displays a dashboard of key performance metrics.
// Shows earnings, trips, time online, and other stats.

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/earningsStyles';

const formatTime = (minutes) => {
  if (minutes < 1) return '0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h > 0 ? `${h}h ` : ''}${m}m`;
};

const EarningsDashboard = ({ totalEarnings, tripCount, avgPerTrip, totalTimeOnline, earningsPerHour, totalCommissionSaved, currency }) => {
  const safeCurrency = currency || { symbol: '₹', decimal: 2 };

  return (
    <View style={styles.dashboardContainer}>
      <Text style={styles.dashboardTitle}>Your Earnings</Text>
      <Text style={styles.primaryMetricValue}>
        {`${safeCurrency.symbol}${totalEarnings.toFixed(safeCurrency.decimal)}`}
      </Text>
      <View style={styles.secondaryMetricsContainer}>
        <View style={styles.secondaryMetricBox}>
          <Text style={styles.secondaryMetricLabel}>Per Hour</Text>
          <Text style={styles.secondaryMetricValue}>{`${safeCurrency.symbol}${earningsPerHour.toFixed(safeCurrency.decimal)}`}</Text>
        </View>
        <View style={styles.secondaryMetricBox}>
          <Text style={styles.secondaryMetricLabel}>Per Trip</Text>
          <Text style={styles.secondaryMetricValue}>{`${safeCurrency.symbol}${avgPerTrip.toFixed(safeCurrency.decimal)}`}</Text>
        </View>
      </View>

      <View style={styles.tertiaryMetricsContainer}>
        <View style={styles.tertiaryMetricBox}>
          <Text style={styles.tertiaryMetricValue}>{tripCount}</Text>
          <Text style={styles.tertiaryMetricLabel}>Total Trips</Text>
        </View>
        <View style={styles.tertiaryMetricBox}>
          <Text style={styles.tertiaryMetricValue}>{formatTime(totalTimeOnline)}</Text>
          <Text style={styles.tertiaryMetricLabel}>Time Online</Text>
        </View>
        <View style={styles.tertiaryMetricBox}>
          <Text style={[styles.tertiaryMetricValue, styles.savedValue]}>{`${safeCurrency.symbol}${totalCommissionSaved.toFixed(safeCurrency.decimal)}`}</Text>
          <Text style={styles.tertiaryMetricLabel}>Commission Saved</Text>
        </View>
      </View>
    </View>
  );
};

export default EarningsDashboard;
