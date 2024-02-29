import { Link } from 'expo-router';
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

export default function OtherScreen() {
  return (
    <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
      <Button title="Login to view" />
    </View>
  );
}
