import { Cloudinary } from '@cloudinary/url-gen';
import { AntDesign } from '@expo/vector-icons';
import { AdvancedImage, upload } from 'cloudinary-react-native';
import * as ImagePicker from 'expo-image-picker';
import { router, useFocusEffect, usePathname } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
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
  const [avatar, setAvatar] = useState(avatarPlaceholderImage);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region image picker function

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsLoading(true);
      uploadPickedImage(result.assets[0].uri);
    }
  };

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region cloudinary image upload function

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dpa9tzkwg',
    },
    url: {
      secure: true,
    },
  });

  // Cloudinary options config
  const options = {
    upload_preset: 'jvjalr2t',
    unsigned: true,
  };

  // image upload function
  const uploadPickedImage = async (imagePath) => {
    await upload(cld, {
      file: imagePath,
      options: options,
      callback: (error: any, response: any) => {
        if (error) {
          console.log(error);
          setIsLoading(false);
          return {
            success: false,
            error: error,
          };
        } else {
          console.log({
            success: true,
            imageUrl: response.url,
          });
          storeImageUrl(response.url);
          return {
            success: true,
            imageUrl: response.url,
          };
        }
      },
    });
  };

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region store uploaded image URL in database

  const storeImageUrl = async (cloudinaryImageUrl) => {
    const imageRequest = await fetch(`${nextHost}/api/users`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: user.id,
        avatarUrl: cloudinaryImageUrl,
      }),
    }).catch(console.error);
    const imageResponse = await imageRequest.json();
    setAvatar({ uri: cloudinaryImageUrl });
    setIsLoading(false);
    console.log(imageResponse);
  };

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
                if (user.avatar_image) {
                  setAvatar({ uri: user.avatar_image });
                } else {
                  setAvatar(avatarPlaceholderImage);
                }
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
              <Pressable onPress={pickImage}>
                <View className="h-24 w-24 mr-3 items-end">
                  <Image className="h-24 w-24 rounded-full" source={avatar} />
                  <View className="h-7 w-7 rounded-full items-center justify-center -mt-7 mr-1 bg-white">
                    <Text>
                      <AntDesign name="camerao" color="grey" size={17} />
                    </Text>
                  </View>
                </View>
              </Pressable>
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
              params: { entryPoint: `${path}` },
            });
          }}
        >
          Log in to view
        </CustomButton>
      </View>
    );
  }
}
