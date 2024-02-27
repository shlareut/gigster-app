import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      {/* <Home /> */}
      <Slot />
    </>
  );
}
