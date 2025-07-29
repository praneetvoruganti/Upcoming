import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const colors = {
  primarySubtle: 'rgba(238, 67, 110, 0.4)',
  secondarySubtle: 'rgba(251, 218, 37, 0.4)',
  background: '#FEFEFE' // White background
};

export const animatedBackgroundStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  star: {
    position: 'absolute',
    borderRadius: 50, // Perfect circle
  },
});
