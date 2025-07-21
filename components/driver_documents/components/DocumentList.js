import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import DocumentCard from './DocumentRow';
import { documentConfig } from '../config/document.config';
import { colors, spacing, typography } from '../styles/driverDocStyles';

// Premium List Header
const ListHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Required Documents</Text>
    <Text style={styles.headerSubtitle}>Please upload all mandatory documents to complete your profile.</Text>
  </View>
);

// Premium Empty State Component
const EmptyList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>🗂️</Text>
    <Text style={styles.emptyText}>No documents to display.</Text>
  </View>
);

// Redesigned Document List Component
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
      keyExtractor={(item) => item.key}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={EmptyList}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.xxlarge, // Ensure space for last card's shadow and floating buttons
  },
  headerContainer: {
    paddingVertical: spacing.medium,
    marginBottom: spacing.small,
  },
  headerTitle: {
    ...typography.styles.title,
    fontSize: typography.sizes.xlarge,
    marginBottom: spacing.xsmall,
  },
  headerSubtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.large,
    marginTop: spacing.xxlarge,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.medium,
  },
  emptyText: {
    ...typography.styles.subtitle,
    color: colors.text.secondary,
  },
});

export default DocumentList;
