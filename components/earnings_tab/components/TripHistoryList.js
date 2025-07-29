
// Renders a list of expandable trip cards.
// Each card shows a summary and expands to show a detailed breakdown.

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { styles } from '../styles/earningsStyles';
import moment from 'moment';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TripHistoryItem = ({ item, currency }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const safeCurrency = currency || { symbol: '₹', decimal: 2 };

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity style={styles.tripItem} onPress={toggleExpand} activeOpacity={0.8}>
      <View style={styles.tripItemHeader}>
        <Text style={styles.tripDate}>{moment(item.tripdate).format('MMM D, YYYY')}</Text>
        <View style={styles.fareContainer}>
          <Text style={[styles.tripFare, parseFloat(item.driver_share) < 0 && styles.deductionText]}>{`${safeCurrency.symbol}${parseFloat(item.driver_share).toFixed(safeCurrency.decimal)}`}</Text>
          <Text style={styles.indicatorIcon}>{isExpanded ? '▲' : '▼'}</Text>
        </View>
      </View>
      <View style={styles.tripLocations}>
        <Text style={styles.locationText} numberOfLines={1}>{`From: ${item.pickup?.add || 'Address not available'}`}</Text>
        <Text style={styles.locationText} numberOfLines={1}>{`To: ${item.drop?.add || 'Address not available'}`}</Text>
      </View>
      {isExpanded && (
        <View style={styles.earningsBreakdown}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Base Fare</Text>
            <Text style={styles.breakdownValue}>{`${safeCurrency.symbol}${parseFloat(item.base_fare).toFixed(safeCurrency.decimal)}`}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>GST</Text>
            <Text style={styles.breakdownValue}>{`${safeCurrency.symbol}${parseFloat(item.gst).toFixed(safeCurrency.decimal)}`}</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Platform Fee</Text>
            <Text style={[styles.breakdownValue, styles.deductionText]}>{`-${safeCurrency.symbol}${parseFloat(item.platform_fee).toFixed(safeCurrency.decimal)}`}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Commission Saved</Text>
            <Text style={[styles.breakdownValue, styles.savedValue]}>{`+${safeCurrency.symbol}${parseFloat(item.commission_saved).toFixed(safeCurrency.decimal)}`}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const TripHistoryList = ({ trips, currency, onTripPress }) => {
  if (!trips || trips.length === 0) {
    return (
      <View style={[styles.card, { marginTop: 20, alignItems: 'center' }]}>
        <Text style={styles.metricLabel}>No trips recorded for this period.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Recent Trips</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TripHistoryItem item={item} currency={currency} onPress={onTripPress} />}
        style={styles.listContainer}
      />
    </View>
  );
};

export default TripHistoryList;
