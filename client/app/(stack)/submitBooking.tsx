import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  usePathname,
} from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import checkLoginStatus from '../../util/sessions';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function SubmitBookingScreen() {
  // -------------------------------------------
  // #region variables

  const local = useLocalSearchParams();
  const option = local.option ? JSON.parse(local.option) : null;
  const listing = local.listing ? JSON.parse(local.listing) : null;
  const optionId = option ? option.id : null;
  const experience = local.experience ? local.experience : null;
  const remarks = local.remarks ? local.remarks : null;
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // -------------------------------------------
  // #endregion

  // -------------------------------------------
  // #region submit booking function

  const submitBooking = async () => {
    setIsButtonLoading(true);
    const bookingRequest = await fetch(`${nextHost}/api/bookings`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        optionId,
        experience,
        remarks,
      }),
    }).catch(console.error);
    const bookingResponse = await bookingRequest.json();
    console.log('BOOKING API:', bookingResponse.message);

    // check if booking was created successfully
    if (bookingResponse.success) {
      // redirect to login screen
      router.navigate({
        pathname: '/myBookings',
        params: { ...local, helperToTriggerMyBookingsUseEffect: Math.random() },
      });
    }
    setIsButtonLoading(false);
  };

  // -------------------------------------------
  // #endregion

  // -------------------------------------------
  // #region check login status & do something

  const path = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // do something if screen is focussed
      // console.log('Submit booking screen focussed!');
      const checkIfLoggedIn = async () => {
        try {
          const status = await checkLoginStatus(path);
          if (status.isLoggedIn) {
            // do something if user is logged in.
            if (!option || !listing) {
              // check for error case "option is null"
              router.back();
              Toast.show({
                type: 'error',
                text1: 'No option selected!',
              });
            } else {
              setIsLoading(false);
              setUserId(status.userId);
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
        // console.log('Submit booking screen unfocussed!');
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <View className="items-center">
          {/* // Progressbar */}
          <View className="flex-1 w-11/12 mb-10">
            <ProgressBar progress={0.9} color="#155e75" />
          </View>
        </View>
        {/* // Progressbar */}
        <ScrollView>
          <View className="items-center">
            <Text className="w-11/12 my-3">
              Make sure all the details are correct before submitting your
              application.
            </Text>
            {/* // Input field. */}
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              disabled={true}
              mode="outlined"
              inputMode="text"
              label="Role"
              value={option.name}
              activeOutlineColor="#155e75"
            />
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              disabled={true}
              mode="outlined"
              inputMode="text"
              label="Venue"
              value={listing.name}
              activeOutlineColor="#155e75"
            />
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              disabled={true}
              mode="outlined"
              inputMode="text"
              label="Location"
              value={`${listing.city_district}, ${listing.city}`}
              activeOutlineColor="#155e75"
            />
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              disabled={true}
              mode="outlined"
              inputMode="text"
              label="Wage"
              value={`${option.price} ${option.currency} per hour`}
              activeOutlineColor="#155e75"
            />
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              disabled={true}
              mode="outlined"
              inputMode="tel"
              label="Years of experience in role"
              value={local.experience}
              activeOutlineColor="#155e75"
            />
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              disabled={true}
              mode="outlined"
              inputMode="text"
              label="Tell us why you are the best fit"
              value={local.remarks}
              activeOutlineColor="#155e75"
            />
            <View className="my-3 w-11/12">
              {isButtonLoading ? (
                <CustomButton disabled={true}>...</CustomButton>
              ) : (
                <CustomButton onPress={submitBooking}>Submit</CustomButton>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
