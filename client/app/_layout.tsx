import { AntDesign } from '@expo/vector-icons';
import { Slot, Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

export default () => {
  return (
    <>
      {/* <StatusBar style="auto" /> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(stack)/listingDetails"
          options={{
            title: 'Details',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="(stack)/startBooking"
          options={{
            title: 'Application',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="(stack)/submitBooking"
          options={{
            title: 'Submit application',
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="(stack)/myBookingDetails"
          options={{
            title: 'Manage application',
            headerBackTitleVisible: false,
            presentation: 'modal',
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            presentation: 'modal',
            headerTintColor: 'black',
          }}
        />
      </Stack>
      <Toast visibilityTime={2000} />
    </>
  );
};
