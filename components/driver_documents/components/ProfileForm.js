import React from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography, elevation } from '../styles/driverDocStyles';

// A redesigned, premium input field component
const ProfileField = ({ label, value, placeholder, onChangeText }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={colors.text.placeholder}
    />
  </View>
);

// A redesigned, premium switch component
const ProfileSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.switchContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.divider, true: colors.primaryLight }}
      thumbColor={value ? colors.primary : colors.card}
      ios_backgroundColor={colors.divider}
    />
  </View>
);

// A redesigned, premium vehicle type selector using chips
const vehicleTypes = ['Hatchback', 'Sedan', 'SUV', 'Auto Rickshaw', 'Bike'];
const VehicleTypeSelector = ({ selectedType, onSelect }) => (
  <View>
    <Text style={styles.inputLabel}>Type of Vehicle</Text>
    <View style={styles.chipContainer}>
      {vehicleTypes.map(type => (
        <TouchableOpacity
          key={type}
          style={[styles.chip, selectedType === type && styles.chipSelected]}
          onPress={() => onSelect(type)}
        >
          <Text style={[styles.chipText, selectedType === type && styles.chipTextSelected]}>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

// Main Profile Form component with premium styling
const ProfileForm = ({ profile, onUpdate }) => {
  const showVehicleDetails = !['auto rickshaw', 'bike'].includes(profile.vehicleType?.toLowerCase());

  return (
    <View style={styles.formContainer}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <ProfileField label="First Name" value={profile.firstName} onChangeText={(val) => onUpdate('firstName', val)} placeholder="Enter your first name" />
        <ProfileField label="Last Name" value={profile.lastName} onChangeText={(val) => onUpdate('lastName', val)} placeholder="Enter your last name" />
        <ProfileField label="Driving License" value={profile.drivingLicense} onChangeText={(val) => onUpdate('drivingLicense', val)} placeholder="Enter license number" />
        <ProfileField label="City" value={profile.city} onChangeText={(val) => onUpdate('city', val)} placeholder="Enter your city" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vehicle Details</Text>
        <VehicleTypeSelector selectedType={profile.vehicleType} onSelect={(val) => onUpdate('vehicleType', val)} />
        <ProfileField label="Vehicle Number" value={profile.vehicleNumber} onChangeText={(val) => onUpdate('vehicleNumber', val)} placeholder="Enter vehicle number" />
        
        {showVehicleDetails && (
          <>
            <ProfileField label="Manufacture Name" value={profile.manufactureName} onChangeText={(val) => onUpdate('manufactureName', val)} placeholder="e.g., Toyota" />
            <ProfileField label="Model Name" value={profile.modelName} onChangeText={(val) => onUpdate('modelName', val)} placeholder="e.g., Camry" />
          </>
        )}
      </View>

      <View style={styles.section}>
        <ProfileSwitch label="RC and DL on same name?" value={profile.rcDlSameName === 'Yes'} onValueChange={(val) => onUpdate('rcDlSameName', val ? 'Yes' : 'No')} />
        <ProfileField label="Referral Code (Optional)" value={profile.referralCode} onChangeText={(val) => onUpdate('referralCode', val)} placeholder="Enter referral code" />
      </View>
    </View>
  );
};

// Premium StyleSheet using the design system
const styles = StyleSheet.create({
  formContainer: {
    padding: spacing.medium,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.medium,
    marginBottom: spacing.large,
    ...elevation.z1,
  },
  sectionTitle: {
    ...typography.styles.subtitle,
    marginBottom: spacing.medium,
    paddingBottom: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  fieldContainer: {
    marginBottom: spacing.medium,
  },
  inputLabel: {
    ...typography.styles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.small,
  },
  input: {
    backgroundColor: colors.background,
    height: spacing.inputHeight,
    borderRadius: spacing.borderRadius,
    paddingHorizontal: spacing.medium,
    ...typography.styles.body,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.small,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.medium,
  },
  chip: {
    backgroundColor: colors.background,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: 20,
    marginRight: spacing.small,
    marginBottom: spacing.small,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.styles.bodySmall,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
  },
  chipTextSelected: {
    color: colors.text.light,
  },
});

export default ProfileForm;
