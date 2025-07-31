import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { carouselStyles } from '../styles/carouselStyles';

const { width: screenWidth } = Dimensions.get('window');

const CarouselItem = ({ item, index }) => {
  // Extract parenthetical content as highlight
  const descriptionParts = item.description.split('(');
  const mainDescription = descriptionParts[0].trim();
  const highlight = descriptionParts[1] ? `(${descriptionParts[1]}` : '';

  const isEven = index % 2 === 0;
  const rotationStyle = isEven ? carouselStyles.itemContainerEven : carouselStyles.itemContainerOdd;

  return (
    <TouchableOpacity style={[carouselStyles.itemContainer, rotationStyle]}>
      <View style={carouselStyles.gradientOverlay} />
      <Text style={carouselStyles.itemTitle}>{item.title}</Text>
      <Text style={carouselStyles.itemDescription}>{mainDescription}</Text>
      {highlight ? (
        <Text style={carouselStyles.itemHighlight}>{highlight}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

const SmartSuggestionsCarousel = ({ title, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === data.length - 1 ? 0 : prevIndex + 1;
        flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
        return nextIndex;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [data.length]);
  return (
    <View style={carouselStyles.container}>
      <Text style={carouselStyles.title}>{title}</Text>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => <CarouselItem item={item} index={index} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={carouselStyles.carousel}
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={screenWidth * 0.78 + 20}
        snapToAlignment="start"
      />
    </View>
  );
};

export default SmartSuggestionsCarousel;
