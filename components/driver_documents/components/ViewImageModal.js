import React, { useState } from 'react';
import { Modal, View, Image, TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

const ViewImageModal = ({ isVisible, imageUrl, onClose }) => (
  <Modal
    visible={isVisible}
    transparent={true}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <Image source={{ uri: imageUrl }} style={styles.fullImage} />
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default ViewImageModal;
