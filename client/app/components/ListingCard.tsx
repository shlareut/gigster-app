import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { nextHost } from '../constants';

const ListingCard = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        router.navigate({
          pathname: '../(stack)/[details]',
          params: { id: props.listing.id },
        });
      }}
    >
      <View className="my-3 w-11/12 self-center">
        <View className="h-40 border-x border-t rounded-t-3xl">
          <ImageBackground
            source={{ uri: `${nextHost}/hero_images/${props.listing.id}.jpeg` }}
            className="flex-1"
            style={{
              borderTopLeftRadius: '25',
              borderTopRightRadius: '25',
              overflow: 'hidden',
            }}
          >
            <View className="rounded-xl w-fit h-fit mr-5 mt-5 border bg-white self-end">
              <Text className="mx-4 my-2 font-bold">NEW</Text>
            </View>
          </ImageBackground>
        </View>
        <View className="border rounded-b-3xl">
          <View className="my-4 mx-3">
            <Text className="text-3xl font-bold">{props.listing.name}</Text>
            <Text className="mt-2 font-bold">{props.listing.type}</Text>
            <Text className="mt-2">{props.listing.address_line_one}</Text>
            <Text className="mt-2">{props.listing.city_district}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListingCard;
