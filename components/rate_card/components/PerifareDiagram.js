import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

const PerifareDiagram = () => {
  return (
    <View style={styles.diagramContainer}>
      {/* Main Concept */}
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>What is Perifare?</Text>
        <Text style={styles.conceptDescription}>
          A transparent, zone-based pricing system that puts more money in your pocket
        </Text>
      </View>

      {/* Problem Statement */}
      <View style={styles.problemSection}>
        <View style={styles.problemCard}>
          <Text style={styles.problemIcon}>😤</Text>
          <Text style={styles.problemTitle}>TIRED OF OTHER APPS?</Text>
          <View style={styles.problemPoints}>
            <Text style={styles.problemPoint}>✗ Unpredictable surge pricing eats your profits</Text>
            <Text style={styles.problemPoint}>✗ Hidden fees reduce your earnings</Text>
            <Text style={styles.problemPoint}>✗ Complex calculations you can't understand</Text>
          </View>
        </View>
      </View>

      {/* Solution */}
      <View style={styles.solutionSection}>
        <View style={styles.solutionCard}>
          <Text style={styles.solutionIcon}>🚀</Text>
          <Text style={styles.solutionTitle}>PERIFARE CHANGES EVERYTHING</Text>
          <View style={styles.solutionPoints}>
            <Text style={styles.solutionPoint}>✓ <Text style={styles.boldText}>EARN MORE</Text> with transparent zone pricing</Text>
            <Text style={styles.solutionPoint}>✓ <Text style={styles.boldText}>NO SURPRISES</Text> - see exactly what you'll make</Text>
            <Text style={styles.solutionPoint}>✓ <Text style={styles.boldText}>KEEP MORE</Text> of every fare you earn</Text>
          </View>
          <View style={styles.ctaSection}>
            <Text style={styles.ctaText}>Start earning what you deserve!</Text>
          </View>
        </View>
      </View>

    </View>
  );
};

export default PerifareDiagram;
