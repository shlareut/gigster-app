import React from 'react';
import { Image, Text, View } from 'react-native';
import { nextHost } from '../constants';

export default function PostingCard() {
  return (
    <View className="w-11/12 my-3 self-center">
      <View className="items-center h-fit flex-row">
        <View className="h-20 w-20 mr-3">
          <Image
            className="flex-1 rounded-xl"
            source={{ uri: `${nextHost}/hero_images/3.jpeg` }}
          />
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="text-base font-bold">ølhavn by Schalken</Text>
          <Text>Bartender</Text>
          <Text className="text-xs text-gray-500">Applied on 13 Mar 2024</Text>
        </View>
      </View>
    </View>
  );
}
