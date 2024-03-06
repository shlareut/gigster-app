import { AntDesign } from '@expo/vector-icons';
import { Slot, Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default () => {
  return (
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
        name="countrySelection"
        options={{
          title: 'Country/Region',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Log in',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign up',
          headerBackTitleVisible: false,
          headerTintColor: 'black',
        }}
      />
    </Stack>
  );
};
