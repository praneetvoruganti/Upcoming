import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDocumentManager } from './hooks/useDocumentManager';
import DocumentList from './components/DocumentList';
import ProfileForm from './components/ProfileForm';
import ViewImageModal from './components/ViewImageModal';
import StatusBanner from './components/UploadButton'; // This file now exports StatusBanner
import { userModel } from './config/document.config';
import styles from './styles';

const DriverDocuments = ({ initialUser = userModel, onSave }) => {
  const { driverData, documents, isLoading, actions } = useDocumentManager(initialUser);
  const [viewingImage, setViewingImage] = useState(null);

  const handleSave = () => {
    if (actions.validateDocuments()) {
      onSave(driverData);
    }
  };

  const handleView = (key) => {
    setViewingImage(documents[key]?.uri);
  };

  const handleProfileUpdate = (field, value) => {
    actions.updateProfile({ [field]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBanner status={driverData.applicationStatus} />
      <ScrollView>
        <ProfileForm profile={driverData.profile} onUpdate={handleProfileUpdate} />
        <View style={styles.header}>
          <Text style={styles.title}>Your Documents</Text>
        </View>
        <DocumentList
          documents={documents}
          actions={{ ...actions, handleView }}
          isLoading={isLoading}
        />
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save and Continue</Text>
        )}
      </TouchableOpacity>
      {viewingImage && (
        <ViewImageModal
          isVisible={!!viewingImage}
          imageUrl={viewingImage}
          onClose={() => setViewingImage(null)}
        />
      )}
    </SafeAreaView>
  );
};

export default DriverDocuments;
