import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import { host } from '../constants';

export default function IdentifyScreen() {
  const local = useLocalSearchParams();
  const [countryName, setCountryName] = useState('Austria');
  const [countryCode, setCountryCode] = useState('+43');
  const [lineNumber, setLineNumber] = useState('');
  // username consists of country code + line number.
  const [username, setUsername] = useState(null);

  // update country code or country name if the user updates it.
  useEffect(() => {
    setCountryName(local.countryName);
    setCountryCode(local.countryCode);
  }, [local.countryName, local.countryCode]);

  // update username if linenumber or country code change.
  useEffect(() => {
    setUsername(`${countryCode}${lineNumber}`);
  }, [lineNumber, countryCode]);

  // login function to send otp and redirect to verify screen
  const [sentOtp, setSentOtp] = useState('');
  const sendOTP = async () => {
    const response = await fetch(`${host}/api/users/generate_otp/${username}`);
    const result = await response.json();
    console.log(result);
    setSentOtp(result.message);
    if (result.success) {
      router.navigate({
        pathname: '/verify',
        params: { username: username },
      });
    } else {
      console.log('Error sending OTP. Not redirected!');
    }
  };

  // check if user exists and route to login or signup screen.
  const checkIfUserExists = async () => {
    const response = await fetch(`${host}/api/users/${username}`);
    console.log(response);
    const data = await response.json();
    console.log(data.message);
    if (data.exists) {
      // send OTP and direct to verify screen if sending success
      sendOTP();
      // commented out: plain redirect to interim login screen
      // router.navigate({
      //   pathname: '/login',
      //   params: { username: username },
      // });
    } else {
      router.navigate({
        pathname: '/signup',
        params: { username: username },
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <View className="items-center">
          {/* // Progressbar */}
          <View className="flex-1 w-11/12 mb-10">
            <ProgressBar progress={0.25} color="#155e75" />
          </View>
          {/* // Progressbar */}
          {/* // Input field. */}
          <TouchableOpacity
            className="w-11/12 my-3"
            onPress={() => {
              router.navigate({
                pathname: '../(auth)/countrySelection',
                params: { countryName: countryName, countryCode: countryCode },
              });
            }}
          >
            <View pointerEvents={'none'}>
              <TextInput
                className="bg-white text-left text-md"
                mode="outlined"
                label="Country/Region"
                activeOutlineColor="#155e75"
                value={`${countryName} ${countryCode}`}
                right={<TextInput.Icon icon="chevron-down" />}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            className="bg-white text-left text-md w-11/12 my-3"
            mode="outlined"
            inputMode="tel"
            label="Phone number"
            activeOutlineColor="#155e75"
            value={lineNumber}
            onChangeText={(newText) => setLineNumber(newText)}
          />
          <View className="my-3 w-11/12">
            <CustomButton onPress={checkIfUserExists}>Continue</CustomButton>
          </View>
          <Text>{sentOtp}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
