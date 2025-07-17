import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const statusStyles = {
  'New': { backgroundColor: '#E3F2FD', textColor: '#0D47A1', message: 'Welcome! Please upload your documents to get started.' },
  'Pending': { backgroundColor: '#FFF9C4', textColor: '#F57F17', message: 'Your documents are under review. We will notify you of any updates.' },
  'Approved': { backgroundColor: '#C8E6C9', textColor: '#1B5E20', message: 'Congratulations! Your profile is approved.' },
  'Conditionally Approved': { backgroundColor: '#FFCCBC', textColor: '#BF360C', message: 'Action Required: Some documents need your attention.' },
  'Rejected': { backgroundColor: '#FFCDD2', textColor: '#B71C1C', message: 'Your application has been rejected. Please review the comments.' },
};

const StatusBanner = ({ status }) => {
  const { backgroundColor, textColor, message } = statusStyles[status] || statusStyles['New'];

  return (
    <View style={[styles.banner, { backgroundColor }]}>
      <Text style={[styles.bannerText, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StatusBanner;
