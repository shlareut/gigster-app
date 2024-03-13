import { router, useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { ProgressBar, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import { host, nextHost } from '../constants';

export default function LoginScreen() {
  // define local and state variables.
  const local = useLocalSearchParams();
  const username = local.username;
  const [typedOtp, setTypedOtp] = useState('');

  // call "create otp" API upon screen load.
  useEffect(() => {
    const createOtp = async () => {
      // call create OTP api
      const request = await fetch(`${nextHost}/api/auth/otp/create`, {
        method: 'POST',
        body: JSON.stringify({
          username,
        }),
      }).catch(console.error);
      const response = await request.json();
      console.log('CREATE OTP API:', response.message);
      // if successful, send sms to user
      // PLACEHOLDER!
      // PLACEHOLDER!
      // PLACEHOLDER!
    };
    createOtp();
  }, []);

  // call "verify otp" API upon button click.
  const verify = async () => {
    // call verify api
    const verifyRequest = await fetch(`${nextHost}/api/auth/otp/verify`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        typedOtp,
      }),
    }).catch(console.error);
    const verifyResponse = await verifyRequest.json();
    console.log('VERIFY OTP API:', verifyResponse.message);

    // check if verify returns a success or not.
    if (verifyResponse.success) {
      // if success, call login API to create a session
      // Q: should login api verify the otp again?
      const loginRequest = await fetch(`${nextHost}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          username,
        }),
      }).catch(console.error);
      const loginResponse = await loginRequest.json();
      console.log('LOGIN API:', loginResponse.message);

      // check if login was successful.
      if (loginResponse.success) {
        // if login success, redirect to profile screen
        router.navigate({
          pathname: '../(tabs)/profile',
          params: { username: local.username },
        });
      }
    }
  };

  // show screen content.
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <View className="items-center">
          {/* // Progressbar */}
          <View className="flex-1 w-11/12 mb-10">
            <ProgressBar progress={0.9} color="#155e75" />
          </View>
          {/* // Progressbar */}
          <Text className="w-11/12 my-3">
            A 6-digit code is on its way to{' '}
            <Text className="font-bold">{local.username}</Text>. Please enter it
            below to continue.
          </Text>
          <View className="w-9/12 my-3">
            <OtpInput
              numberOfDigits={6}
              autoComplete="one-time-code"
              focusColor="#155e75"
              focusStickBlinkingDuration={500}
              onTextChange={(newText) => setTypedOtp(newText)}
            />
          </View>
          <View className="w-11/12 my-3">
            <CustomButton onPress={verify}>Verify now</CustomButton>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
