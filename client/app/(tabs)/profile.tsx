import { router, useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import checkLoginStatus from '../../util/sessions';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function ProfileScreen() {
  // define local and state variables
  const emptyAvatarImage = require('../../assets/profile.jpg');
  const [user, setUser] = useState(null);

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
      console.log('LOGIN STATUS:', status.isLoggedIn);
    });
  });

  //// END LOGIN SESSION CHECKING

  // call user-details api upon "userId" change
  useEffect(() => {
    if (isLoginStatusChecked) {
      const queryUserDetails = async () => {
        setIsLoading(true);
        const userDetailsRequest = await fetch(
          `${nextHost}/api/users/id/${userId}`,
        );
        const userDetailsResponse = await userDetailsRequest.json();
        setUser(userDetailsResponse);
        setIsLoading(false);
      };
      if (userId) {
        queryUserDetails();
      } else {
        setUser(null);
        setIsLoading(false);
      }
    }
  }, [userId, isLoginStatusChecked]);

  // call logout api on button click.
  const logout = async () => {
    const logoutRequest = await fetch(`${nextHost}/api/auth/logout`).catch(
      console.error,
    );
    const logoutResponse = await logoutRequest.json();
    console.log('LOGOUT API:', logoutResponse.message);
    // check if logout was successful.
    if (logoutResponse.success) {
      setUserId(null);
      setUser(null);
      Toast.show({
        type: 'success',
        text1: 'Successfully logged out!',
      });
    }
  };

  // loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }
  // logged-in or non-logged-in rendering
  if (user && isLoggedIn) {
    return (
      <View className="flex-1 h-screen w-screen items-center bg-white">
        <View className="bg-cyan-800  w-32 h-32 justify-center items-center rounded-full mt-10">
          <Text className="mt-3 text-6xl text-white">{user.first_name[0]}</Text>
        </View>
        <Text className="mt-5 mb-10 text-lg">
          {user.first_name} {user.last_name}
        </Text>
        <Text>ID: {user.id}</Text>
        <Text>Phone: {user.username}</Text>
        <Text>Last login: {user.last_login}</Text>
        <View className="my-10">
          <CustomButton onPress={logout}>Log out</CustomButton>
        </View>
      </View>
    );
  } else {
    // if user is null, show non-logged-in screen
    return (
      <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
        <Image className="w-48 h-48 mb-10" source={emptyAvatarImage} />
        <CustomButton onPress={() => router.navigate('../(auth)/identify')}>
          Log in to view
        </CustomButton>
      </View>
    );
  }
}
