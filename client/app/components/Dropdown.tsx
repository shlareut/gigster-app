import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const Dropdown = (props) => {
  return (
    <TouchableOpacity
      className="w-11/12"
      onPress={() => {
        router.navigate({
          pathname: '../(auth)/countrySelection',
          params: { countryName: countryName, countryCode: countryCode },
        });
      }}
    >
      <View pointerEvents={'none'}>
        <TextInput
          className="bg-white text-left text-md"
          mode="outlined"
          label="Country/Region"
          value={`${countryName} ${countryCode}`}
          right={<TextInput.Icon icon="chevron-down" />}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Dropdown;
