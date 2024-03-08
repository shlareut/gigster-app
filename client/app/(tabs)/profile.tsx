import { router, useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import { host } from '../constants';

export default function ProfileScreen() {
  // import static image
  const image = require('../../assets/profile.jpg');
  // if a session will be found, user-id is set
  const [userId, setUserId] = useState(null);
  // fetch session on each screen focus
  const [hasSession, setHasSession] = useState(false);
  useFocusEffect(() => {
    const fetchSession = async () => {
      const request = await fetch(`${host}/api/get_session`);
      const response = await request.json();
      console.log(response);
      setHasSession(response.success);
      if (response.success) {
        const sessionUserId = response?.session?.[0]?.user_id;
        setUserId(sessionUserId);
      }
    };
    fetchSession().catch(console.error);
  });
  // user state variables
  const [user, setUser] = useState({});
  const [letter, setLetter] = useState('P');
  // fetch user details if user-id was set!
  useEffect(() => {
    const fetchUserById = async () => {
      const response = await fetch(`${host}/api/users/id/${userId}`);
      const user = await response.json();
      setUser(user.details);
      setLetter(user.details.first_name[0]);
      // success toaster message
      Toast.show({
        type: 'success',
        text1: 'Successfully logged in, session created!',
      });
    };
    if (userId) {
      fetchUserById().catch(console.error);
    }
  }, [userId]);
  // Logging user id for testing
  console.log('Current user id:', userId);
  // log out function
  const logout = async () => {
    const request = await fetch(`${host}/api/delete_session`);
    const response = await request.json();
    if (response.success) {
      setUserId(null);
      setHasSession(false);
      Toast.show({
        type: 'success',
        text1: 'Successfully logged out!',
      });
    }
  };
  // conditional rendering
  if (hasSession) {
    return (
      <View className="flex-1 h-screen w-screen items-center bg-white">
        <View className="bg-cyan-800  w-32 h-32 justify-center items-center rounded-full mt-10">
          <Text className="mt-3 text-6xl text-white">{letter}</Text>
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
    // if no session was found, show non-logged-in screen
    return (
      <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
        <Image className="w-48 h-48 mb-10" source={image} />
        <CustomButton onPress={() => router.navigate('../(auth)/identify')}>
          Log in to view
        </CustomButton>
      </View>
    );
  }
}
