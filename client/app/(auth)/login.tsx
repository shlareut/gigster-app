import { router, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function LoginScreen() {
  const local = useLocalSearchParams();
  return (
    <View className="flex-1 bg-white">
      <Text>Login: {local.fullPhoneNumber}</Text>
    </View>
  );
}