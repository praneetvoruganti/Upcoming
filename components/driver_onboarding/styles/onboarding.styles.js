import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';

export const onboardingStyles = StyleSheet.create({
  // Slide container
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  slideImage: {
    width: '80%',
    maxWidth: 300,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 48,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 32,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Pager Dots
  pagerDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.grey,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },

  // Buttons
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '60%',
  },
  primaryButtonText: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  linkButton: {
    padding: 8,
  },
  linkButtonText: {
    fontFamily: fonts.body,
    fontSize: 16,
    color: colors.link,
  },
});
