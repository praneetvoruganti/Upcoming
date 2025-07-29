import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import cardStyles from '../styles/cardStyles';

const BusinessCardPreview = React.forwardRef(({ cardData }, ref) => {
  const { name, tagline, vehicle, photo, privacy } = cardData;

  return (
    <View ref={ref} style={[cardStyles.cardContainer, styles.container]}>
      {/* Dark gradient background */}
      <View style={cardStyles.cardBackground} />
      
      {/* Decorative elements */}
      <View style={cardStyles.decorativeElements} />
      <View style={cardStyles.accentLine} />
      
      {/* Brand section */}
      <View style={cardStyles.brandSection}>
        <Image source={{ uri: 'https://placehold.co/24x24/c9b037/ffffff?text=OK' }} style={cardStyles.logo} />
        <Text style={cardStyles.brandName}>OK2GO</Text>
      </View>
      
      {/* Main content */}
      <View style={cardStyles.cardContent}>
        {/* Left section with profile info */}
        <View style={cardStyles.leftSection}>
          <View style={cardStyles.profileText}>
            <Text style={cardStyles.driverName}>{name}</Text>
            <Text style={cardStyles.tagline}>{tagline}</Text>
            <Text style={cardStyles.vehicleInfo}>{vehicle}</Text>
            {privacy.contact && (
              <Text style={cardStyles.contactInfo}>{cardData.phone}</Text>
            )}
          </View>
        </View>
        
        {/* Right section with avatar */}
        <View style={cardStyles.rightSection}>
          <Image 
            source={photo ? { uri: photo } : { uri: 'https://picsum.photos/80/80?random=driver' }} 
            style={cardStyles.avatar} 
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignSelf: 'center',
  },
});

export default BusinessCardPreview;
