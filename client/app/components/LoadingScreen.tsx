import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';

const LoadingScreen = () => {
  return (
    <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
      <LottieView
        style={{ width: '25%', height: '25%' }}
        source={require('../../assets/loadingAnimation.json')}
        autoPlay
        loop
      />
      {/* <Text>Loading...</Text> */}
    </View>
  );
};

export default LoadingScreen;
