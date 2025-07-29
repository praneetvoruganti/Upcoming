import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tipStyles from '../styles/tipStyles';

const TipCard = ({ tip, onPress }) => {
  const isChaiSpot = tip.category === 'Chai Spot';
  
  const getCategoryStyles = () => {
    if (isChaiSpot) {
      return {
        iconContainer: tipStyles.chaiSpotIcon,
        iconText: tipStyles.chaiIconText,
        badge: tipStyles.chaiBadge,
        badgeText: tipStyles.chaiCategoryText,
      };
    }
    return {
      iconContainer: tipStyles.tiffinCenterIcon,
      iconText: tipStyles.tiffinIconText,
      badge: tipStyles.tiffinBadge,
      badgeText: tipStyles.tiffinCategoryText,
    };
  };

  const categoryStyles = getCategoryStyles();

  return (
    <TouchableOpacity 
      style={tipStyles.tipCard} 
      onPress={() => onPress && onPress(tip)}
      activeOpacity={0.7}
    >
      <View style={tipStyles.cardHeader}>
        <View style={[tipStyles.categoryIcon, categoryStyles.iconContainer]}>
          <Text style={[tipStyles.iconText, categoryStyles.iconText]}>
            {isChaiSpot ? '☕' : '🍽️'}
          </Text>
        </View>
        <View style={tipStyles.cardContent}>
          <Text style={tipStyles.tipTitle}>{tip.title}</Text>
          <View style={[tipStyles.categoryBadge, categoryStyles.badge]}>
            <Text style={[tipStyles.categoryText, categoryStyles.badgeText]}>
              {tip.category}
            </Text>
          </View>
        </View>
      </View>
      
      <Text style={tipStyles.tipDescription}>{tip.description}</Text>
      
      <View style={tipStyles.locationContainer}>
        <View style={tipStyles.locationIcon} />
        <Text style={tipStyles.locationText}>{tip.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TipCard;
