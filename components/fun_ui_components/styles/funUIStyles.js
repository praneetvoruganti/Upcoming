import { StyleSheet } from 'react-native';

const colors = {
  primary: '#EE436E',
  secondary: '#FBDA25',
  black: '#201E1E',
  white: '#FEFEFE',
};

const funUIStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
    paddingTop: 50,
  },
  text: {
    color: colors.black,
    fontSize: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    width: '100%',
    alignSelf: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
});

export default funUIStyles;
