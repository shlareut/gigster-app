import { AntDesign } from '@expo/vector-icons';
import { Slot, Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

export default () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="identify"
          options={{
            title: 'Log in or sign up',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
          initialParams={{ countryName: 'Austria', countryCode: '+43' }}
        />
        <Stack.Screen
          name="selectCountry"
          options={{
            title: 'Country/Region',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
            presentation: 'modal',
          }}
        />
        {/* <Stack.Screen
        name="login"
        options={{
          title: 'Log in',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
      /> */}
        <Stack.Screen
          name="signup"
          options={{
            title: 'Sign up',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: 'Log in via OTP',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
      </Stack>
      <Toast visibilityTime={2000} />
    </>
  );
};
