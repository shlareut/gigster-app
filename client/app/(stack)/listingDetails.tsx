import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  usePathname,
} from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import openMap from 'react-native-open-maps';
import checkLoginStatus from '../../util/sessions';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function DetailsScreen() {
  // -------------------------------------------
  // #region variables

  const path = usePathname();
  const local = useLocalSearchParams();
  const [listing, setListing] = useState({});
  const [options, setOptions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region open device map function

  const openMapsApp = () => {};

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region check login status & fetch details

  useFocusEffect(
    useCallback(() => {
      // do something if screen is focussed
      // console.log('details screen focussed!');
      const fetchDetails = async () => {
        try {
          // check online status
          const status = await checkLoginStatus(path);
          // fetch details
          const listingsRequest = await fetch(
            `${nextHost}/api/listings/${local.listingId}`,
          );
          const listingResponse = await listingsRequest.json();
          // fetch options
          const optionsRequest = await fetch(
            `${nextHost}/api/listings/${local.listingId}/options`,
          );
          const optionsResponse = await optionsRequest.json();
          // set state variables
          setListing(listingResponse);
          setOptions(optionsResponse);
          setIsLoggedIn(status.isLoggedIn);
          setIsLoading(false);
        } catch (error) {
          console.error;
        }
      };
      fetchDetails();
      // do something if screen is UNfocussed
      return () => {
        // console.log('details screen unfocussed!');
      };
    }, []),
  );

  // loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }
  // #endregion
  // -------------------------------------------

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <Image
          className="w-screen h-60"
          source={{ uri: `${nextHost}/hero_images/${listing.id}.jpeg` }}
        />
        <View className="my-5 mx-3">
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
              onPress={() =>
                openMap({
                  query: `${listing.name}, ${listing.postal_code}, ${listing.city}`,
                  provider: 'google',
                })
              }
            >
              <Text className="font-bold text-cyan-800">Open map</Text>
            </Pressable>
          </View>
          <View className="my-5 border-t border-gray-100"></View>
          <Text>{listing.description}</Text>
        </View>
        <View className="my-5 border-t-8 border-gray-100"></View>
        <View className="my-5 mx-3">
          {options.length > 0 ? (
            <View>
              <Text className="text-xl font-bold mb-10">Available roles</Text>
              {/* // option rendering */}
              {options.map((option) => (
                <View className="" key={option.id}>
                  <Text className="mb-5 text-lg font-semibold">
                    {option.name}
                  </Text>
                  <Text className="mb-5">{option.description}</Text>
                  <View className="flex-row items-center justify-between">
                    <View className="items-end py-1">
                      <Text className="text-lg font-bold">
                        {option.price} {option.currency}
                      </Text>
                      <Text className="">per hour</Text>
                    </View>
                    {/* // conditional button rendering */}
                    {isLoggedIn ? (
                      <CustomButton
                        onPress={() =>
                          router.navigate({
                            pathname: '/startBooking',
                            params: {
                              entryPoint: `${path}`,
                              listingId: local.listingId,
                              listing: JSON.stringify(listing),
                              option: JSON.stringify(option),
                            },
                          })
                        }
                      >
                        Apply now
                      </CustomButton>
                    ) : (
                      <CustomButton
                        onPress={() =>
                          router.navigate({
                            pathname: '/identify',
                            params: {
                              entryPoint: `${path}`,
                              listingId: local.listingId,
                            },
                          })
                        }
                      >
                        Log in to apply
                      </CustomButton>
                    )}
                  </View>
                  <View className="my-10 border-t border-gray-200"></View>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-xl font-bold mb-10">No roles available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
