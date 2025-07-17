import { Platform } from 'react-native';

export const fonts = {
  heading: {
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
};
