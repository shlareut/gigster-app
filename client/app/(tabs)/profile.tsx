import { Link, router } from 'expo-router';
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';

export default function OtherScreen() {
  return (
    <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
      <CustomButton onPress={() => router.navigate('../(auth)/identify')}>
        Log in to view
      </CustomButton>
    </View>
  );
}
