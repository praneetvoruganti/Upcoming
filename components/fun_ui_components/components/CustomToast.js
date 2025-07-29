import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { swipeButtonStyles } from '../styles/swipeButtonStyles';

const CustomToast = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  useImperativeHandle(ref, () => ({
    show(msg) {
      setMessage(msg);
      setVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setVisible(false);
          });
        }, 2000);
      });
    },
  }));

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[swipeButtonStyles.toastContainer, { opacity: fadeAnim }]}>
      <Icon name="check-circle-outline" size={24} color="#EE436E" />
      <Text style={swipeButtonStyles.toastMessage}>{message}</Text>
    </Animated.View>
  );
});

export default CustomToast;
