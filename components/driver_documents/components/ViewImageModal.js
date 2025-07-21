import React from 'react';
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography, elevation } from '../styles/driverDocStyles';

const ViewImageModal = ({ isVisible, imageUrl, docName, onClose }) => {
  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.docName}>{docName}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Image Viewer with Zoom */}
        <View style={styles.imageContainer}>
          <ScrollView
            maximumZoomScale={3}
            minimumZoomScale={1}
            centerContent={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <Image source={{ uri: imageUrl }} style={styles.fullImage} resizeMode="contain" />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.medium,
    paddingTop: spacing.large, // Adjust for status bar
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  docName: {
    ...typography.styles.subtitle,
    color: colors.text.light,
    maxWidth: '85%',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.text.light,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});

export default ViewImageModal;
