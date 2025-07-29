import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import tipStyles from '../styles/tipStyles';

const TipSubmissionForm = ({ onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});

  const maxLengths = {
    title: 50,
    description: 200,
    location: 100
  };

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > maxLengths.title) {
      newErrors.title = `Title must be ${maxLengths.title} characters or less`;
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > maxLengths.description) {
      newErrors.description = `Description must be ${maxLengths.description} characters or less`;
    }

    // Location validation (optional but has max length)
    if (formData.location.length > maxLengths.location) {
      newErrors.location = `Location must be ${maxLengths.location} characters or less`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        ...formData,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        submittedBy: null // Anonymous submission
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFocus = (field) => {
    setFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocused(prev => ({ ...prev, [field]: false }));
  };

  const isFormValid = formData.title.trim() && 
                     formData.category && 
                     formData.description.trim() && 
                     formData.description.length >= 10 &&
                     Object.keys(errors).length === 0;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={tipStyles.form} showsVerticalScrollIndicator={false}>
        <Text style={tipStyles.formTitle}>Share a Local Gem</Text>
        <Text style={tipStyles.headerSubtitle}>
          Help fellow drivers discover great food and chai spots
        </Text>

        {/* Title Input */}
        <View style={tipStyles.inputContainer}>
          <Text style={tipStyles.label}>Spot Name *</Text>
          <TextInput
            style={[
              tipStyles.input,
              focused.title && tipStyles.focusedInput,
              errors.title && { borderColor: '#ef4444' }
            ]}
            value={formData.title}
            onChangeText={(text) => handleInputChange('title', text)}
            onFocus={() => handleFocus('title')}
            onBlur={() => handleBlur('title')}
            placeholder="e.g., Sharma Cutting Chai"
            maxLength={maxLengths.title}
            editable={!loading}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {errors.title ? (
              <Text style={[tipStyles.messageText, tipStyles.errorText]}>{errors.title}</Text>
            ) : <View />}
            <Text style={tipStyles.characterCount}>
              {formData.title.length}/{maxLengths.title}
            </Text>
          </View>
        </View>

        {/* Category Selection */}
        <View style={tipStyles.inputContainer}>
          <Text style={tipStyles.label}>Category *</Text>
          <View style={tipStyles.categorySelector}>
            {['Chai Spot', 'Tiffin Center'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  tipStyles.categoryOption,
                  formData.category === category && tipStyles.selectedCategory
                ]}
                onPress={() => handleInputChange('category', category)}
                disabled={loading}
              >
                <Text style={{ fontSize: 18, marginBottom: 4 }}>
                  {category === 'Chai Spot' ? '☕' : '🍽️'}
                </Text>
                <Text
                  style={[
                    tipStyles.categoryOptionText,
                    formData.category === category && tipStyles.selectedCategoryText
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && (
            <Text style={[tipStyles.messageText, tipStyles.errorText, { marginTop: 4 }]}>
              {errors.category}
            </Text>
          )}
        </View>

        {/* Description Input */}
        <View style={tipStyles.inputContainer}>
          <Text style={tipStyles.label}>Description *</Text>
          <TextInput
            style={[
              tipStyles.input,
              tipStyles.textArea,
              focused.description && tipStyles.focusedInput,
              errors.description && { borderColor: '#ef4444' }
            ]}
            value={formData.description}
            onChangeText={(text) => handleInputChange('description', text)}
            onFocus={() => handleFocus('description')}
            onBlur={() => handleBlur('description')}
            placeholder="Share what makes this place special - food quality, atmosphere, prices, etc."
            maxLength={maxLengths.description}
            multiline
            numberOfLines={4}
            editable={!loading}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {errors.description ? (
              <Text style={[tipStyles.messageText, tipStyles.errorText]}>{errors.description}</Text>
            ) : <View />}
            <Text style={tipStyles.characterCount}>
              {formData.description.length}/{maxLengths.description}
            </Text>
          </View>
        </View>

        {/* Location Input */}
        <View style={tipStyles.inputContainer}>
          <Text style={tipStyles.label}>Location (Optional)</Text>
          <TextInput
            style={[
              tipStyles.input,
              focused.location && tipStyles.focusedInput,
              errors.location && { borderColor: '#ef4444' }
            ]}
            value={formData.location}
            onChangeText={(text) => handleInputChange('location', text)}
            onFocus={() => handleFocus('location')}
            onBlur={() => handleBlur('location')}
            placeholder="e.g., Near Metro Station, MG Road"
            maxLength={maxLengths.location}
            editable={!loading}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {errors.location ? (
              <Text style={[tipStyles.messageText, tipStyles.errorText]}>{errors.location}</Text>
            ) : <View />}
            <Text style={tipStyles.characterCount}>
              {formData.location.length}/{maxLengths.location}
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            tipStyles.submitButton,
            (!isFormValid || loading) && tipStyles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid || loading}
        >
          <Text
            style={[
              tipStyles.submitButtonText,
              (!isFormValid || loading) && tipStyles.disabledButtonText
            ]}
          >
            {loading ? 'Submitting...' : 'Share Tip'}
          </Text>
        </TouchableOpacity>

        {/* Cancel Button */}
        {onCancel && (
          <TouchableOpacity
            style={[tipStyles.submitButton, { backgroundColor: '#6b7280', marginTop: 8 }]}
            onPress={onCancel}
            disabled={loading}
          >
            <Text style={tipStyles.submitButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}

        {/* Disclaimer */}
        <Text style={[tipStyles.emptyStateSubtext, { textAlign: 'center', marginTop: 16 }]}>
          Tips are submitted anonymously and reviewed before appearing in the feed.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TipSubmissionForm;
