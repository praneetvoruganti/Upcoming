import React from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';

// Premium Color Palette
const COLORS = {
  primary: '#1a1a1a',
  secondary: '#2c3e50',
  accent: '#c9b037',
  surface: '#ffffff',
  onSurface: '#2d3748',
  onSurfaceVariant: '#64748b',
  border: '#e2e8f0',
  borderFocus: '#c9b037',
  background: '#f8f9fa',
  shadow: 'rgba(0, 0, 0, 0.08)',
};

const EditCardForm = ({ cardData, onUpdate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Display Name</Text>
        <TextInput
          style={styles.input}
          value={cardData.name}
          onChangeText={(text) => onUpdate('name', text)}
          placeholder="Enter your professional name"
          placeholderTextColor={COLORS.onSurfaceVariant}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Professional Tagline</Text>
        <TextInput
          style={styles.input}
          value={cardData.tagline}
          onChangeText={(text) => onUpdate('tagline', text)}
          placeholder="e.g., Your trusted ride partner"
          placeholderTextColor={COLORS.onSurfaceVariant}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Vehicle Details</Text>
        <TextInput
          style={styles.input}
          value={cardData.vehicle}
          onChangeText={(text) => onUpdate('vehicle', text)}
          placeholder="e.g., Auto - TS 09 AB 1234"
          placeholderTextColor={COLORS.onSurfaceVariant}
        />
      </View>

      <TouchableOpacity style={styles.photoButton} onPress={() => onUpdate('photo', 'new_photo_uri')}>
        <View style={styles.photoButtonContent}>
          <Text style={styles.photoButtonIcon}>📷</Text>
          <Text style={styles.photoButtonText}>Update Profile Photo</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.privacySection}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        <View style={styles.privacyContainer}>
          <View style={styles.privacyInfo}>
            <Text style={styles.privacyLabel}>Share Contact Information</Text>
            <Text style={styles.privacyDescription}>Allow customers to see your phone number</Text>
          </View>
          <Switch
            value={cardData.privacy.contact}
            onValueChange={(value) => onUpdate('privacy', { ...cardData.privacy, contact: value })}
            trackColor={{ false: COLORS.border, true: COLORS.accent }}
            thumbColor={cardData.privacy.contact ? COLORS.surface : COLORS.onSurfaceVariant}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.onSurface,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: COLORS.surface,
    color: COLORS.onSurface,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  photoButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  photoButtonContent: {
    alignItems: 'center',
  },
  photoButtonIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  photoButtonText: {
    color: COLORS.onSurface,
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  privacySection: {
    marginTop: 8,
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  privacyInfo: {
    flex: 1,
    marginRight: 16,
  },
  privacyLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.onSurface,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  privacyDescription: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
  },
});

export default EditCardForm;
