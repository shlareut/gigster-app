import { router, useFocusEffect } from 'expo-router';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import checkLoginStatus from '../../util/sessions';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import PostingCard from '../components/PostingCard';

export default function PostingsScreen() {
  // define local and state variables
  const emptyScreenImage = require('../../assets/postings.jpg');

  //// START LOGIN SESSION CHECKING

  // ensure login-status is checked before setting isLoaded to false
  const [isLoginStatusChecked, setIsLoginStatusChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // check login status on every screen load
  useFocusEffect(() => {
    checkLoginStatus().then((status) => {
      setIsLoggedIn(status.isLoggedIn);
      setUserId(status.userId);
      setIsLoginStatusChecked(true);
      setIsLoading(false);
      console.log('LOGIN STATUS:', status.isLoggedIn);
    });
  });

  //// END LOGIN SESSION CHECKING

  // loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isLoggedIn) {
    // logged-in screen
    return (
      <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
        <Text>Logged in!</Text>
        <PostingCard />
        <PostingCard />
      </View>
    );
  } else {
    // non-logged-in screen
    return (
      <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
        <Image className="w-48 h-48 mb-10" source={emptyScreenImage} />
        <CustomButton onPress={() => router.navigate('../(auth)/identify')}>
          Log in to view
        </CustomButton>
      </View>
    );
  }
}
