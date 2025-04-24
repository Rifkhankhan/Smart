// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { TouchableOpacity } from 'react-native'
// import CardProduct from '../Components/CardProduct'
// import { FlatList } from 'react-native'
// import CardComponent from '../Components/Card'
// import { ScrollView } from 'react-native'
// const Card = ({ route, navigation }) => {
// 	const items = [
// 		{ id: 1 },
// 		{ id: 2 },
// 		{ id: 3 },
// 		{ id: 4 },
// 		{ id: 5 },
// 		{ id: 6 },
// 		{ id: 7 },
// 		{ id: 8 },
// 		{ id: 9 },
// 		{ id: 10 },
// 		{ id: 11 },
// 		{ id: 12 }
// 	]
// 	navigation.setOptions({
// 		headerTitle: 'My Card(15)',
// 		headerShown: true,
// 		headerStyle: { backgroundColor: '#8B008B' },
// 		headerTintColor: 'white',
// 		headerTitleStyle: { fontSize: 20 },
// 		headerRight: () => (
// 			<TouchableOpacity
// 				style={{ fontSize: 20, color: 'white', paddingHorizontal: 8 }}>
// 				Delete
// 			</TouchableOpacity>
// 		)
// 	})
// 	return (
// 		<ScrollView showsVerticalScrollIndicator={false}>
// 			{/* <FlatList
// 				data={items}
// 				renderItem={item => <CardProduct />}
// 				keyExtractor={item => item.id}
// 				showsVerticalScrollIndicator={false}
// 				scrollEnabled={true}
// 			/> */}

// 			<View
// 				style={{
// 					flexDirection: 'column',
// 					backgroundColor: 'white',
// 					marginTop: 8
// 				}}>
// 				<Text
// 					style={{
// 						fontSize: 20,
// 						fontWeight: 500,
// 						textAlign: 'center',
// 						paddingVertical: 8
// 					}}>
// 					Just For You
// 				</Text>
// 				{/* <FlatList
// 					data={items}
// 					renderItem={item => <CardComponent />}
// 					keyExtractor={item => item.id}
// 					showsVerticalScrollIndicator={false}
// 					numColumns={2}
// 				/> */}
// 			</View>
// 		</ScrollView>
// 	)
// }

// export default Card


import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import CardProduct from '../Components/CardProduct';
import CardComponent from '../Components/Card';

const Card = ({ route, navigation }) => {
  const items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
  ];

  navigation.setOptions({
    headerTitle: 'My Card(15)',
    headerShown: true,
    headerStyle: { backgroundColor: '#8B008B' },
    headerTintColor: 'white',
    headerTitleStyle: { fontSize: 20 },
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerRightButton}>
        <Text style={styles.headerRightText}>Delete</Text>
      </TouchableOpacity>
    ),
  });

  // Memoize CardProduct to avoid unnecessary re-renders
  const renderItem = useCallback(({ item }) => {
    return <CardProduct item={item} />;
  }, []);

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Just For You</Text>
        </View>
      }
      numColumns={2} // Optional: If you want 2 items per row
    />
  );
};

const styles = StyleSheet.create({
  headerRightButton: {
    paddingHorizontal: 8,
  },
  headerRightText: {
    fontSize: 20,
    color: 'white',
  },
  headerContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 8,
  },
});

export default Card;
