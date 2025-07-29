import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { modalStyles } from '../styles/modalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VehicleClassItem = ({ item, isSelected, onSelect }) => {
  return (
    <TouchableOpacity 
      style={[modalStyles.itemContainer, isSelected && modalStyles.selectedItemContainer]}
      onPress={() => onSelect(item.id)}
    >
      <View style={modalStyles.iconContainer}>
        <Icon name={item.icon} size={30} color="#EE436E" />
        <View style={modalStyles.capacityContainer}>
          <Icon name="account-group" size={16} color="#201E1E" />
          <Text style={modalStyles.capacityText}>{item.capacity}</Text>
        </View>
      </View>
      <View style={modalStyles.infoContainer}>
        <Text style={modalStyles.vehicleName}>{item.name}</Text>
        <Text style={modalStyles.vehicleDescription}>{item.description}</Text>
      </View>
      <View style={modalStyles.priceContainer}>
        <Text style={modalStyles.vehiclePrice}>{`₹ ${item.price}`}</Text>
        <Text style={modalStyles.vehicleDistance}>{item.distance}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VehicleClassItem;
