import { router, useFocusEffect, usePathname } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import checkLoginStatus from '../../util/sessions';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function ProfileScreen() {
  // -------------------------------------------
  // #region variables
  const path = usePathname();
  const emptyScreenImage = require('../../assets/profile.jpg');
  const avatarPlaceholderImage = require('../../assets/avatar.jpg');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region logout function
  const logout = async () => {
    const logoutRequest = await fetch(`${nextHost}/api/auth/logout`).catch(
      console.error,
    );
    const logoutResponse = await logoutRequest.json();
    // console.log('LOGOUT API:', logoutResponse.message);
    // check if logout was successful.
    if (logoutResponse.success) {
      setUser(null);
      Toast.show({
        type: 'success',
        text1: 'Successfully logged out!',
      });
    }
  };
  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region check login status & do something

  useFocusEffect(
    useCallback(() => {
      // do something if screen is focussed
      // console.log('Profile screen focussed!');
      const checkIfLoggedIn = async () => {
        try {
          const status = await checkLoginStatus(path);
          if (status.isLoggedIn) {
            // do something if user is logged in.
            try {
              // fetch user details
              const userRequest = await fetch(
                `${nextHost}/api/users/id/${status.userId}`,
              );
              const user = await userRequest.json();
              if (user) {
                setUser(user);
                setIsLoading(false);
              }
            } catch (error) {
              console.error;
            }
            // console.log(status);
          } else {
            // do something if NOT logged in
            setUser(null);
            setIsLoading(false);
          }
        } catch (error) {
          console.error;
        }
      };
      checkIfLoggedIn();
      // do something if screen is UNfocussed
      return () => {
        // console.log('Profile screen unfocussed!');
      };
    }, []),
  );

  // loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }
  // #endregion
  // -------------------------------------------

  if (user) {
    return (
      <View className="flex-1 bg-white">
        <ScrollView>
          <View className="w-11/12 my-3 mt-10 self-center">
            <View className="items-center h-fit flex-row">
              <Image
                className="h-24 w-24 mr-3 rounded-full"
                source={avatarPlaceholderImage}
              />
              <View className="flex-1 gap-0.5">
                <Text className="text-base font-bold">
                  {user.first_name} {user.last_name}
                </Text>
                <Text>{user.username}</Text>
                <Text className="text-xs text-gray-500">
                  User id: {user.id}
                </Text>
              </View>
            </View>
            <View className="my-10">
              <CustomButton onPress={logout}>Log out</CustomButton>
            </View>
          </View>
        </ScrollView>
      </View>
      // <View className="flex-1 h-screen w-screen items-center bg-white">
      //   <View className="bg-cyan-800  w-32 h-32 justify-center items-center rounded-full mt-10">
      //     <Text className="mt-3 text-6xl text-white">{user.first_name[0]}</Text>
      //   </View>
      //   <Text className="mt-5 mb-10 text-lg">
      //     {user.first_name} {user.last_name}
      //   </Text>
      //   <Text>ID: {user.id}</Text>
      //   <Text>Phone: {user.username}</Text>
      //   <Text>Last login: {user.last_login}</Text>
      //   <View className="my-10">
      //     <CustomButton onPress={logout}>Log out</CustomButton>
      //   </View>
      // </View>
    );
  } else {
    // if user is null, show non-logged-in screen
    return (
      <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
        <Image className="w-48 h-48 mb-10" source={emptyScreenImage} />
        <CustomButton
          onPress={() => {
            router.navigate({
              pathname: '/identify',
              params: { entryPoint: '/myProfile' },
            });
          }}
        >
          Log in to view
        </CustomButton>
      </View>
    );
  }
}
