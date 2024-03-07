import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import { host } from '../constants';

export default function VerifyScreen() {
  const local = useLocalSearchParams();
  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(null);
  const validateOTP = async () => {
    const response = await fetch(
      `${host}/api/users/validate_otp/${local.username}?otp=${otp}`,
    );
    const result = await response.json();
    console.log(result);
    setIsValid(result.message);
  };
  // THIS SHOULD REPLACE THE LOGIN.TSX SCREEN!
  // Need to redirect to this screen when sending OTP
  // Need to pass OTP from prev screen into this screen to verify it?? Maybe no, because OTP from user is stored in DB
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
