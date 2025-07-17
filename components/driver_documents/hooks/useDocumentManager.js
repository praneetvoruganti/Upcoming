import { useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { documentConfig } from '../config/document.config';

// This is a placeholder for your actual API service
const Api = {
  uploadDocument: async (file) => {
    console.log('Uploading', file.fileName);
    // Replace with your actual API call
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await fetch('https://app.ok2go.app/api/v2/document/upload', {
    //   method: 'POST',
    //   body: formData,
    // });
    // const data = await response.json();
    // return data.data; // Assuming the API returns the ID in { data: '...' }
    return `https://fake-url.com/${file.fileName}`;
  },
  deleteDocument: async (id) => {
    console.log('Deleting', id);
    // Replace with your actual API call
    // await fetch(`https://app.ok2go.app/api/v2/document/delete/${id}`);
    return true;
  },
};

export const useDocumentManager = (initialUser) => {
  const [driverData, setDriverData] = useState(initialUser);
  const [documents, setDocuments] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize documents state from initialUser
    const initialDocs = {};
    documentConfig.forEach(doc => {
      if (initialUser[doc.key]) {
        initialDocs[doc.key] = initialUser[doc.key];
      }
    });
    setDocuments(initialDocs);
  }, [initialUser]);

  const handleUpload = async (key) => {
    setIsLoading(true);
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.didCancel) return;
      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const documentId = await Api.uploadDocument(file);
        setDocuments(prev => ({ ...prev, [key]: documentId }));
        setDriverData(prev => ({ ...prev, [key]: documentId }));
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (key) => {
    setIsLoading(true);
    try {
      const documentId = documents[key];
      await Api.deleteDocument(documentId);
      setDocuments(prev => {
        const newDocs = { ...prev };
        delete newDocs[key];
        return newDocs;
      });
      setDriverData(prev => {
        const newData = { ...prev };
        newData[key] = null;
        return newData;
      });
    } catch (error) {
      console.error('Delete failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateDocuments = () => {
    for (const doc of documentConfig) {
      if (doc.required) {
        // Add specific logic based on carType etc. as in the Angular app
        if (!documents[doc.key]) {
          alert(`Please upload ${doc.label}`);
          return false;
        }
      }
    }
    return true;
  };

  const updateProfile = (updates) => {
    setDriverData(prevData => ({ ...prevData, profile: { ...prevData.profile, ...updates } }));
  };

  return {
    driverData,
    documents: driverData.documents,
    isLoading,
    actions: {
      handleUpload,
      handleDelete,
      validateDocuments,
      updateProfile,
    },
  };
};
