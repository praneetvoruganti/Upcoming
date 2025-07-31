import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import funUIStyles from '../styles/funUIStyles';
import VehicleSelectionModal from '../components/VehicleSelectionModal';
import SearchingModal from '../components/SearchingModal';
import SwipeToEndRideButton from '../components/SwipeToEndRideButton';
import CustomToast from '../components/CustomToast';
import AnimatedBackground from '../components/AnimatedBackground';
import SmartSuggestionsCarousel from '../components/SmartSuggestionsCarousel';
import { promotions, cityTips } from '../services/carouselData';

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
      <ScrollView contentContainerStyle={funUIStyles.container}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <TouchableOpacity style={funUIStyles.button} onPress={() => setVehicleModalVisible(true)}>
            <Text style={funUIStyles.buttonText}>Select Vehicle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[funUIStyles.button, { marginTop: 20 }]} onPress={() => setSearchingModalVisible(true)}>
            <Text style={funUIStyles.buttonText}>Find Driver</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, width: '100%' }}>
          <SwipeToEndRideButton onSwipeComplete={handleSwipeComplete} />
        </View>

        <SmartSuggestionsCarousel title="The OK2GO Way" data={promotions} />
        <SmartSuggestionsCarousel title="Hyderabad Insights" data={cityTips} />
      </ScrollView>

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
  );
};

export default FunUIComponentsScreen;
