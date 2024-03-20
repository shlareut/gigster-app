import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { nextHost } from '../constants';
import BookingStatusDisplay from './BookingStatusDisplay';

export default function BookingCard(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        router.navigate({
          pathname: '/myBookingDetails',
          params: props.booking,
        });
      }}
    >
      <View className="w-11/12 my-5 self-center">
        <View className="items-center h-fit flex-row">
          <View className="h-24 w-24 mr-3">
            <Image
              className="flex-1 rounded-lg"
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
            <View className="pt-1">
              <BookingStatusDisplay status={props.booking.status} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
