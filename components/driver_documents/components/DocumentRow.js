import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography, elevation } from '../styles/driverDocStyles';

// Helper to get status-specific styles
const getStatusStyles = (status) => {
  switch (status) {
    case 'Approved':
      return { badge: styles.statusBadgeApproved, text: styles.statusTextApproved };
    case 'Pending':
      return { badge: styles.statusBadgePending, text: styles.statusTextPending };
    case 'Rejected':
      return { badge: styles.statusBadgeRejected, text: styles.statusTextRejected };
    default:
      return { badge: styles.statusBadgeNotUploaded, text: styles.statusTextNotUploaded };
  }
};

// Premium Document Card Component
const DocumentCard = ({ doc, config, onUpload, onView, onDelete, isLoading }) => {
  const { label, required } = config;
  const { uri, status, rejectionReason } = doc || { uri: null, status: 'Not Uploaded', rejectionReason: null };
  const statusStyles = getStatusStyles(status);

  return (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{label}</Text>
        <View style={[styles.statusBadge, statusStyles.badge]}>
          <Text style={[styles.statusText, statusStyles.text]}>{status}</Text>
        </View>
      </View>
      {required && <Text style={styles.mandatoryLabel}>This document is mandatory.</Text>}

      {/* Rejection Reason Box */}
      {status === 'Rejected' && rejectionReason && (
        <View style={styles.rejectionContainer}>
          <Text style={styles.rejectionTitle}>Reason for Rejection</Text>
          <Text style={styles.rejectionText}>{rejectionReason}</Text>
        </View>
      )}

      {/* Image Preview / Placeholder */}
      <TouchableOpacity style={styles.imageContainer} onPress={uri ? onView : onUpload} activeOpacity={0.8}>
        {uri ? (
          <Image source={{ uri }} style={styles.thumbnail} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderIcon}>📄</Text>
            <Text style={styles.placeholderText}>Tap to upload</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.cardActions}>
        {uri && (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
            <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={onUpload} disabled={isLoading}>
          <Text style={styles.buttonText}>{uri ? 'Replace' : 'Upload'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Premium StyleSheet using the design system
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.medium,
    marginBottom: spacing.large,
    ...elevation.z1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  cardTitle: {
    ...typography.styles.subtitle,
    color: colors.text.primary,
    flex: 1, // Allow title to take space
    marginRight: spacing.small,
  },
  mandatoryLabel: {
    ...typography.styles.bodySmall,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginBottom: spacing.medium,
  },
  statusBadge: {
    paddingVertical: spacing.xsmall,
    paddingHorizontal: spacing.small,
    borderRadius: 6,
  },
  statusText: {
    ...typography.styles.label,
    fontSize: typography.sizes.small,
    color: colors.text.light,
  },
  statusBadgeApproved: { backgroundColor: colors.success },
  statusTextApproved: { color: colors.text.light },
  statusBadgePending: { backgroundColor: colors.warning },
  statusTextPending: { color: colors.text.primary },
  statusBadgeRejected: { backgroundColor: colors.danger },
  statusTextRejected: { color: colors.text.light },
  statusBadgeNotUploaded: { backgroundColor: colors.divider },
  statusTextNotUploaded: { color: colors.text.secondary },
  rejectionContainer: {
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
    borderRadius: spacing.borderRadius,
    padding: spacing.medium,
    marginTop: spacing.small,
    marginBottom: spacing.medium,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
  },
  rejectionTitle: {
    ...typography.styles.body,
    fontWeight: typography.weights.bold,
    color: colors.danger,
  },
  rejectionText: {
    ...typography.styles.bodySmall,
    color: colors.text.primary,
    marginTop: spacing.xsmall,
  },
  imageContainer: {
    height: 180,
    borderRadius: spacing.borderRadius,
    backgroundColor: colors.background,
    marginTop: spacing.small,
    marginBottom: spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.divider,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
    opacity: 0.5,
  },
  placeholderText: {
    ...typography.styles.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.small,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    height: spacing.buttonHeight - 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.large,
    borderRadius: spacing.borderRadius,
    marginLeft: spacing.small,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    flex: 1, // Take remaining space
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.danger,
  },
  buttonText: {
    ...typography.styles.button,
    fontSize: typography.sizes.regular,
  },
  deleteButtonText: {
    color: colors.danger,
  },
});

export default DocumentCard;
