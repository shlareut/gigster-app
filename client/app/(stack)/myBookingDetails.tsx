import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Modal, Text, View } from 'react-native';

export default function MyBookingDetailsScreen() {
  const local = useLocalSearchParams();
  return (
    <View className="flex-1 flex-col bg-white">
      <View className="h-6/12">
        <Text>
          Cancel booking, see applicant details, etc.
          https://www.npmjs.com/package/react-native-modal
        </Text>
        <Text>{local.bookingId}</Text>
      </View>
    </View>
  );
}
