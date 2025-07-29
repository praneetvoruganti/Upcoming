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
    fontSize: 28,
    fontWeight: '800',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 17,
    fontWeight: '400',
    color: colors.textDark,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
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
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '700',
    color: colors.textLight,
    letterSpacing: 0.3,
  },
  linkButton: {
    padding: 8,
  },
  linkButtonText: {
    fontFamily: fonts.body,
    fontSize: 16,
    fontWeight: '600',
    color: colors.link,
    letterSpacing: 0.2,
  },
});
