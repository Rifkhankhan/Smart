// import { StyleSheet, Text, View, FlatList } from 'react-native'
// import React from 'react'
// import { useSelector } from 'react-redux'
// import HomeCard from './../components/HomeCard'
// import Card from './../components/Card'

// const ItemsList = ({ route, navigation }) => {
// 	const items = useSelector(state => state.item.items)

// 	const renderItem = ({ item }) => <Card {...item} />

// 	return (
// 		<FlatList
// 			data={items}
// 			renderItem={renderItem}
// 			keyExtractor={item => item.id.toString()}
// 			numColumns={2}
// 			ListHeaderComponent={
// 				<View style={styles.similarProductsContainer}>
// 					<Text style={styles.similarProductsHeader}>Similar Products</Text>
// 				</View>
// 			}
// 			showsVerticalScrollIndicator={false}
// 			contentContainerStyle={styles.cards}
// 		/>
// 	)
// }

// export default ItemsList

// const styles = StyleSheet.create({
// 	similarProductsContainer: {
// 		marginHorizontal: 8,
// 		marginVertical: 4,
// 		flexDirection: 'column'
// 	},
// 	similarProductsHeader: {
// 		padding: 8,
// 		fontSize: 19,
// 		fontWeight: '400',
// 		textAlign: 'center',
// 		color: 'red'
// 	},
// 	cards: {
// 		flexDirection: 'row',
// 		flexWrap: 'wrap'
// 	}
// })


import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Card from '../components/Card';

const ItemsList = ({ route, navigation }) => {
  const items = useSelector((state) => state.item.items);

  // Memoized Header Component
  const ListHeaderComponent = useMemo(() => (
    <View style={styles.similarProductsContainer}>
      <Text style={styles.similarProductsHeader}>Similar Products</Text>
    </View>
  ), []);

  // Memoized renderItem to avoid unnecessary re-renders
  const renderItem = useCallback(({ item }) => <Card {...item} />, []);

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.container}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  similarProductsContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  similarProductsHeader: {
    padding: 8,
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
    color: 'red',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 10,
  },
});
