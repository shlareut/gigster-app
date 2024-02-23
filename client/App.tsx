import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './app/screens/Home';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Home />
    </>
  );
}
