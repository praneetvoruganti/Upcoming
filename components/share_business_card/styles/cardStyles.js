import { StyleSheet } from 'react-native';

// Premium Color Palette
const COLORS = {
  primary: '#1a1a1a',        // Deep charcoal
  secondary: '#2c3e50',      // Sophisticated blue-gray
  accent: '#c9b037',         // Muted gold
  surface: '#f8f9fa',        // Off-white
  onSurface: '#2d3748',      // Dark gray
  onSurfaceVariant: '#64748b', // Medium gray
  border: '#e2e8f0',         // Light gray border
  shadow: 'rgba(0, 0, 0, 0.08)',
  cardBackground: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
};

const cardStyles = StyleSheet.create({
  cardContainer: {
    width: 340,
    height: 200,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  cardBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%)',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    position: 'relative',
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
  },
  rightSection: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandSection: {
    position: 'absolute',
    top: 16,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 4,
  },
  brandName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.accent,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  profileText: {
    flex: 1,
  },
  driverName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  vehicleInfo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
    marginBottom: 4,
    opacity: 0.9,
  },
  contactInfo: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(201, 176, 55, 0.1)',
    borderBottomLeftRadius: 30,
  },
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: COLORS.accent,
  },
});

export default cardStyles;
