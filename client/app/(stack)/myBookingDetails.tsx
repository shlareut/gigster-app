import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  usePathname,
} from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, Modal, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import checkLoginStatus from '../../util/sessions';
import BookingStatusDisplay from '../components/BookingStatusDisplay';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function MyBookingDetailsScreen() {
  // -------------------------------------------
  // #region variables

  const booking = useLocalSearchParams();
  const avatarPlaceholderImage = require('../../assets/avatar.jpg');

  // -------------------------------------------
  // #endregion

  // -------------------------------------------
  // #region check login status & do something

  const path = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // do something if screen is focussed
      // console.log('Booking details screen focussed!');
      const checkIfLoggedIn = async () => {
        try {
          const status = await checkLoginStatus(path);
          if (status.isLoggedIn) {
            // do something if user is logged in.
            if (!booking) {
              // check for error case "booking is null"
              router.back();
              Toast.show({
                type: 'error',
                text1: 'No option selected!',
              });
            } else {
              setIsLoading(false);
            }
          } else {
            // do something if NOT logged in
            router.back();
            Toast.show({
              type: 'error',
              text1: 'You are not logged in!',
            });
          }
        } catch (error) {
          console.error;
        }
      };
      checkIfLoggedIn();
      // do something if screen is UNfocussed
      return () => {
        // console.log('Booking details screen unfocussed!');
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
        <View className="w-11/12 my-3 mt-10 self-center">
          <View className="items-center h-fit flex-row">
            <View className="h-24 w-24 mr-3">
              <Image
                className="flex-1 rounded-lg"
                source={{
                  uri: `${nextHost}/hero_images/${booking.listing_id}.jpeg`,
                }}
              />
            </View>
            <View className="flex-1 gap-0.5">
              <Text className="text-base font-bold">{booking.option_name}</Text>
              <Text>{booking.listing_name}</Text>
              <Text className="text-xs text-gray-500">
                Applied on {booking.date}
              </Text>
              <View className="pt-1">
                <BookingStatusDisplay status={booking.status} />
              </View>
            </View>
          </View>
        </View>
        <View className="my-8 border-t-8 border-gray-100"></View>
        <View className="w-11/12 my-3 self-center">
          <View className="my-3">
            <Text className="text-lg font-semibold">Experience</Text>
            <Text className="">{booking.experience} years</Text>
          </View>
          <View className="my-3">
            <Text className="text-lg font-semibold">Message to employer</Text>
            <Text className="">{booking.remarks}</Text>
          </View>
          <View className="my-10">
            <CustomButton onPress={() => {}}>Edit</CustomButton>
          </View>
          <View className="mb-10">
            <CustomButton onPress={() => {}}>Cancel</CustomButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
