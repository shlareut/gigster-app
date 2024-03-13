import { router, useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import { host, nextHost } from '../constants';

export default function ProfileScreen() {
  // define local and state variables
  const emptyAvatarImage = require('../../assets/profile.jpg');
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  // BETTER SOMETHING LIKE THAT?
  const [loggedIn, setLoggedIn] = useState(false);

  // call session api upon each screen load.
  useFocusEffect(() => {
    // for later: move into util function "checkForActiveSession()" as I will have to use it repeatedly.
    const checkForActiveSession = async () => {
      const sessionRequest = await fetch(`${nextHost}/api/auth/login`).catch(
        console.error,
      );
      const sessionResponse = await sessionRequest.json();
      console.log('SESSION API:', sessionResponse.message);

      // check if a session was found.
      if (sessionResponse.success) {
        //take user id from the returned session.
        setUserId(sessionResponse.userId);
      } else {
        setUser(null);
        setUserId(null);
      }
    };
    checkForActiveSession().catch(console.error);
  });

  // call user-details api upon "userId" change
  useEffect(() => {
    const queryUserDetails = async () => {
      const userDetailsRequest = await fetch(
        `${nextHost}/api/users/id/${userId}`,
      );
      const userDetailsResponse = await userDetailsRequest.json();
      setUser(userDetailsResponse);
    };
    if (userId) {
      queryUserDetails();
    } else {
      setUser(null);
    }
  }, [userId]);

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

  // somehow I should set the user within the same function, how will I do the conditional rendering on other screens?
  // SEE LOGGEDIN STATE VARIABLE ABOVE
  // NOTE THAT IN THIS PARTICULAR SCREEN, USER PROFILE IS REQUIRED! IT RESULTS IN AN ERROR IF I ONLY CHECK FOR SESSION TOKEN

  // conditional rendering
  if (user) {
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
