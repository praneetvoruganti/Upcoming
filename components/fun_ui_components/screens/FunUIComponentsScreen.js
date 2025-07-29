import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import funUIStyles from '../styles/funUIStyles';
import VehicleSelectionModal from '../components/VehicleSelectionModal';
import SearchingModal from '../components/SearchingModal';
import SwipeToEndRideButton from '../components/SwipeToEndRideButton';
import CustomToast from '../components/CustomToast';
import AnimatedBackground from '../components/AnimatedBackground';

const FunUIComponentsScreen = () => {
  const [isVehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [isSearchingModalVisible, setSearchingModalVisible] = useState(false);
  const toastRef = useRef(null);

  const handleSwipeComplete = () => {
    if (toastRef.current) {
      toastRef.current.show('Ride Ended Successfully');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AnimatedBackground />
      <View style={funUIStyles.container}>
      <TouchableOpacity style={funUIStyles.button} onPress={() => setVehicleModalVisible(true)}>
        <Text style={funUIStyles.buttonText}>Select Vehicle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[funUIStyles.button, { marginTop: 20 }]} onPress={() => setSearchingModalVisible(true)}>
        <Text style={funUIStyles.buttonText}>Find Driver</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <SwipeToEndRideButton onSwipeComplete={handleSwipeComplete} />
      </View>

      <VehicleSelectionModal 
        isVisible={isVehicleModalVisible} 
        onClose={() => setVehicleModalVisible(false)} 
      />
      <SearchingModal 
        isVisible={isSearchingModalVisible} 
        onClose={() => setSearchingModalVisible(false)} 
      />
        <CustomToast ref={toastRef} />
      </View>
    </View>
  );
};

export default FunUIComponentsScreen;
