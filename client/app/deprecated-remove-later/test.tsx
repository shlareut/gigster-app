import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, upload } from 'cloudinary-react-native';
import * as ImagePicker from 'expo-image-picker';
import { router, useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import checkLoginStatus from '../../util/sessions';
import CustomButton from '../components/CustomButton';
import { nextHost } from '../constants';

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dpa9tzkwg',
  },
  url: {
    secure: true,
  },
});

export default function TestScreen() {
  const [image, setImage] = useState(null);
  // const image =
  //   'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';
  const getImageUrl = async () => {
    const imageRequest = await fetch(`${nextHost}/api/users/avatar`, {
      method: 'POST',
      body: JSON.stringify({
        userId: 1,
        image: image,
      }),
    }).catch(console.error);
    const imageResponse = await imageRequest.json();
    console.log(imageResponse);
  };

  // cloudinary image upload

  const options = {
    upload_preset: 'jvjalr2t',
    unsigned: true,
  };

  const uploadImage = async () => {
    await upload(cld, {
      file: image,
      options: options,
      callback: (error: any, response: any) => {
        console.log(error);
        console.log(response);
      },
    });
  };

  // end

  // post image and store URL

  const updateAvatar = async () => {
    await upload(cld, {
      file: image,
      options: options,
      callback: (error: any, response: any) => {
        if (error) {
          console.log(error);
          return {
            success: false,
            error: error,
          };
        } else {
          console.log({
            success: true,
            imageUrl: response.url,
          });
          storeAvatar(response.url);
          return {
            success: true,
            imageUrl: response.url,
          };
        }
      },
    });
  };

  const storeAvatar = async (image) => {
    const imageRequest = await fetch(`${nextHost}/api/users`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: 5,
        avatarUrl: image,
      }),
    }).catch(console.error);
    const imageResponse = await imageRequest.json();
    console.log(imageResponse);
  };

  const manuallyUpdateImage = async () => {
    const imageRequest = await fetch(`${nextHost}/api/users`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: 5,
        avatarUrl:
          'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg',
      }),
    }).catch(console.error);
    const imageResponse = await imageRequest.json();
    console.log(imageResponse);
  };

  // end

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <CustomButton
        onPress={() => {
          router.navigate({
            pathname: '/identify',
            params: { entryPoint: '/myProfile' },
          });
        }}
      >
        Identify screen
      </CustomButton>
      <CustomButton
        onPress={() => {
          router.navigate({
            pathname: '/login',
            params: { entryPoint: '/myProfile' },
          });
        }}
      >
        Login screen
      </CustomButton>
      <CustomButton
        onPress={() => {
          router.navigate({
            pathname: '/signup',
            params: { entryPoint: '/myProfile' },
          });
        }}
      >
        Signup screen
      </CustomButton>
      <CustomButton
        onPress={() => {
          router.navigate({
            pathname: '/startBooking',
            params: { entryPoint: '/myProfile' },
          });
        }}
      >
        Booking screen
      </CustomButton>
      <CustomButton
        onPress={() => {
          router.navigate({
            pathname: '/submitBooking',
            params: { entryPoint: '/myProfile' },
          });
        }}
      >
        Submit booking screen
      </CustomButton>
      <CustomButton onPress={pickImage}>Pick image</CustomButton>
      <CustomButton onPress={updateAvatar}>Upload image</CustomButton>
      {/* // Loading animation */}
      <LottieView
        style={{ width: '25%', height: '25%' }}
        source={require('../../assets/loadingAnimation.json')}
        autoPlay
        loop
      />
      {/* // LISTING CARD */}
      <View className={`w-11/12 my-3 self-center opacity-50`}>
        <View className="w-full h-auto aspect-square">
          <Image
            className="flex-1 rounded-3xl"
            source={{
              uri: `${nextHost}/hero_images/1.jpeg`,
            }}
          />
        </View>
        <View className="mt-3">
          <Text className="text-xl font-bold">Café Menta</Text>
          <Text className="text-base">Café in Landstraße, Vienna</Text>
          <Text className="text-base underline">
            <Text>From </Text>
            <Text className="font-bold">15.50 EUR</Text> per hour
          </Text>
        </View>
      </View>
      {/* BOOKING CARD */}
      <View className="w-11/12 my-3 self-center">
        <View className="items-center h-fit flex-row">
          <View className="h-24 w-24 mr-3">
            <Image
              className="flex-1 rounded-xl"
              source={{
                uri: `${nextHost}/hero_images/1.jpeg`,
              }}
            />
          </View>
          <View className="flex-1 gap-0.5">
            <Text className="text-base font-bold">Option name</Text>
            <Text>Listing name</Text>
            <Text className="text-xs text-gray-500">Applied on date</Text>
            <View className="pt-1">
              <Text>Status</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
