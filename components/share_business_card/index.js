import BusinessCardScreen from './screens/BusinessCardScreen';

export const ShareBusinessCard = ({ driverProfile, onShare }) => {
  return <BusinessCardScreen driverProfile={driverProfile} onShare={onShare} />;
};
