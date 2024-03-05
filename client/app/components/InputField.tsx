import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const InputField = (props) => {
  return (
    <View className="w-11/12 my-3">
      <Text className="text-base font-bold mb-1">Inputfield</Text>
      <TextInput
        className="bg-white text-left text-md "
        mode="outlined"
        label="Inputfield"
        right={<TextInput.Icon icon="chevron-down" />}
      />
    </View>
  );
};

export default InputField;
