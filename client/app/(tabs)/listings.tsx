import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import ListingCard from '../components/ListingCard';
import LoadingScreen from '../components/LoadingScreen';
import { nextHost } from '../constants';

export default function ListingsScreen() {
  // define state variables
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch listings upon initial screen load
  // useEffect(() => {
  //   const fetchListings = async () => {
  //     setIsLoading(true);
  //     const response = await fetch(`${nextHost}/api/listings`);
  //     const listings = await response.json();
  //     setListings(listings);
  //     setIsLoading(false);
  //   };
  //   fetchListings().catch(console.error);
  // }, []);

  // fetch listings upon each screen load
  useFocusEffect(
    useCallback(() => {
      // do something if screen is focussed
      // console.log('listings screen focussed!');
      const fetchListings = async () => {
        setIsLoading(true);
        const response = await fetch(`${nextHost}/api/listings`);
        const listings = await response.json();
        setListings(listings);
        setIsLoading(false);
      };
      fetchListings().catch(console.error);
      // do something if screen is UNfocussed
      return () => {
        // console.log('listings screen unfocussed!');
      };
    }, []),
  );

  // loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        className="w-screen"
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
        snapToInterval={1}
        bounces={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled={true}
        data={listings.sort((a, b) => a.id - b.id)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingCard listing={item} />}
      />
    </SafeAreaView>
  );
}
