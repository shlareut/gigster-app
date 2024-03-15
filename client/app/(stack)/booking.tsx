import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ProgressBar, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function BookingScreen() {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 bg-white">
        <View className="items-center">
          {/* // Progressbar */}
          <View className="flex-1 w-11/12 mb-10">
            <ProgressBar progress={0.25} color="#155e75" />
          </View>
          {/* // Progressbar */}
          {/* // Input field. */}
          <TextInput
            className="bg-white text-left text-md w-11/12 my-3"
            disabled={true}
            mode="outlined"
            inputMode="text"
            label="First name"
            value="Donald"
            activeOutlineColor="#155e75"
          />
          <TextInput
            className="bg-white text-left text-md w-11/12 my-3"
            disabled={true}
            mode="outlined"
            inputMode="text"
            label="Last name"
            value="Duck"
            activeOutlineColor="#155e75"
          />
          <TextInput
            className="bg-white text-left text-md w-11/12 my-3"
            disabled={true}
            mode="outlined"
            inputMode="tel"
            label="Phone number"
            value="+4312345"
            activeOutlineColor="#155e75"
          />
          <TextInput
            className="bg-white text-left text-md w-11/12 my-3"
            mode="outlined"
            inputMode="numeric"
            label="Years of experience in role"
            activeOutlineColor="#155e75"
          />
          <View className="my-3 w-11/12">
            {isButtonLoading ? (
              <CustomButton disabled={true}>...</CustomButton>
            ) : (
              <CustomButton onPress={() => {}}>Continue</CustomButton>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
