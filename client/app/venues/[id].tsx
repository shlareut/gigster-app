import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { host } from '../constants';

type Venue = {
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

export default function Venue() {
  const { id } = useLocalSearchParams();
  const [venue, setVenue] = useState({});
  useEffect(() => {
    const loadVenue = async () => {
      const response = await fetch(`${host}/api/venues/${id}/`);
      const venue = await response.json();
      console.log(venue);
      setVenue(venue);
    };
    loadVenue().catch(console.error);
  }, [id]);

  if (!venue) {
    return null;
  }

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <View style={styles.productWrapper}>
        <Text>{venue.name}</Text>
        <Text>{JSON.stringify(venue)}</Text>
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
