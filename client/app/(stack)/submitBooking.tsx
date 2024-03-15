import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';
import checkLoginStatus from '../../util/sessions';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function SubmitBookingScreen() {
  // define local and state variables
  const local = useLocalSearchParams();
  const option = JSON.parse(local.option);
  const listing = JSON.parse(local.listing);
  const optionId = option.id;
  const experience = local.experience;
  const remarks = local.remarks;
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  //// START LOGIN SESSION CHECKING

  // ensure login-status is checked before setting isLoaded to false
  const [isLoginStatusChecked, setIsLoginStatusChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // check login status on every screen load
  useFocusEffect(() => {
    checkLoginStatus().then((status) => {
      setIsLoggedIn(status.isLoggedIn);
      setUserId(status.userId);
      setIsLoginStatusChecked(true);
      console.log('LOGIN STATUS:', status.isLoggedIn);
    });
  });

  //// END LOGIN SESSION CHECKING

  // call submitBooking api upon button click.
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
        params: { ...local, helperToTriggerUseEffect: Math.random() },
      });
    }
    setIsButtonLoading(false);
  };

  console.log(option.id);

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
              You're applying for the{' '}
              <Text className="font-bold">{option.name}</Text> role at{' '}
              <Text className="font-bold">{listing.name}</Text> in{' '}
              {listing.city_district}, {listing.city}. Please check and confirm
              your details before submitting.
            </Text>
            {/* // Input field. */}
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              disabled={true}
              mode="outlined"
              inputMode="text"
              label="First name"
              value="Donald"
              activeOutlineColor="#155e75"
            />
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              disabled={true}
              mode="outlined"
              inputMode="text"
              label="Last name"
              value="Duck"
              activeOutlineColor="#155e75"
            />
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              disabled={true}
              mode="outlined"
              inputMode="numeric"
              label="Phone number"
              value="+4312345"
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
