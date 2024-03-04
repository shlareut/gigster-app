import { router, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function SignUpScreen() {
  const local = useLocalSearchParams();
  return (
    <View className="flex-1 bg-white">
      <Text>SignUp: {local.fullPhoneNumber}</Text>
    </View>
  );
}
