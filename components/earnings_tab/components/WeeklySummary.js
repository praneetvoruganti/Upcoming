// Displays a summary of the current week vs. the previous week.
// Highlights key metrics like earnings, trips, and time online.

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/earningsStyles';

const formatTime = (minutes) => {
  if (minutes < 1) return '0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h > 0 ? `${h}h ` : ''}${m}m`;
};

const WeeklyColumn = ({ title, data, currency }) => (
  <View style={styles.summaryColumn}>
    <Text style={styles.summaryColumnTitle}>{title}</Text>
    <Text style={styles.summaryPrimaryValue}>
      {`${currency.symbol}${data.totalEarnings.toFixed(currency.decimal)}`}
    </Text>
    <Text style={styles.summaryMetaValue}>{`${data.totalTrips} trips`}</Text>
    <Text style={styles.summaryMetaValue}>{formatTime(data.totalTimeOnline)}</Text>
    <Text style={styles.summaryMetaValue}>
      {`${currency.symbol}${data.earningsPerHour.toFixed(currency.decimal)}/hr`}
    </Text>
    <Text style={[styles.summaryMetaValue, styles.savedValue]}>
      {`+ ${currency.symbol}${data.totalCommissionSaved.toFixed(currency.decimal)} saved`}
    </Text>
  </View>
);

const WeeklySummary = ({ summary, currency }) => {
  const safeCurrency = currency || { symbol: '₹', decimal: 2 };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Weekly Comparison</Text>
      <View style={styles.summaryContainer}>
        <WeeklyColumn title="This Week" data={summary.currentWeek} currency={safeCurrency} />
        <WeeklyColumn title="Last Week" data={summary.lastWeek} currency={safeCurrency} />
      </View>
    </View>
  );
};

export default WeeklySummary;
