import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const colors = {
  primary: '#EE436E',
  secondary: '#FBDA25',
  black: '#201E1E',
  white: '#FEFEFE',
  gray: '#8E8E93',
  lightGray: '#F8F9FA',
  darkGray: '#3C3C43',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const carouselStyles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 20,
    marginBottom: 10,
    letterSpacing: -0.4,
    textTransform: 'uppercase',
    opacity: 0.9,
  },
  carousel: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    width: screenWidth * 0.78,
    height: 155,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 20,
    shadowColor: 'rgba(32, 30, 30, 0.25)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(238, 67, 110, 0.12)',
    overflow: 'hidden',
    justifyContent: 'center',
    position: 'relative',
  },
  itemContainerEven: {
    transform: [{ rotate: '0.5deg' }],
  },
  itemContainerOdd: {
    transform: [{ rotate: '-0.5deg' }],
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(238, 67, 110, 0.02)',
    borderRadius: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.black,
    marginBottom: 8,
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  itemDescription: {
    fontSize: 13,
    color: colors.darkGray,
    lineHeight: 18,
    fontWeight: '500',
    opacity: 0.9,
  },
  itemHighlight: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: -0.1,
    fontStyle: 'italic',
    opacity: 1,
    textShadowColor: 'rgba(238, 67, 110, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
