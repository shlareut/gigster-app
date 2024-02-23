import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { styles } from './styles';

const ProductCard = (props) => {
  // static background image
  const mockImage = require(`../../assets/placeholder.jpg`);
  // const imageSource = require(`../../assets/productImages/1.jpeg`);
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        {/* <ImageBackground source={props.image} style={styles.image}> */}
        <ImageBackground source={mockImage} style={styles.image}>
          <View style={styles.dealWrapper}>
            <Text style={styles.dealLabel}>🔥 Hot junk</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>{props.title}</Text>
        <Text>{props.id}</Text>
        <Text>{props.image}</Text>
      </View>
    </View>
  );
};

export default ProductCard;
