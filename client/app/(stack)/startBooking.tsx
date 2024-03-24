import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  usePathname,
} from 'expo-router';
import React, { useCallback, useState } from 'react';
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

export default function BookingScreen() {
  // -------------------------------------------
  // #region  variables

  const local = useLocalSearchParams();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [experience, setExperience] = useState('');
  const [remarks, setRemarks] = useState('');

  // #endregion variables
  // -------------------------------------------

  // -------------------------------------------
  // #region check login status & do something

  const path = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // do something if screen is focussed
      // console.log('Booking screen focussed!');
      const checkIfLoggedIn = async () => {
        setIsLoading(true);
        try {
          const status = await checkLoginStatus(path);
          if (status.isLoggedIn) {
            // do something if user is logged in.
            if (!local.optionId || !local.listingId) {
              // check for error case "option is null"
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
        // console.log('Booking screen unfocussed!');
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
            <ProgressBar progress={0.5} color="#155e75" />
          </View>
        </View>
        {/* // Progressbar */}
        <ScrollView>
          <View className="items-center">
            <Text className="w-11/12 my-3">
              You're applying for the{' '}
              <Text className="font-bold">{local.optionName}</Text> role at{' '}
              <Text className="font-bold">{local.listingName}</Text> in{' '}
              {local.listingDistrict}, {local.listingCity}. Please enter your
              details below to complete your application.
            </Text>
            {/* // Input field. */}
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              mode="outlined"
              inputMode="numeric"
              label="Years of experience in role"
              value={experience}
              onChangeText={(newText) => setExperience(newText)}
              activeOutlineColor="#155e75"
            />
            <TextInput
              className="bg-white text-left text-md w-11/12 my-3"
              mode="outlined"
              multiline={true}
              inputMode="text"
              label="Message to employer"
              value={remarks}
              onChangeText={(newText) => setRemarks(newText)}
              activeOutlineColor="#155e75"
            />
            <View className="my-3 w-11/12">
              {isButtonLoading ? (
                <CustomButton disabled={true}>...</CustomButton>
              ) : (
                <CustomButton
                  onPress={() => {
                    router.navigate({
                      pathname: '/submitBooking',
                      params: {
                        ...local,
                        experience: experience,
                        remarks: remarks,
                      },
                    });
                  }}
                >
                  Continue
                </CustomButton>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
