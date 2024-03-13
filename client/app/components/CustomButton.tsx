import React from 'react';
import { Pressable, Text, View } from 'react-native';

const CustomButton = (props) => {
  // return disabled button if props.disabled = true
  if (props.disabled) {
    return (
      <Pressable
        className="w-fit justify-center items-center rounded-md bg-cyan-800 opacity-50"
        disabled={true}
      >
        <Text className="my-2 mx-5 font-extrabold text-white text-lg">
          {props.children}
        </Text>
      </Pressable>
    );
  }
  // otherwise return clickable button
  return (
    <Pressable
      className="w-fit justify-center items-center rounded-md bg-cyan-800 active:opacity-50"
      onPress={props.onPress}
    >
      <Text className="my-2 mx-5 font-extrabold text-white text-lg">
        {props.children}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
