import { Link } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';

export default function OtherScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View className="rounded-3xl w-5/6 h-2/6 bg-red-600">
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </SafeAreaView>
  );
}
