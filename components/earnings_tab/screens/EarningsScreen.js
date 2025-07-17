// Main screen for the Earnings Tab.
// Integrates all sub-components to display earnings data.

import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { styles } from '../styles/earningsStyles';
import { EarningsDashboard, EarningsChart, TripHistoryList, WeeklySummary, TaxSummary } from '../components';
import { filterBookingsByTime, calculateMetrics, formatDataForChart, calculateWeeklySummaries } from '../services/earningsService';

const EarningsScreen = ({ completedBookings, currency, isLoading, navigation }) => {
  const [timeframe, setTimeframe] = useState('Week');

  const filteredData = useMemo(() => 
    filterBookingsByTime(completedBookings, timeframe), 
    [completedBookings, timeframe]
  );

  const metrics = useMemo(() => 
    calculateMetrics(filteredData), 
    [filteredData]
  );

  const chartData = useMemo(() => 
    formatDataForChart(filteredData, timeframe), 
    [filteredData, timeframe]
  );

  const weeklySummaryData = useMemo(() => 
    calculateWeeklySummaries(completedBookings), 
    [completedBookings]
  );

  const handleTripPress = (booking) => {
    // navigation.navigate('RideDetails', { bookingId: booking.id });
    console.log("Navigate to ride details for booking: ", booking.id);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Earnings</Text>
      </View>

      <View style={styles.filterContainer}>
        {['Today', 'Week', 'Month'].map((period) => (
          <TouchableOpacity
            key={period}
            style={[styles.filterButton, timeframe === period && styles.filterButtonActive]}
            onPress={() => setTimeframe(period)}
          >
            <Text style={[styles.filterButtonText, timeframe === period && styles.filterButtonTextActive]}>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        <View style={styles.card}>
          <EarningsDashboard {...metrics} currency={currency} />
        </View>

        <View style={styles.card}>
          <TaxSummary totalGstCollected={metrics.totalGstCollected} currency={currency} />
        </View>

        <WeeklySummary summary={weeklySummaryData} currency={currency} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Earnings Over Time</Text>
          <EarningsChart data={chartData} />
        </View>

        <TripHistoryList trips={filteredData} currency={currency} onTripPress={handleTripPress} />
      </ScrollView>

    </SafeAreaView>
  );
};

export default EarningsScreen;