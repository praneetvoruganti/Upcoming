import React, { useState } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { modalStyles } from '../styles/modalStyles';
import { vehicleClasses } from '../services/mockVehicleData';
import VehicleClassItem from './VehicleClassItem';

const VehicleSelectionModal = ({ isVisible, onClose }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSelect = (vehicleId) => {
    setSelectedVehicle(vehicleId);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={modalStyles.container} activeOpacity={1} onPressOut={onClose}>
        <View style={modalStyles.modalView}>
          <View style={modalStyles.handle} />
          <Text style={modalStyles.title}>Select a Vehicle</Text>
          <FlatList
            data={vehicleClasses}
            renderItem={({ item }) => (
              <VehicleClassItem 
                item={item} 
                isSelected={item.id === selectedVehicle}
                onSelect={handleSelect}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity 
            style={[
              modalStyles.scheduleButton,
              !selectedVehicle && modalStyles.scheduleButtonDisabled
            ]} 
            onPress={() => {
              if (selectedVehicle) {
                console.log('Scheduled:', selectedVehicle);
                onClose();
              }
            }}
            disabled={!selectedVehicle}
          >
            <Text style={[
              modalStyles.scheduleButtonText,
              !selectedVehicle && modalStyles.scheduleButtonTextDisabled
            ]}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default VehicleSelectionModal;
