import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  usePathname,
} from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import checkLoginStatus from '../../util/sessions';
import BookingStatusDisplay from '../components/BookingStatusDisplay';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function MyBookingDetailsScreen() {
  // -------------------------------------------
  // #region variables

  // if I update booking on this screen, it can't be local search params, I will need to query it on the spot!
  const booking = useLocalSearchParams();
  const [isDisabled, setIsDisabled] = useState(true);
  const [newExperience, setNewExperience] = useState(booking.experience);
  const [newRemarks, setNewRemarks] = useState(booking.remarks);
  const heroImageUri =
    booking.listing_id < 7
      ? `${nextHost}/hero_images/${booking.listing_id}.jpeg`
      : `${nextHost}/hero_images/placeholder.jpeg`;
  const heroImage = { uri: heroImageUri };

  // -------------------------------------------
  // #endregion

  // -------------------------------------------
  // #region update booking details function

  const updateBooking = async () => {
    const updateBookingRequest = await fetch(`${nextHost}/api/bookings`, {
      method: 'PUT',
      body: JSON.stringify({
        bookingId: booking.id,
        experience: newExperience,
        remarks: newRemarks,
      }),
    }).catch(console.error);
    const updateBookingResponse = await updateBookingRequest.json();
    if (updateBookingResponse.success) {
      console.log('Success', updateBookingResponse.message);
      router.back();
      Toast.show({
        type: 'success',
        text1: 'Booking updated!',
      });
    } else {
      console.log('Failed', updateBookingResponse.message);
    }
  };

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region cancel booking function

  const cancelBooking = async () => {
    const cancelBookingRequest = await fetch(`${nextHost}/api/bookings`, {
      method: 'PATCH',
      body: JSON.stringify({
        bookingId: booking.id,
        status: 'CANCELLED',
      }),
    }).catch(console.error);
    const cancelBookingResponse = await cancelBookingRequest.json();
    if (cancelBookingResponse.success) {
      console.log('Success:', cancelBookingResponse.message);
      router.back();
      Toast.show({
        type: 'success',
        text1: 'Booking cancelled!',
      });
    } else {
      console.log('Failed:', cancelBookingResponse.message);
    }
  };

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region check login status & do something

  const path = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // do something if screen is focussed
      // console.log('Booking details screen focussed!');
      const checkIfLoggedIn = async () => {
        setIsLoading(true);
        try {
          const status = await checkLoginStatus(path);
          if (status.isLoggedIn) {
            // do something if user is logged in.
            if (!booking) {
              // check for error case "booking is null"
              router.back();
              Toast.show({
                type: 'error',
                text1: 'No booking selected!',
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
              <Image className="flex-1 rounded-lg" source={heroImage} />
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
          {/* <View className="my-3">
            <Text className="text-lg font-semibold">Experience</Text>
            <Text className="">{booking.experience} years</Text>
          </View>
          <View className="my-3">
            <Text className="text-lg font-semibold">Message to employer</Text>
            <Text className="">{booking.remarks}</Text>
          </View> */}
          <TextInput
            className="bg-white text-left text-md my-3"
            disabled={isDisabled}
            mode="outlined"
            inputMode="tel"
            label="Years of experience in role"
            value={newExperience}
            onChangeText={(newText) => setNewExperience(newText)}
            activeOutlineColor="#155e75"
          />
          <TextInput
            className="bg-white text-left text-md my-3"
            disabled={isDisabled}
            mode="outlined"
            inputMode="text"
            label="Message to employer"
            value={newRemarks}
            onChangeText={(newText) => setNewRemarks(newText)}
            activeOutlineColor="#155e75"
          />
          <View className="my-10">
            {booking.status === 'CANCELLED' ? (
              ''
            ) : isDisabled ? (
              <CustomButton
                onPress={() => {
                  setIsDisabled(!isDisabled);
                }}
              >
                Edit
              </CustomButton>
            ) : booking.experience === newExperience &&
              booking.remarks === newRemarks ? (
              <CustomButton
                onPress={() => {
                  setIsDisabled(!isDisabled);
                }}
              >
                Abort
              </CustomButton>
            ) : (
              <CustomButton
                onPress={() => {
                  Alert.alert(
                    'Update application',
                    'You can change your application again.',
                    [
                      {
                        text: 'Go back',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes, update',
                        onPress: () => updateBooking(),
                      },
                    ],
                  );
                }}
              >
                Update
              </CustomButton>
            )}
          </View>
          <View className="mb-10">
            {booking.status === 'CANCELLED' ? (
              <CustomButton disabled={true}>Application cancelled</CustomButton>
            ) : (
              <CustomButton
                disabled={!isDisabled}
                onPress={() => {
                  Alert.alert(
                    'Cancel application',
                    'Are you sure? This action cannot be undone.',
                    [
                      {
                        text: 'Go back',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes, cancel',
                        onPress: () => cancelBooking(),
                      },
                    ],
                  );
                }}
              >
                Cancel application
              </CustomButton>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
