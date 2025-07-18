import { StyleSheet } from 'react-native';

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 50,
  },
});
