import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Button, Image, ImageBackground, Text, View } from 'react-native';
import { host } from '../constants';
import { styles } from './styles';

const ProductCard = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <ImageBackground
          source={{ uri: `${host}/images/${props.item.id}.jpeg` }}
          style={styles.image}
        >
          <View style={styles.dealWrapper}>
            <Text style={styles.dealLabel}>🔥 Hot junk</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>{props.item.name}</Text>
        <Text>{props.item.type}</Text>
        <Text>{props.item.address_line_one}</Text>
        <Text>{props.item.city_district}</Text>
        <Link
          href={{
            pathname: '../(stack)/[details]',
            params: { id: props.item.id },
          }}
        >
          Click me!
        </Link>
      </View>
    </View>
  );
};

export default ProductCard;
