import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import { host } from '../constants';

export default function VerifyScreen() {
  const local = useLocalSearchParams();
  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(null);
  const validateOTP = async () => {
    const request = await fetch(
      `${host}/api/users/validate_otp/${local.username}?otp=${otp}`,
    );
    const response = await request.json();
    console.log(response);
    setIsValid(response.message);
    if (response.success) {
      // create session token and add to DB
      const createSessionRequest = await fetch(
        `${host}/api/create_session/${response.user_id}`,
      );
      const createSessionResponse = await createSessionRequest.json();
      // check if session was created successfully
      if (createSessionResponse.success) {
        // redirect to profile screen if yes
        router.navigate({
          pathname: '../(tabs)/profile',
          params: { username: local.username },
        });
      } else {
        // log error if not
        console.log(createSessionResponse.message);
      }
    }
  };
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
          <TextInput
            className="bg-white text-left text-md w-11/12 my-3 border-blue border-blue"
            mode="outlined"
            inputMode="tel"
            label="OTP"
            activeOutlineColor="#155e75"
            value={otp}
            onChangeText={(newText) => setOtp(newText)}
          />
          <View className="w-11/12 my-3">
            <CustomButton onPress={validateOTP}>Verify now</CustomButton>
          </View>
          <Text>{isValid}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
