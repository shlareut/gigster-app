import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { host } from '../constants';

export default function ProfileScreen() {
  // check for username in local params
  const local = useLocalSearchParams();
  const image = require('../../assets/profile.jpg');
  if (local.username) {
    // user state as object
    const [user, setUser] = useState({});
    const [letter, setLetter] = useState('P');
    // function to query user details
    useEffect(() => {
      const fetchUser = async () => {
        const response = await fetch(`${host}/api/users/${local.username}`);
        const user = await response.json();
        setUser(user.details);
        setLetter(user.details.first_name[0]);
      };
      fetchUser().catch(console.error);
    }, []);
    // if local.username, query DB for user and show logged-in screen
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
        <View className="my-auto">
          <CustomButton onPress={() => alert('Work in progress!')}>
            Log out
          </CustomButton>
        </View>
      </View>
    );
  }
  // if no local.username, show non-logged-in screen
  return (
    <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
      <Image className="w-48 h-48 my-10" source={image}></Image>
      <CustomButton onPress={() => router.navigate('../(auth)/identify')}>
        Log in to view
      </CustomButton>
    </View>
  );
}
