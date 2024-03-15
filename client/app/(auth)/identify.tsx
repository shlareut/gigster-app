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
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function IdentifyScreen() {
  // define local and state variables
  const local = useLocalSearchParams();
  const [countryName, setCountryName] = useState('Austria');
  const [countryCode, setCountryCode] = useState('+43');
  const [lineNumber, setLineNumber] = useState('');
  const [username, setUsername] = useState(null); // username consists of country code + line number.
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // update country code or country name if the user updates it.
  useEffect(() => {
    setCountryName(local.countryName);
    setCountryCode(local.countryCode);
  }, [local.countryName, local.countryCode]);

  // update username if linenumber or country code change.
  useEffect(() => {
    setUsername(`${countryCode}${lineNumber}`);
  }, [lineNumber, countryCode]);

  // identify existing users and direct to login screen, else direct to sign-up screen
  const identify = async () => {
    setIsButtonLoading(true);
    const identifyRequest = await fetch(
      `${nextHost}/api/auth/identify/${username}`,
    );
    const identifyResponse = await identifyRequest.json();
    console.log('IDENTIFY API:', identifyResponse.message);
    // direct to login or sign up.
    if (identifyResponse.newUser) {
      // redirect to sign up screen.
      router.navigate({
        pathname: '/signup',
        params: { ...local, username: username },
      });
    } else {
      // redirect to login screen.
      router.navigate({
        pathname: '/login',
        params: { ...local, username: username },
      });
    }
    setIsButtonLoading(false);
  };

  // check if someone is already logged in, if yes, redirect!
  // // loading screen
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  // Logging params for testing
  console.log('Identify screen params:', local);

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
                pathname: '/selectCountry',
                params: {
                  ...local,
                  countryName: countryName,
                  countryCode: countryCode,
                },
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
            {isButtonLoading ? (
              <CustomButton disabled={true}>...</CustomButton>
            ) : (
              <CustomButton onPress={identify}>Continue</CustomButton>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
