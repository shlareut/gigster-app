import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import { host } from '../constants';

export default function LoginScreen() {
  const local = useLocalSearchParams();
  // const [result, setResult] = useState('');
  // const [isValid, setIsValid] = useState(null);
  // const [sentOtp, setSentOtp] = useState('');
  const sendOTP = async () => {
    const response = await fetch(
      `${host}/api/users/generate_otp/${local.username}`,
    );
    const result = await response.json();
    console.log(result);
    // setSentOtp(result.message);
    if (result.success) {
      router.navigate({
        pathname: '/verify',
        params: { username: local.username },
      });
    } else {
      console.log('Error sending OTP. Not redirected!');
    }
  };
  // const validateOTP = async () => {
  //   const response = await fetch(
  //     `${host}/api/users/validate_otp/${local.username}?otp=${otp}`,
  //   );
  //   const result = await response.json();
  //   console.log(result);
  //   setIsValid(result.message);
  // };
  // COULD REMOVE ENTIRE SCREEN AND JUST LAND ON OTP VERIFY SCREEN
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <View className="items-center">
          {/* // Progressbar */}
          <View className="flex-1 w-11/12 mb-10">
            <ProgressBar progress={0.6} color="#155e75" />
          </View>
          {/* // Progressbar */}
          <Text className="w-11/12 my-3">
            You're logging in with:{' '}
            <Text className="font-bold">{local.username}</Text>
          </Text>
          {/* <TextInput
            className="bg-white text-left text-md w-11/12 my-3 border-blue border-blue"
            mode="outlined"
            inputMode="tel"
            label="OTP"
            outlineColor="rgb(30, 58, 138)"
            activeOutlineColor="rgb(59, 130, 246)"
            value={otp}
            onChangeText={(newText) => setOtp(newText)}
          /> */}
          <View className="w-11/12 my-3">
            <CustomButton onPress={sendOTP}>Send OTP</CustomButton>
          </View>
          {/* <Text>{result}</Text> */}
          {/* <View className="w-11/12 my-3">
            <CustomButton onPress={validateOTP}>Validate</CustomButton>
          </View>
          <Text>{isValid}</Text> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
