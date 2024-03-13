import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function PostingsScreen() {
  const emptyScreenImage = require('../../assets/postings.jpg');
  return (
    <View className="flex-1 h-screen w-screen items-center justify-center bg-white">
      <Image className="w-48 h-48 mb-10" source={emptyScreenImage} />
      <CustomButton onPress={() => router.navigate('../(auth)/identify')}>
        Log in to view
      </CustomButton>
    </View>
  );
}
