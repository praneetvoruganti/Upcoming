import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDocumentManager } from './hooks/useDocumentManager';
import DocumentList from './components/DocumentList';
import ProfileForm from './components/ProfileForm';
import ViewImageModal from './components/ViewImageModal';
import StatusBanner from './components/UploadButton'; // This file exports StatusBanner
import { userModel, documentConfig } from './config/document.config';
import { colors, spacing, typography, elevation } from './styles/driverDocStyles';

const DriverDocuments = ({ initialUser = userModel, onSave }) => {
  const { driverData, documents, isLoading, actions } = useDocumentManager(initialUser);
  const [viewingImage, setViewingImage] = useState(null); // Will hold { uri, name }

  const handleSave = () => {
    if (actions.validateDocuments()) {
      onSave(driverData);
    }
  };

  const handleView = (key) => {
    const doc = documents[key];
    const config = documentConfig.find(c => c.key === key);
    if (doc?.uri && config) {
      setViewingImage({ uri: doc.uri, name: config.label });
    }
  };

  const handleProfileUpdate = (field, value) => {
    actions.updateProfile({ [field]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBanner status={driverData.applicationStatus} />
        <ProfileForm profile={driverData.profile} onUpdate={handleProfileUpdate} />
        <DocumentList
          documents={documents}
          actions={{ ...actions, handleView }}
          isLoading={isLoading}
        />
      </ScrollView>

      {/* Floating Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color={colors.text.light} />
        ) : (
          <Text style={styles.saveButtonText}>Save & Continue</Text>
        )}
      </TouchableOpacity>

      {/* Image Modal */}
      {viewingImage && (
        <ViewImageModal
          isVisible={!!viewingImage}
          imageUrl={viewingImage.uri}
          docName={viewingImage.name}
          onClose={() => setViewingImage(null)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingBottom: spacing.xxlarge + spacing.buttonHeight, // Extra space for FAB
  },
  saveButton: {
    position: 'absolute',
    bottom: spacing.large,
    left: spacing.large,
    right: spacing.large,
    height: spacing.buttonHeight,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.borderRadius,
    ...elevation.z2,
  },
  saveButtonText: {
    ...typography.styles.button,
    color: colors.text.light,
  },
});

export default DriverDocuments;
