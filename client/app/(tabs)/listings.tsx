import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import ProductCard from '../components/ProductCard';
import { host } from '../constants';

export default function ListingsScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${host}/api/venues`);
      const products = await response.json();
      console.log(products);
      setProducts(products);
    };
    fetchProducts().catch(console.error);
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        className="w-screen"
        pagingEnabled={true}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </SafeAreaView>
  );
}
