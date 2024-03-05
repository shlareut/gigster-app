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
          name="(auth)"
          options={{ headerShown: false, presentation: 'modal' }}
        />
      </Stack>
    </>
  );
};
