import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { host } from '../constants';

type Listing = {
  id: string;
  venue_name: string;
  address_line_one: string;
  address_line_two: string;
  postal_code: string;
  city: string;
  country: string;
  city_district: string;
  venue_type: string;
  description: string;
  ispublished: boolean;
};

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [listing, setListing] = useState({});
  useEffect(() => {
    const loadVenue = async () => {
      const response = await fetch(`${host}/api/listings/${id}/`);
      const listing = await response.json();
      console.log(listing);
      setListing(listing);
    };
    loadVenue().catch(console.error);
  }, [id]);

  if (!listing) {
    return null;
  }

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <View style={styles.productWrapper}>
        <Text>{listing.name}</Text>
        <Text>{JSON.stringify(listing)}</Text>
        <Link href="/">Click me!</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  productWrapper: {
    // marginTop: '25%',
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
