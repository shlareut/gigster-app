import { Redirect } from 'expo-router';

export default function Screen() {
  return (
    <>
      <Redirect href={'./(tabs)/listings'} />
    </>
  );
}

// import { Link } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
// import ProductCard from '../components/ProductCard';
// import { host } from './constants';

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await fetch(`${host}/api/venues`);
//       const products = await response.json();
//       console.log(products);
//       setProducts(products);
//     };
//     fetchProducts().catch(console.error);
//   }, []);
//   return (
//     <SafeAreaView style={styles.mainWrapper}>
//       <View style={styles.productWrapper}>
//         <FlatList
//           showsVerticalScrollIndicator={true}
//           pagingEnabled={true}
//           data={products}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <ProductCard id={item.id} title={item.name} />
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// // styles for cart component
// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   productWrapper: {
//     // marginTop: '25%',
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
// });
