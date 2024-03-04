import { AntDesign } from '@expo/vector-icons';
import { Slot, Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default () => {
  return (
    <>
      {/* <StatusBar style="auto" /> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(stack)/[details]"
          options={{
            title: 'Details',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="(auth)/identify"
          options={{
            title: 'Log in or sign up',
            headerBackTitleVisible: false,
            presentation: 'modal',
          }}
          initialParams={{ countryName: 'Austria', countryCode: '+43' }}
        />
        <Stack.Screen
          name="(auth)/countrySelection"
          options={{
            title: 'Country/Region',
            headerBackTitleVisible: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="(auth)/login"
          options={{
            title: 'Log in',
            headerBackTitleVisible: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="(auth)/signup"
          options={{
            title: 'Sign up',
            headerBackTitleVisible: false,
            presentation: 'modal',
          }}
        />
      </Stack>
      {/* <Tabs>
        <Tabs.Screen
          // Name of the route to hide.
          name="index"
          options={{
            // This tab will no longer show up in the tab bar.
            title: 'Home',
            tabBarIcon: () => <AntDesign name="home" size={24} color="grey" />,
          }}
        />
        <Tabs.Screen
          // Name of the route to hide.
          name="venues/[id]"
          options={{
            // This tab will no longer show up in the tab bar.
            title: 'Details',
            href: null,
          }}
        />
      </Tabs> */}
    </>
  );
};
