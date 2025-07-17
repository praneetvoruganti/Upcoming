
// Displays a bar chart of earnings over a selected period.
// Uses react-native-chart-kit for rendering.

import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { styles } from '../styles/earningsStyles';

const screenWidth = Dimensions.get('window').width;

// Centralized chart configuration for a consistent look
const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Primary blue for bars
  labelColor: (opacity = 1) => `rgba(73, 80, 87, ${opacity})`, // Dark gray for labels
  style: {
    borderRadius: 16,
  },
};

const EarningsChart = ({ data }) => {
  // A check to prevent crashes if data is not ready or is empty.
  if (!data || !data.labels || data.labels.length === 0 || !data.datasets[0].data.some(d => d > 0)) {
    return (
      <View style={{ alignItems: 'center', paddingVertical: 50 }}>
        <Text style={styles.metricLabel}>Not enough data to display a chart.</Text>
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      <BarChart
        data={data}
        width={screenWidth - 64} // Adjust width for card padding
        height={220}
        yAxisLabel="₹" // Generic symbol, as this is illustrative
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
      />
    </View>
  );
};

export default EarningsChart;
