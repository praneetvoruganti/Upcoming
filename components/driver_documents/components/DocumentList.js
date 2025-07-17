import React from 'react';
import { FlatList } from 'react-native';
import DocumentCard from './DocumentRow'; // This file now exports DocumentCard
import { documentConfig } from '../config/document.config';

const DocumentList = ({ documents, actions, isLoading }) => {
  const renderItem = ({ item }) => (
    <DocumentCard
      doc={documents[item.key]}
      config={item}
      onUpload={() => actions.handleUpload(item.key)}
      onView={() => actions.handleView(item.key)}
      onDelete={() => actions.handleDelete(item.key)}
      isLoading={isLoading}
    />
  );

  return (
    <FlatList
      data={documentConfig}
      renderItem={renderItem}
      keyExtractor={item => item.key}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }} // Added padding
    />
  );
};

export default DocumentList;
