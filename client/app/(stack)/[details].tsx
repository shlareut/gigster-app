import { Link, router, useLocalSearchParams } from 'expo-router';
import { styled } from 'nativewind';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { host } from '../constants';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [listing, setListing] = useState({});
  useEffect(() => {
    const loadVenue = async () => {
      const response = await fetch(`${host}/api/listings/${id}/`);
      const listing = await response.json();
      console.log(listing);
      setListing(listing);
    };
    loadVenue().catch(console.error);
  }, [id]);

  if (!listing) {
    return null;
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <Image
          className="w-screen h-60"
          source={{ uri: `${host}/images/${listing.id}.jpeg` }}
        />
        <View className="my-4 mx-3">
          <Text className="text-3xl font-bold">{listing.name}</Text>
          <Text className="mt-2 font-bold">{listing.type}</Text>
          <View className="flex-row mt-2 justify-between">
            <Text className="w-3/6">
              {listing.address_line_one},{' '}
              {listing.address_line_two ? `${listing.address_line_two}, ` : ''}
              {listing.city_district}, {listing.postal_code} {listing.city}
            </Text>
            <Pressable
              className="active:opacity-50"
              onPress={() => alert('Google map in progress!')}
            >
              <Text className="font-bold text-blue-900">Open map</Text>
            </Pressable>
          </View>
          <View className="my-5 border-t border-gray-200"></View>
          <Text className="text-justify">{listing.description}</Text>
        </View>
      </ScrollView>
      <View className="h-28 border-t border-gray-200">
        <View className="self-end my-4 mx-3 align">
          <CustomButton onPress={() => router.navigate('../(auth)/identify')}>
            Log in to book
          </CustomButton>
        </View>
      </View>
    </View>
    // <SafeAreaView style={styles.mainWrapper}>
    //   <View style={styles.productWrapper}>
    //     <Text>{listing.name}</Text>
    //     <Text>{JSON.stringify(listing)}</Text>
    //     <Link href="/">Click me!</Link>
    //   </View>
    // </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   productWrapper: {
//     // marginTop: '25%',
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
// });

// style={({pressed}) => [
//   {
//     backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
//   },
//   styles.wrapperCustom,
// ]}>
