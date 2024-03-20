import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { nextHost } from '../constants';

const ListingCard = (props) => {
  const hiring = props.listing.options_count > 0;
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => {
        if (hiring) {
          router.navigate({
            pathname: '/listingDetails',
            params: { listingId: props.listing.id },
          });
        } else {
          alert("This venue isn't hiring at the moment.");
        }
      }}
    >
      <View
        className={`w-11/12 my-5 self-center ${hiring ? '' : 'opacity-25'}`}
      >
        <View className="w-full h-auto aspect-square">
          {/* <Image
            className="flex-1 rounded-xl"
            source={{
              uri: `${nextHost}/hero_images/${props.listing.id}.jpeg`,
            }}
          /> */}
          <ImageBackground
            source={{ uri: `${nextHost}/hero_images/${props.listing.id}.jpeg` }}
            className="flex-1"
            style={{
              borderRadius: '12',
              overflow: 'hidden',
            }}
          >
            {/* // interim logic to show urgent hire label */}
            {props.listing.options_count > 1 ? (
              <View className="rounded-3xl w-fit h-fit ml-3 mt-3 bg-white self-start">
                <Text className="mx-4 my-2 font-bold">Urgent hire</Text>
              </View>
            ) : (
              ''
            )}
          </ImageBackground>
        </View>
        <View className="mt-3">
          <Text className="text-xl font-bold">{props.listing.name}</Text>
          <Text className="text-base">
            {props.listing.type} in {props.listing.district},{' '}
            {props.listing.city}
          </Text>
          {/* // start distance */}
          <Text className="text-base">
            <AntDesign name="enviromento" size={15} />{' '}
            {props.listing.nearest_station_distance}m from{' '}
            {props.listing.nearest_station_type.toLowerCase()}{' '}
            {props.listing.nearest_station_name}
          </Text>
          {/* // start price */}
          {hiring ? (
            <Text className="text-base underline">
              <Text className="font-bold">
                {props.listing.options_count > 1 ? 'From ' : ''}
                {''}
                {props.listing.min_price} {props.listing.currency}
              </Text>{' '}
              per hour
            </Text>
          ) : (
            <Text className="text-base underline">Currently not hiring</Text>
          )}
          {/* // end price */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListingCard;
