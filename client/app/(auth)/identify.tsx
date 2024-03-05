import { router, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, TextInput, TouchableRipple } from 'react-native-paper';
import CustomButton from '../components/CustomButton';
import { host } from '../constants';

export default function IdentifyScreen() {
  const local = useLocalSearchParams();
  const [countryName, setCountryName] = useState('Austria');
  const [countryCode, setCountryCode] = useState('+43');
  const [lineNumber, setLineNumber] = useState('');
  const [fullPhoneNumber, setFullPhoneNumber] = useState(null);
  // set country code on change.
  useEffect(() => {
    setCountryName(local.countryName);
    setCountryCode(local.countryCode);
  }, [local.countryName, local.countryCode]);
  useEffect(() => {
    setFullPhoneNumber(`${countryCode}${lineNumber}`);
  }, [lineNumber, countryCode]);
  // check user.
  const checkIfUserExists = async () => {
    const response = await fetch(`${host}/api/users/${fullPhoneNumber}`);
    console.log(response);
    const data = await response.json();
    console.log(data.exists);
    if (data.exists) {
      router.navigate({
        pathname: '/login',
        params: { fullPhoneNumber: fullPhoneNumber },
      });
    } else {
      router.navigate({
        pathname: '/signup',
        params: { fullPhoneNumber: fullPhoneNumber },
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <View className="items-center mt-10">
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
                outlineColor="rgb(30, 58, 138)"
                activeOutlineColor="rgb(59, 130, 246)"
                value={`${countryName} ${countryCode}`}
                right={<TextInput.Icon icon="chevron-down" />}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            className="bg-white text-left text-md w-11/12 my-3 border-blue border-blue"
            mode="outlined"
            inputMode="tel"
            label="Phone number"
            outlineColor="rgb(30, 58, 138)"
            activeOutlineColor="rgb(59, 130, 246)"
            value={lineNumber}
            onChangeText={(newText) => setLineNumber(newText)}
          />
          <View className="my-3 w-11/12">
            <CustomButton onPress={checkIfUserExists}>Continue</CustomButton>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
