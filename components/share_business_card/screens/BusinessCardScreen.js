import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Text, StatusBar, SafeAreaView } from 'react-native';
import EditCardForm from '../components/EditCardForm';
import BusinessCardPreview from '../components/BusinessCardPreview';
import ShareSheet from '../components/ShareSheet';
import { saveCardData, loadCardData } from '../services/cardService';

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
};

const BusinessCardScreen = ({ driverProfile, onShare }) => {
  const [cardData, setCardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const cardPreviewRef = useRef(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        let data = await loadCardData();
        if (!data) {
          // If no saved data, use initial driverProfile with enhanced defaults
          data = { 
            ...driverProfile, 
            privacy: { contact: false }, 
            tagline: driverProfile.tagline || 'Your trusted ride partner'
          };
        }
        setCardData(data);
      } catch (error) {
        console.error('Error loading card data:', error);
        // Fallback to default data
        setCardData({ 
          ...driverProfile, 
          privacy: { contact: false }, 
          tagline: 'Your trusted ride partner'
        });
      } finally {
        setIsLoading(false);
      }
    };
    initializeData();
  }, [driverProfile]);

  const handleUpdate = async (field, value) => {
    const updatedData = { ...cardData, [field]: value };
    setCardData(updatedData);
    try {
      await saveCardData(updatedData); // Auto-save on change
    } catch (error) {
      console.error('Error saving card data:', error);
    }
  };

  if (isLoading || !cardData) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Preparing your business card...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Business Card</Text>
          <Text style={styles.headerSubtitle}>Create and share your professional profile</Text>
        </View>
        
        <View style={styles.previewSection}>
          <BusinessCardPreview ref={cardPreviewRef} cardData={cardData} />
        </View>
        
        <View style={styles.editSection}>
          <EditCardForm cardData={cardData} onUpdate={handleUpdate} />
        </View>
        
        <ShareSheet cardPreviewRef={cardPreviewRef} onShare={onShare} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: COLORS.onSurfaceVariant,
    fontWeight: '400',
    lineHeight: 22,
  },
  previewSection: {
    paddingVertical: 32,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  editSection: {
    backgroundColor: COLORS.background,
  },
});

export default BusinessCardScreen;
