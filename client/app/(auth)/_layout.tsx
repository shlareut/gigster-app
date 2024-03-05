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
        }}
        initialParams={{ countryName: 'Austria', countryCode: '+43' }}
      />
      <Stack.Screen
        name="countrySelection"
        options={{
          title: 'Country/Region',
          headerBackTitleVisible: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Log in',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign up',
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
};
