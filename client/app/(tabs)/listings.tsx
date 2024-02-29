import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView } from 'react-native';
import ProductCard from '../components/ProductCard';
import { host } from '../constants';

export default function ListingsScreen() {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(`${host}/api/listings`);
      const listings = await response.json();
      console.log(listings);
      setListings(listings);
    };
    fetchListings().catch(console.error);
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        className="w-screen"
        decelerationRate={'fast'}
        snapToInterval={1}
        bounces={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard listing={item} />}
      />
    </SafeAreaView>
  );
}
