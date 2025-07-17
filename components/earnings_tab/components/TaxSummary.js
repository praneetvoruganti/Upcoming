// Displays a summary of tax-related information, like GST collected.

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/earningsStyles';

const TaxSummary = ({ totalGstCollected = 0, currency }) => {
  const safeCurrency = currency || { symbol: '₹', decimal: 2 };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Tax Summary (GST)</Text>
      <View style={styles.taxSummaryContainer}>
        <Text style={styles.taxLabel}>Total GST Collected</Text>
        <Text style={styles.taxValue}>
          {`${safeCurrency.symbol}${totalGstCollected.toFixed(safeCurrency.decimal)}`}
        </Text>
      </View>
      <Text style={styles.taxDisclaimer}>
        This is the total GST collected on your behalf. You are responsible for remitting this amount to the tax authorities.
      </Text>
    </View>
  );
};

export default TaxSummary;
