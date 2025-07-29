import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/driverDocStyles';

const StatusBanner = ({ status }) => {
  const statusConfig = {
    New: {
      icon: '👋',
      message: 'Welcome! Please upload your documents to get started.',
      style: styles.bannerInfo,
      textStyle: styles.bannerInfoText,
    },
    Pending: {
      icon: '⏳',
      message: 'Your documents are under review. We will notify you shortly.',
      style: styles.bannerWarning,
      textStyle: styles.bannerWarningText,
    },
    Approved: {
      icon: '✅',
      message: 'Congratulations! Your profile is approved and you are ready to drive.',
      style: styles.bannerSuccess,
      textStyle: styles.bannerSuccessText,
    },
    'Conditionally Approved': {
      icon: '⚠️',
      message: 'Action Required: Some documents need your attention.',
      style: styles.bannerWarning,
      textStyle: styles.bannerWarningText,
    },
    Rejected: {
      icon: '🚫',
      message: 'Your application has been rejected. Please review the comments.',
      style: styles.bannerDanger,
      textStyle: styles.bannerDangerText,
    },
  };

  const { icon, message, style, textStyle } = statusConfig[status] || statusConfig.New;

  return (
    <View style={[styles.banner, style]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.bannerText, textStyle]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.medium,
    borderRadius: spacing.borderRadius,
    marginHorizontal: spacing.medium,
    marginTop: spacing.medium,
    borderWidth: 1,
  },
  bannerInfo: {
    backgroundColor: colors.infoMuted,
    borderColor: colors.info,
  },
  bannerSuccess: {
    backgroundColor: colors.successMuted,
    borderColor: colors.success,
  },
  bannerWarning: {
    backgroundColor: colors.warningMuted,
    borderColor: colors.warning,
  },
  bannerDanger: {
    backgroundColor: colors.dangerMuted,
    borderColor: colors.danger,
  },
  icon: {
    fontSize: typography.sizes.large,
    marginRight: spacing.medium,
  },
  bannerText: {
    ...typography.styles.body,
    flex: 1, // Allow text to wrap
  },
  bannerInfoText: { color: colors.info },
  bannerSuccessText: { color: colors.success },
  bannerWarningText: { color: colors.warning },
  bannerDangerText: { color: colors.danger },
});

export default StatusBanner;
