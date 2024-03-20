import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  usePathname,
} from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import checkLoginStatus from '../../util/sessions';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function IdentifyScreen() {
  // -------------------------------------------
  // #region variables

  const local = useLocalSearchParams();
  const [countryName, setCountryName] = useState('Austria');
  const [countryCode, setCountryCode] = useState('+43');
  const [lineNumber, setLineNumber] = useState('');
  const [username, setUsername] = useState(''); // username consists of country code + line number.
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region useEffect functions

  // update country code or country name if the user updates it.
  useEffect(() => {
    setCountryName(local.countryName);
    setCountryCode(local.countryCode);
  }, [local.countryName, local.countryCode]);

  // update username if linenumber or country code change.
  useEffect(() => {
    setUsername(`${countryCode}${lineNumber}`);
  }, [lineNumber, countryCode]);

  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region identify and redirect function
  const identify = async () => {
    // disable button
    setIsButtonLoading(true);

    // call API
    const identifyRequest = await fetch(
      `${nextHost}/api/auth/identify/${username}`,
    );
    const identifyResponse = await identifyRequest.json();
    // console.log('IDENTIFY API:', identifyResponse.message);

    // if not successful, show error message
    if (!identifyResponse.success) {
      setErrorMessage(identifyResponse.message);
    }
    // if successful, direct to login or sign up.
    else if (identifyResponse.success && identifyResponse.newUser) {
      // redirect to sign up screen.
      router.navigate({
        pathname: '/signup',
        params: { ...local, username: identifyResponse.username },
      });
    } else {
      // redirect to login screen.
      router.navigate({
        pathname: '/login',
        params: { ...local, username: identifyResponse.username },
      });
    }
    setIsButtonLoading(false);
  };
  // #endregion
  // -------------------------------------------

  // -------------------------------------------
  // #region check login status & do something

  const path = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      // do something if screen is focussed
      // console.log('Identify screen focussed!');
      const checkIfLoggedIn = async () => {
        try {
          const status = await checkLoginStatus(path);
          if (status.isLoggedIn) {
            // do something if user is logged in.
            router.back();
            Toast.show({
              type: 'error',
              text1: 'You are already logged in!',
            });
          } else {
            // do something if NOT logged in
            setIsLoading(false);
          }
        } catch (error) {
          console.error;
        }
      };
      checkIfLoggedIn();
      // do something if screen is UNfocussed
      return () => {
        // console.log('Identify screen unfocussed!');
      };
    }, []),
  );

  // loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }
  // #endregion
  // -------------------------------------------

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <View className="items-center">
          {/* // Progressbar */}
          <View className="flex-1 w-11/12 mb-10">
            <ProgressBar progress={0.25} color="#155e75" />
          </View>
          {/* // Progressbar */}
          {/* // Input fields. */}
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
          {/* // Input fields. */}
          <View className="my-3 w-11/12">
            {isButtonLoading ? (
              <CustomButton disabled={true}>...</CustomButton>
            ) : (
              <CustomButton onPress={identify}>Continue</CustomButton>
            )}
            <Text className="my-1 mx-0.5 text-red-500">{errorMessage}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
