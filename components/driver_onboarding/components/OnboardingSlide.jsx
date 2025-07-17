import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

const { width } = Dimensions.get('window');

const OnboardingSlide = ({ title, subtitle, image, footer }) => {
  return (
    <LinearGradient colors={colors.bgGradient} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {image ? (
            <Image source={image} style={styles.image} resizeMode="contain" />
          ) : (
            <View style={[styles.image, styles.placeholderImage]} />
          )}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.footerContainer}>{footer}</View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: width * 0.8,
    maxWidth: 300,
    height: width * 0.8,
    maxHeight: 300,
    marginBottom: 48,
  },
  title: {
    ...fonts.heading,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    ...fonts.body,
    color: colors.textDark,
    textAlign: 'center',
    opacity: 0.8,
  },
  footerContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  placeholderImage: {
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#BDBDBD',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingSlide;
