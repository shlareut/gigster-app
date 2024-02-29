import React from 'react';
import { Pressable, Text, View } from 'react-native';

const CustomButton = () => {
  return (
    <Pressable
      className="self-end justify-center items-center rounded-xl w-3/6 h-5/6 border bg-blue-900 active:opacity-50"
      onPress={() => alert('Work in progress!')}
    >
      <Text className="font-extrabold text-white text-lg">Login to book</Text>
    </Pressable>
  );
};

export default CustomButton;
