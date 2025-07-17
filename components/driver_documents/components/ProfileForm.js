import React from 'react';
import { View, Text, TextInput, Switch } from 'react-native';
import styles from '../styles';

const ProfileField = ({ label, value, placeholder, onChangeText }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor="#A0A0A0"
    />
  </View>
);

const ProfileSwitch = ({ label, value, onValueChange }) => (
  <View style={styles.switchContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={value ? '#007BFF' : '#f4f3f4'}
    />
  </View>
);

const vehicleTypes = ['Hatchback', 'Sedan', 'SUV', 'Auto Rickshaw', 'Bike'];

const VehicleTypeSelector = ({ selectedType, onSelect }) => (
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
);

const ProfileForm = ({ profile, onUpdate }) => {
  const showVehicleDetails = !['auto rickshaw', 'bike'].includes(profile.vehicleType?.toLowerCase());

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formSectionTitle}>Personal Details</Text>
      <ProfileField label="First Name" value={profile.firstName} onChangeText={(val) => onUpdate('firstName', val)} placeholder="Enter your first name" />
      <ProfileField label="Last Name" value={profile.lastName} onChangeText={(val) => onUpdate('lastName', val)} placeholder="Enter your last name" />
      <ProfileField label="Driving License" value={profile.drivingLicense} onChangeText={(val) => onUpdate('drivingLicense', val)} placeholder="Enter license number" />
      <ProfileField label="City" value={profile.city} onChangeText={(val) => onUpdate('city', val)} placeholder="Enter your city" />

      <Text style={styles.formSectionTitle}>Vehicle Details</Text>
      <Text style={styles.inputLabel}>Type of Vehicle</Text>
      <VehicleTypeSelector selectedType={profile.vehicleType} onSelect={(val) => onUpdate('vehicleType', val)} />
      <ProfileField label="Vehicle Number" value={profile.vehicleNumber} onChangeText={(val) => onUpdate('vehicleNumber', val)} placeholder="Enter vehicle number" />
      
      {showVehicleDetails && (
        <>
          <ProfileField label="Manufacture Name" value={profile.manufactureName} onChangeText={(val) => onUpdate('manufactureName', val)} placeholder="e.g., Toyota" />
          <ProfileField label="Model Name" value={profile.modelName} onChangeText={(val) => onUpdate('modelName', val)} placeholder="e.g., Camry" />
        </>
      )}

      <ProfileSwitch label="RC and DL on same name?" value={profile.rcDlSameName === 'Yes'} onValueChange={(val) => onUpdate('rcDlSameName', val ? 'Yes' : 'No')} />
      <ProfileField label="Referral Code (Optional)" value={profile.referralCode} onChangeText={(val) => onUpdate('referralCode', val)} placeholder="Enter referral code" />
    </View>
  );
};

export default ProfileForm;
