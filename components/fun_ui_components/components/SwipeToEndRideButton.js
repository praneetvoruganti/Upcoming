import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Animated, PanResponder, Dimensions, Haptics } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { swipeButtonStyles } from '../styles/swipeButtonStyles';

const { width } = Dimensions.get('window');

const SwipeToEndRideButton = ({ onSwipeComplete }) => {
  const [swiped, setSwiped] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;
  const handleScale = useRef(new Animated.Value(1)).current;
  const completionOpacity = useRef(new Animated.Value(0)).current;

  const BUTTON_WIDTH = width * 0.9; // Match width from FunUIComponentsScreen
  const HANDLE_WIDTH = 52;
  const SWIPE_THRESHOLD = BUTTON_WIDTH - HANDLE_WIDTH - 12; // 6 padding on each side

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !swiped,
      onPanResponderGrant: () => {
        setIsPressed(true);
        Animated.spring(handleScale, {
          toValue: 0.95,
          friction: 8,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx > 0 && gesture.dx <= SWIPE_THRESHOLD && !swiped) {
          pan.setValue({ x: gesture.dx, y: 0 });
          const progress = gesture.dx / SWIPE_THRESHOLD;
          const newOpacity = 1 - progress * 0.8;
          textOpacity.setValue(Math.max(0.2, newOpacity));
          progressWidth.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        setIsPressed(false);
        Animated.spring(handleScale, {
          toValue: 1,
          friction: 8,
          useNativeDriver: false,
        }).start();
        
        if (gesture.dx > SWIPE_THRESHOLD * 0.8) {
          // Complete the swipe
          Animated.parallel([
            Animated.timing(pan, {
              toValue: { x: SWIPE_THRESHOLD, y: 0 },
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(progressWidth, {
              toValue: BUTTON_WIDTH,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(textOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(completionOpacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: false,
            })
          ]).start(() => {
            setSwiped(true);
            onSwipeComplete();
            
            // Reset after 2 seconds
            setTimeout(() => {
              resetButton();
            }, 2000);
          });
        } else {
          // Reset to original position
          Animated.parallel([
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              friction: 6,
              tension: 80,
              useNativeDriver: false,
            }),
            Animated.timing(textOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(progressWidth, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            })
          ]).start();
        }
      },
    })
  ).current;

  const resetButton = () => {
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: 0, y: 0 },
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(progressWidth, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(completionOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      })
    ]).start(() => {
      setSwiped(false);
    });
  };

  const handleStyle = {
    transform: [
      ...pan.getTranslateTransform(),
      { scale: handleScale }
    ],
  };

  const textStyle = {
    opacity: textOpacity,
  };

  const progressStyle = {
    width: progressWidth,
  };

  const completionTextStyle = {
    opacity: completionOpacity,
  };

  return (
    <View style={[swipeButtonStyles.container, { width: BUTTON_WIDTH }]}>
      <Animated.View style={[swipeButtonStyles.progressTrack, progressStyle]} />
      
      <Animated.Text style={[swipeButtonStyles.text, textStyle]}>
        Swipe to End Ride
      </Animated.Text>
      
      <Animated.Text style={[swipeButtonStyles.completedText, completionTextStyle]}>
        Ride Ended
      </Animated.Text>
      
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          swipeButtonStyles.handle,
          handleStyle,
          isPressed && swipeButtonStyles.handlePressed
        ]}
      >
        <Icon 
          name={swiped ? "check" : "chevron-right"} 
          size={swiped ? 26 : 28} 
          color="#FEFEFE" 
        />
      </Animated.View>
    </View>
  );
};

export default SwipeToEndRideButton;
