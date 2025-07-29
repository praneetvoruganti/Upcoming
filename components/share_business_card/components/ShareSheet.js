import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

// Premium Color Palette
const COLORS = {
  primary: '#1a1a1a',
  secondary: '#2c3e50',
  accent: '#c9b037',
  surface: '#ffffff',
  onSurface: '#2d3748',
  onSurfaceVariant: '#64748b',
  border: '#e2e8f0',
  background: '#f8f9fa',
  shadow: 'rgba(0, 0, 0, 0.08)',
  success: '#10b981',
  whatsapp: '#25d366',
};

const ShareSheet = ({ cardPreviewRef, onShare }) => {
  const shareCard = async (type) => {
    if (cardPreviewRef.current) {
      try {
        const uri = await cardPreviewRef.current.capture();
        const options = {
          title: 'My Professional Business Card - OK2GO',
          url: uri,
          type: 'image/png',
        };

        if (type === 'whatsapp') {
          options.social = Share.Social.WHATSAPP;
          options.message = 'Here\'s my professional business card. Book your next ride with me on OK2GO!';
        } else if (type === 'qr') {
          // Implement logic to show QR code in a modal
          console.log('Show QR code modal');
          return;
        }

        await Share.open(options);
        if (onShare) onShare();
      } catch (error) {
        console.error('Error sharing card:', error);
      }
    }
  };

  const shareOptions = [
    {
      id: 'whatsapp',
      title: 'Share via WhatsApp',
      subtitle: 'Send to customers & contacts',
      icon: '💬',
      color: COLORS.whatsapp,
      action: () => shareCard('whatsapp'),
    },
    {
      id: 'gallery',
      title: 'Save to Gallery',
      subtitle: 'Keep a copy on your device',
      icon: '📱',
      color: COLORS.success,
      action: () => shareCard('gallery'),
    },
    {
      id: 'qr',
      title: 'Show QR Code',
      subtitle: 'Let customers scan directly',
      icon: '📲',
      color: COLORS.accent,
      action: () => shareCard('qr'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Share Your Business Card</Text>
        <Text style={styles.subtitle}>Choose how you want to share your professional profile</Text>
      </View>
      
      <View style={styles.optionsContainer}>
        {shareOptions.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.optionButton, { borderLeftColor: option.color }]}
            onPress={option.action}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={[styles.iconContainer, { backgroundColor: option.color + '15' }]}>
                <Text style={styles.optionIcon}>{option.icon}</Text>
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Your card will be shared professionally with OK2GO branding</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionIcon: {
    fontSize: 20,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.onSurface,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  optionSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.onSurfaceVariant,
    fontWeight: '300',
  },
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default ShareSheet;
