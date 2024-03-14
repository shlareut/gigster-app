import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import ListingCard from '../components/ListingCard';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function ListingsScreen() {
  // define state variables
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch listings upon screen load
  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(`${nextHost}/api/listings`);
      const listings = await response.json();
      setListings(listings);
      setIsLoading(false);
    };
    fetchListings().catch(console.error);
  }, []);

  // loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        className="w-screen mb-10"
        snapToInterval={1}
        bounces={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingCard listing={item} />}
      />
    </SafeAreaView>
  );
}
