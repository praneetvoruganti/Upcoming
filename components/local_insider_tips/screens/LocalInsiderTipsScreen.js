import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import TipFeed from '../components/TipFeed';
import TipSubmissionForm from '../components/TipSubmissionForm';
import tipService from '../services/tipService';
import tipStyles from '../styles/tipStyles';

const LocalInsiderTipsScreen = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch tips on component mount
  useEffect(() => {
    loadTips();
  }, []);

  const loadTips = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await tipService.fetchTips();
      
      if (result.success) {
        setTips(result.data);
      } else {
        setError(result.error || 'Failed to load tips');
      }
    } catch (err) {
      setError('Something went wrong while loading tips');
      console.error('Error loading tips:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTipPress = (tip) => {
    // Future: Could open detailed view or action sheet
    Alert.alert(
      tip.title,
      `${tip.description}\n\nLocation: ${tip.location}`,
      [{ text: 'Got it!', style: 'default' }]
    );
  };

  const handleSubmitTip = async (tipData) => {
    try {
      setSubmitting(true);
      setError(null);
      
      const result = await tipService.submitTip(tipData);
      
      if (result.success) {
        setSuccessMessage(result.message);
        setShowSubmissionForm(false);
        
        // Refresh tips to show updated list (in real app, new tip would be pending)
        setTimeout(() => {
          loadTips();
        }, 1000);
      } else {
        setError(result.error || 'Failed to submit tip');
      }
    } catch (err) {
      setError('Something went wrong while submitting your tip');
      console.error('Error submitting tip:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelSubmission = () => {
    setShowSubmissionForm(false);
    setError(null);
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const renderHeader = () => (
    <View style={tipStyles.header}>
      <Text style={tipStyles.headerTitle}>Local Insider Tips</Text>
      <Text style={tipStyles.headerSubtitle}>
        Discover great food & chai spots recommended by fellow drivers
      </Text>
      
      {!showSubmissionForm && (
        <TouchableOpacity
          style={[tipStyles.submitButton, { marginTop: 16 }]}
          onPress={() => setShowSubmissionForm(true)}
        >
          <Text style={tipStyles.submitButtonText}>+ Share a Tip</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderMessage = () => {
    if (!error && !successMessage) return null;
    
    return (
      <TouchableOpacity
        style={[
          tipStyles.messageContainer,
          error ? tipStyles.errorMessage : tipStyles.successMessage
        ]}
        onPress={clearMessages}
      >
        <Text
          style={[
            tipStyles.messageText,
            error ? tipStyles.errorText : tipStyles.successText
          ]}
        >
          {error || successMessage}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSubmissionForm = () => (
    <TipSubmissionForm
      onSubmit={handleSubmitTip}
      onCancel={handleCancelSubmission}
      loading={submitting}
    />
  );

  const renderTipFeed = () => (
    <TipFeed
      tips={tips}
      loading={loading}
      onTipPress={handleTipPress}
    />
  );

  return (
    <View style={tipStyles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {renderHeader()}
        {renderMessage()}
        
        {showSubmissionForm ? renderSubmissionForm() : renderTipFeed()}
      </ScrollView>
    </View>
  );
};

export default LocalInsiderTipsScreen;
