import { Link, router } from 'expo-router';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from '../components/ProductCard';

export default function TestScreen() {
  const list = ['Box1', 'Box2', 'Box3', 'Box4'];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        className="w-screen"
        pagingEnabled={true}
        data={list}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Card />}
      />
    </SafeAreaView>
  );
}
