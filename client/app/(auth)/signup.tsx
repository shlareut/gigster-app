import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { MD3Colors, ProgressBar, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import { host, nextHost } from '../constants';

export default function SignUpScreen() {
  // define local and state variables
  const local = useLocalSearchParams();
  const username = local.username;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // call sign-up api upon button click.
  const signup = async () => {
    setIsButtonLoading(true);
    const signUpRequest = await fetch(`${nextHost}/api/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        firstName,
        lastName,
      }),
    }).catch(console.error);
    const signUpResponse = await signUpRequest.json();
    console.log('SIGNUP API:', signUpResponse.message);

    // check if it was successful
    if (signUpResponse.success) {
      // redirect to login screen
      router.navigate({
        pathname: '/login',
        params: { username: username },
      });
    }
    setIsButtonLoading(false);
  };

  // check if someone is already logged in, if yes, redirect!
  // // loading screen
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

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
          <View className="w-11/12 my-3">
            {isButtonLoading ? (
              <CustomButton disabled={true}>...</CustomButton>
            ) : (
              <CustomButton onPress={signup}>
                Send verification code
              </CustomButton>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
