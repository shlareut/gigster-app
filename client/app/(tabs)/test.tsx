import { router, useFocusEffect } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import checkLoginStatus from '../../util/sessions';
import CustomButton from '../components/CustomButton';
import { nextHost } from '../constants';

export default function TestScreen() {
  return (
    <>
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
