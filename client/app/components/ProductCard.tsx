import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { host } from '../constants';

const Card = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: '../(stack)/[details]',
          params: { id: props.product.id },
        });
      }}
    >
      <View className="my-3 w-11/12 self-center">
        <View className="h-40 border-x border-t rounded-t-3xl">
          <ImageBackground
            source={{ uri: `${host}/images/${props.product.id}.jpeg` }}
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
          <Text className="mt-3 text-3xl font-bold">{props.product.name}</Text>
          <Text className="mt-2 font-bold">{props.product.type}</Text>
          <Text className="mt-2">{props.product.address_line_one}</Text>
          <Text className="mt-2 mb-3">{props.product.city_district}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
