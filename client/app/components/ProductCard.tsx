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
          source={{ uri: `${host}/images/${props.id}.jpeg` }}
          style={styles.image}
        >
          <View style={styles.dealWrapper}>
            <Text style={styles.dealLabel}>🔥 Hot junk</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>{props.title}</Text>
        <Text>{props.id}</Text>
        <Link
          href={{
            pathname: '../(stack)/[details]',
            params: { id: props.id },
          }}
        >
          Click me!
        </Link>
      </View>
    </View>
  );
};

export default ProductCard;
