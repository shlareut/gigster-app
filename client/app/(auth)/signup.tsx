import { router, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import { host } from '../constants';

export default function SignUpScreen() {
  const local = useLocalSearchParams();
  const [result, setResult] = useState('');
  const [otp, setOtp] = useState('');
  const sendOTP = async () => {
    const response = await fetch(
      `${host}/api/users/generate_otp/${local.fullPhoneNumber}`,
    );
    const result = await response.json();
    console.log(result);
    setResult(result.message);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <View className="items-center mt-10">
          <Text className="w-11/12 my-3">
            You're signing up with:{' '}
            <Text className="font-bold">{local.fullPhoneNumber}</Text>
          </Text>
          <TextInput
            className="bg-white text-left text-md w-11/12 my-3 border-blue border-blue"
            mode="outlined"
            inputMode="tel"
            label="OTP"
            outlineColor="rgb(30, 58, 138)"
            activeOutlineColor="rgb(59, 130, 246)"
            value={otp}
            onChangeText={(newText) => setOtp(newText)}
          />
          <View className="w-11/12 my-3">
            <CustomButton onPress={sendOTP}>Send OTP</CustomButton>
          </View>
          <Text>{result}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
