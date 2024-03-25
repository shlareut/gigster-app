import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import ListingCard from '../components/ListingCard';
import { nextHost } from '../constants';

export default function ListingsScreen() {
  // define state variables
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(`${nextHost}/api/listings`);
      const listings = await response.json();
      setListings(listings);
      setTimeout(() => {
        setRefreshing(false);
      }, 1500);
    };
    if (refreshing) {
      // console.log('Refreshed.');
      fetchListings();
    }
  }, [refreshing]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        className="w-screen"
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
        snapToInterval={1}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        initialNumToRender={10}
        data={listings.sort((a, b) => a.id - b.id)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingCard listing={item} />}
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
      />
    </SafeAreaView>
  );
}
