'use server';
import dotenv from 'dotenv';
import React from 'react';

dotenv.config();

export async function geoCoder(address, postalCode, city) {
  const googleKey = process.env.GOOGLE_KEY;
  const fetchRequest = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}%20${postalCode}%20${city}&key=${googleKey}`,
  ).catch(console.error);
  const fetchResponse = await fetchRequest.json();
  console.log({
    success: fetchResponse.status,
    lat: fetchResponse.results[0].geometry.location.lat,
    long: fetchResponse.results[0].geometry.location.lng,
  });
  return {
    status: fetchResponse.status,
    lat: fetchResponse.results[0].geometry.location.lat,
    long: fetchResponse.results[0].geometry.location.lng,
  };
}
