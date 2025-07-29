import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchingModal = ({ isVisible, onClose }) => {
  const fadeOpacity = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(50)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;
  const dotOpacity1 = useRef(new Animated.Value(0.3)).current;
  const dotOpacity2 = useRef(new Animated.Value(0.3)).current;
  const dotOpacity3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isVisible) {
      // Entry animation
      Animated.parallel([
        Animated.timing(fadeOpacity, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();

      // Progress bar animation
      Animated.loop(
        Animated.timing(progressWidth, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        })
      ).start();

      // Sophisticated dot sequence animation
      const createDotSequence = () => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(dotOpacity1, {
              toValue: 1,
              duration: 600,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(dotOpacity2, {
              toValue: 1,
              duration: 600,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(dotOpacity3, {
              toValue: 1,
              duration: 600,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.delay(400),
            Animated.parallel([
              Animated.timing(dotOpacity1, {
                toValue: 0.3,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(dotOpacity2, {
                toValue: 0.3,
                duration: 300,
                useNativeDriver: true,
              }),
              Animated.timing(dotOpacity3, {
                toValue: 0.3,
                duration: 300,
                useNativeDriver: true,
              }),
            ]),
          ])
        );
      };
      createDotSequence().start();
    } else {
      fadeOpacity.setValue(0);
      slideY.setValue(50);
      progressWidth.setValue(0);
      dotOpacity1.setValue(0.3);
      dotOpacity2.setValue(0.3);
      dotOpacity3.setValue(0.3);
    }
  }, [isVisible]);

  const progressWidthInterpolated = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.container, { opacity: fadeOpacity }]}>
        <Animated.View style={[styles.modalView, { transform: [{ translateY: slideY }] }]}>
          <View style={styles.header}>
            <Icon name="car-outline" size={28} color="#EE436E" />
            <Text style={styles.title}>Locating Your Driver</Text>
          </View>
          
          <Text style={styles.subtitle}>Connecting you with a professional driver in your area</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View 
                style={[styles.progressBar, { width: progressWidthInterpolated }]} 
              />
            </View>
          </View>
          
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <Animated.View style={[styles.statusDot, { opacity: dotOpacity1 }]} />
              <Text style={styles.statusText}>Searching nearby drivers</Text>
            </View>
            <View style={styles.statusRow}>
              <Animated.View style={[styles.statusDot, { opacity: dotOpacity2 }]} />
              <Text style={styles.statusText}>Verifying availability</Text>
            </View>
            <View style={styles.statusRow}>
              <Animated.View style={[styles.statusDot, { opacity: dotOpacity3 }]} />
              <Text style={styles.statusText}>Confirming your ride</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(32, 30, 30, 0.92)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FEFEFE',
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 15,
    minWidth: 320,
    maxWidth: 360,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#201E1E',
    marginLeft: 12,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 15,
    color: '#6C6C70',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 32,
    fontWeight: '400',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 32,
  },
  progressTrack: {
    height: 3,
    backgroundColor: '#F2F2F7',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#EE436E',
    borderRadius: 1.5,
  },
  statusContainer: {
    width: '100%',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EE436E',
    marginRight: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#48484A',
    fontWeight: '400',
    letterSpacing: -0.1,
  },
});

export default SearchingModal;
