import React from 'react';
import { Image, Text, View } from 'react-native';
import { nextHost } from '../constants';

export default function BookingCard(props) {
  return (
    <View className="w-11/12 my-3 self-center">
      <View className="items-center h-fit flex-row">
        <View className="h-20 w-20 mr-3">
          <Image
            className="flex-1 rounded-xl"
            source={{
              uri: `${nextHost}/hero_images/${props.booking.listing_id}.jpeg`,
            }}
          />
        </View>
        <View className="flex-1 gap-0.5">
          <Text className="text-base font-bold">
            {props.booking.option_name}
          </Text>
          <Text>{props.booking.listing_name}</Text>
          <Text className="text-xs text-gray-500">
            Applied on {props.booking.date}
          </Text>
        </View>
      </View>
    </View>
  );
}
