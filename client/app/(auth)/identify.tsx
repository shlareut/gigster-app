import { router, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  // useEffect(() => {
  //   const checkIfUserExists = async () => {
  //     const response = await fetch(`${host}/api/users/${fullPhoneNumber}`);
  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data.exists);
  //   };
  //   checkIfUserExists().catch(console.error);
  // }, [fullPhoneNumber]);
  return (
    <View className="flex-1 bg-white">
      <View className="items-center mt-10">
        {/* // Input field. */}
        <View className="w-11/12 my-3">
          <Text className="text-base font-bold mb-1">Country/Region</Text>
          <TouchableOpacity
            onPress={() => {
              router.navigate({
                pathname: '../(auth)/countrySelection',
                params: { countryName: countryName, countryCode: countryCode },
              });
            }}
          >
            <View className="text-left border rounded-md text-md pb-2 py-3 px-3 border-blue-900">
              <Text>
                {countryName} ({countryCode})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="w-11/12 my-3">
          <Text className="text-base font-bold mb-1">Phone number</Text>
          <TextInput
            className="text-left border rounded-md text-md pb-2 py-3 px-3 border-blue-900 focus:border-blue-500"
            placeholder="12345678"
            inputMode="tel"
            value={lineNumber}
            onChangeText={(newText) => setLineNumber(newText)}
          />
        </View>
        <Text>Typed: {lineNumber}</Text>
        <Text>Applied: {fullPhoneNumber}</Text>
        <View className="mt-10">
          <CustomButton onPress={checkIfUserExists}>Continue</CustomButton>
        </View>
      </View>
    </View>
  );
}
