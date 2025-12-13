import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface MobileWrapperProps {
  children: React.ReactNode;
}

const MobileWrapper: React.FC<MobileWrapperProps> = ({ children }) => {
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth < 768;

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.deviceFrame}>
        <View style={styles.screen}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  deviceFrame: {
    width: 320,
    height: 640,
    backgroundColor: '#000',
    borderRadius: 35,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 32,
    overflow: 'hidden',
  },
});

export default MobileWrapper;
