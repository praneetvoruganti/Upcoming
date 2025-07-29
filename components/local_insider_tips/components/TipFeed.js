import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import TipCard from './TipCard';
import tipStyles from '../styles/tipStyles';
import { cityNames } from '../mockTips';

const TipFeed = ({ tips = [], loading = false, onTipPress }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  
  // Get unique cities from tips
  const availableCities = useMemo(() => {
    const cities = [...new Set(tips.map(tip => tip.city))];
    return cities.sort();
  }, [tips]);

  // Filter tips based on selected category and city
  const filteredTips = useMemo(() => {
    return tips.filter(tip => {
      const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;
      const matchesCity = selectedCity === 'All' || tip.city === selectedCity;
      return matchesCategory && matchesCity && tip.status === 'approved';
    });
  }, [tips, selectedCategory, selectedCity]);

  const categories = ['All', 'Chai Spot', 'Tiffin Center'];

  const renderCategoryFilters = () => (
    <View style={tipStyles.filterContainer}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            tipStyles.filterButton,
            selectedCategory === category && tipStyles.activeFilter
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text
            style={[
              tipStyles.filterText,
              selectedCategory === category && tipStyles.activeFilterText
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCityFilters = () => (
    <View style={tipStyles.cityFilter}>
      <Text style={tipStyles.cityFilterTitle}>Filter by City</Text>
      <View style={tipStyles.cityOptions}>
        <TouchableOpacity
          style={[
            tipStyles.cityOption,
            selectedCity === 'All' && tipStyles.selectedCity
          ]}
          onPress={() => setSelectedCity('All')}
        >
          <Text
            style={[
              tipStyles.cityOptionText,
              selectedCity === 'All' && tipStyles.selectedCityText
            ]}
          >
            All Cities
          </Text>
        </TouchableOpacity>
        
        {availableCities.map((cityCode) => (
          <TouchableOpacity
            key={cityCode}
            style={[
              tipStyles.cityOption,
              selectedCity === cityCode && tipStyles.selectedCity
            ]}
            onPress={() => setSelectedCity(cityCode)}
          >
            <Text
              style={[
                tipStyles.cityOptionText,
                selectedCity === cityCode && tipStyles.selectedCityText
              ]}
            >
              {cityNames[cityCode] || cityCode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={tipStyles.emptyState}>
      <View style={tipStyles.emptyStateIcon}>
        <Text style={{ fontSize: 24 }}>🔍</Text>
      </View>
      <Text style={tipStyles.emptyStateText}>No tips found</Text>
      <Text style={tipStyles.emptyStateSubtext}>
        {selectedCategory !== 'All' || selectedCity !== 'All' 
          ? 'Try adjusting your filters' 
          : 'Be the first to share a great local spot!'
        }
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={tipStyles.loadingContainer}>
      <ActivityIndicator size="large" color="#ff6b35" />
      <Text style={tipStyles.loadingText}>Loading tips...</Text>
    </View>
  );

  const renderTipItem = ({ item }) => (
    <TipCard tip={item} onPress={onTipPress} />
  );

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        {renderCategoryFilters()}
        {renderCityFilters()}
        {renderLoadingState()}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {renderCategoryFilters()}
      {renderCityFilters()}
      
      <FlatList
        data={filteredTips}
        renderItem={renderTipItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={filteredTips.length === 0 && { flex: 1 }}
        ListEmptyComponent={renderEmptyState}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default TipFeed;
