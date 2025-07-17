import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';

const statusInfo = {
  'Approved': { color: '#28A745' },
  'Pending': { color: '#FFC107' },
  'Rejected': { color: '#DC3545' },
  'Not Uploaded': { color: '#6C757D' },
};

const DocumentCard = ({ doc, config, onUpload, onView, onDelete, isLoading }) => {
  const { label, required } = config;
  const { uri, status, rejectionReason } = doc || { uri: null, status: 'Not Uploaded', rejectionReason: null };
  const statusStyle = statusInfo[status];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{label}</Text>
        {required && <Text style={styles.mandatoryLabel}>Mandatory</Text>}
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.color }]} />
        <Text style={[styles.statusText, { color: statusStyle.color }]}>{status}</Text>
      </View>

      {status === 'Rejected' && rejectionReason && (
        <View style={styles.rejectionContainer}>
          <Text style={styles.rejectionTitle}>Reason for Rejection:</Text>
          <Text style={styles.rejectionText}>{rejectionReason}</Text>
        </View>
      )}

      <View style={styles.cardBody}>
        {uri ? (
          <Image source={{ uri }} style={styles.thumbnail} />
        ) : (
          <Text style={styles.placeholderText}>No document uploaded.</Text>
        )}
      </View>

      <View style={styles.cardActions}>
        {uri && (
          <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={onView}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        )}
        {uri && (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={onUpload} disabled={isLoading}>
          <Text style={styles.buttonText}>{uri ? 'Replace' : 'Upload'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentCard;
