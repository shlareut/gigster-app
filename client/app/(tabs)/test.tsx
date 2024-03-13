import { router, useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import checkLoginStatus from '../../util/sessions';
import CustomButton from '../components/CustomButton';

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserId] = useState(null);
  useFocusEffect(() => {
    checkLoginStatus().then((status) => {
      setIsLoggedIn(status.isLoggedIn);
      setUserId(status.userId);
      console.log('LOGIN STATUS:', status.isLoggedIn);
    });
  });
  return (
    <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
      <LottieView
        style={{ width: '25%', height: '25%' }}
        source={require('../../assets/loadingAnimation.json')}
        autoPlay
        loop
      />
      <Text>Loading...</Text>
      <LottieView
        style={{ width: '25%', height: '25%' }}
        source={require('../../assets/buttonLoadingAnimation.json')}
        autoPlay
        loop
      />
      <Pressable
        className="w-fit justify-center items-center rounded-md bg-cyan-800 opacity-50"
        disabled={true}
      >
        <Text className="my-2 mx-5 font-extrabold text-white text-lg">...</Text>
      </Pressable>
    </View>
  );
}
