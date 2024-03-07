import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { MD3Colors, ProgressBar, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import { host } from '../constants';

export default function SignUpScreen() {
  const local = useLocalSearchParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const sendOTP = async () => {
    const response = await fetch(
      `${host}/api/users/generate_otp/${local.username}?firstName=${firstName}&lastName=${lastName}`,
    );
    const result = await response.json();
    console.log(result);
    setSentOtp(result.message);
    if (result.success) {
      router.navigate({
        pathname: '/verify',
        params: {
          username: local.username,
          // firstName: firstName,
          // lastName: lastName,
        },
      });
    } else {
      console.log('Error sending OTP. Not redirected!');
      Toast.show({
        type: 'error',
        text1: 'Error sending OTP!',
      });
    }
  };
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
            You're signing up with{' '}
            <Text className="font-bold">{local.username}</Text>. Please enter
            your first and last name as per your ID card or passport for a
            seamless experience.
          </Text>
          <TextInput
            className="bg-white text-left text-md w-11/12 my-3 border-blue border-blue"
            mode="outlined"
            label="First name"
            activeOutlineColor="#155e75"
            value={firstName}
            onChangeText={(newText) => setFirstName(newText)}
          />
          <TextInput
            className="bg-white text-left text-md w-11/12 my-3 border-blue border-blue"
            mode="outlined"
            label="Last name"
            activeOutlineColor="#155e75"
            value={lastName}
            onChangeText={(newText) => setLastName(newText)}
          />
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
            <CustomButton onPress={sendOTP}>
              Send verification code
            </CustomButton>
          </View>
          <Text className="text-red-700">{sentOtp}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
