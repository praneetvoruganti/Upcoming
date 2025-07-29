import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { onDemandRates } from './utils';
import styles from './styles';
import PerifareDiagram from './components/PerifareDiagram';

const RateCard = () => {
  const [activeTab, setActiveTab] = useState('Perifare');
  const renderFareRow = (vehicleClass) => {
    const rates = onDemandRates.vehicleClasses[vehicleClass];
    const baseFareUpto2Kms = rates.pickupCharge + rates.baseFare;

    return (
      <View key={vehicleClass} style={styles.row}>
        <Text style={styles.cell}>{vehicleClass}</Text>
        <Text style={styles.cell}>{rates.pickupCharge}</Text>
        <Text style={styles.cell}>{baseFareUpto2Kms}</Text>
        <Text style={styles.cell}>{rates.ratePerKmFirstSlab}</Text>
        <Text style={styles.cell}>{rates.ratePerKmAfterFirstSlab}</Text>
      </View>
    );
  };

  const renderOnDemandTable = () => (
    <View>
      <View style={styles.table}>
        <View style={styles.rowHeader}>
          <Text style={styles.headerText}>Vehicle</Text>
          <Text style={styles.headerText}>Pickup</Text>
          <Text style={styles.headerText}>Base (≤2km)</Text>
          <Text style={styles.headerText}>Rate/KM (2-8km)</Text>
          <Text style={styles.headerText}>Rate/KM (&gt;8km)</Text>
        </View>
        {Object.keys(onDemandRates.vehicleClasses).map(renderFareRow)}
      </View>
      <View style={styles.commissionBox}>
        <Text style={styles.commissionTitle}>Your Earnings</Text>
        <Text style={styles.commissionText}>Keep more of what you earn. Just ₹5 per ride – that's it. No percentages. No hidden fees. The rest stays with you.</Text>
      </View>
    </View>
  );

  const renderPerifareInfo = () => (
    <View style={styles.perifareContainer}>
      <View style={styles.logoPlaceholder}>
        <Text style={styles.logoText}>PERIFARE</Text>
      </View>
      <Text style={styles.perifareTitle}>Smart Pricing.
Maximum Earnings.</Text>
      <Text style={styles.perifareText}>Experience transparent, zone-based fares that put more money in your pocket. No surge confusion. No hidden calculations. Just clear, predictable earnings.</Text>

      <PerifareDiagram />

      <Text style={styles.perifareSubtitle}>Your Benefits</Text>
      <Text style={styles.perifarePoint}>✓ <Text style={styles.bold}>Predictable Income</Text> – Know your earnings before you drive</Text>
      <Text style={styles.perifarePoint}>✓ <Text style={styles.bold}>Zero Disputes</Text> – Fixed fares eliminate pricing arguments</Text>
      <Text style={styles.perifarePoint}>✓ <Text style={styles.bold}>Premium Routes</Text> – Earn more on airport and city trips</Text>

      <Text style={styles.perifareFooter}>Drive with confidence. Earn with clarity.</Text>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Perifare':
        return renderPerifareInfo();
      case 'On-Demand':
        return renderOnDemandTable();
      case 'Scheduled':
        return <Text>Scheduled Rates Coming Soon</Text>;
      case 'Hourly':
        return <Text>Hourly Rates Coming Soon</Text>;
      case 'City-to-City':
        return <Text>City-to-City Rates Coming Soon</Text>;

      default:
        return null;
    }
  };



  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Earnings Guide</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabScrollContainer}
        contentContainerStyle={styles.tabContainer}
      >
        {['Perifare', 'On-Demand', 'Scheduled', 'Hourly', 'City-to-City'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderContent()}
    </ScrollView>
  );
};

export default RateCard;
