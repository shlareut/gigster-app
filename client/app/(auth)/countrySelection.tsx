import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import countries from '../../assets/countrycodes.json';

export default function CountryRadioButtons() {
  // const [country, setCountry] = useState('Afghanistan');
  const local = useLocalSearchParams();
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={countries}
        keyExtractor={(item) => item.code}
        getItemLayout={(countries, index) => ({
          length: 69,
          offset: 69 * index,
          index,
        })}
        initialScrollIndex={countries.findIndex(
          (item) => item.name === local.countryName,
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // setCountry(item.name);
              router.navigate({
                pathname: '/identify',
                params: { countryName: item.name, countryCode: item.dial_code },
              });
            }}
          >
            <View className="flex-col my-4 mx-3">
              <View className="flex-row items-center">
                <Text className="text-base">
                  {item.name} ({item.dial_code})
                </Text>
                <RadioButton
                  value={item.dial_code}
                  status={
                    local.countryName === item.name ? 'checked' : 'unchecked'
                  }
                />
              </View>
              <View className="border-t border-gray-200"></View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
