import React from 'react';
import { Image, Text, View } from 'react-native';
import { nextHost } from '../constants';

export default function PostingCard() {
  return (
    <View className="w-11/12 my-2 self-center">
      <View className="h-24 flex-row">
        <View className="h-24 w-24 mr-3">
          <Image
            className="flex-1 rounded-xl"
            source={{ uri: `${nextHost}/hero_images/3.jpeg` }}
          />
        </View>
        <View className="justify-center">
          <Text className="text-lg font-bold">ølhavn by Schalken</Text>
          <Text>Brewpub in Vienna</Text>
          <Text>Added on 13 Mar 2024</Text>
        </View>
      </View>
    </View>
  );
}
