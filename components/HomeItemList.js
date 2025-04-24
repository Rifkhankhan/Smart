// import { StyleSheet, Text, View, ScrollView } from 'react-native'
// import React from 'react'
// import HomeCard from './HomeCard'
// import CardDesign1 from '../screens/product/CardDesign1'

// const HomeItemList = ({ title, subTitle }) => {
// 	return (
// 		<View style={styles.container}>
// 			<View style={styles.header}>
// 				<Text style={styles.title}>{title}</Text>
// 				<Text style={styles.subTitle}>{subTitle}</Text>
// 			</View>
// 			<ScrollView
// 				style={styles.list}
// 				horizontal
// 				contentContainerStyle={styles.scrollContainer}
// 				showsHorizontalScrollIndicator={false}>
// 				<CardDesign1 />
// 				<CardDesign1 />
// 				<CardDesign1 />
// 				<CardDesign1 />
// 				<CardDesign1 />
// 				<CardDesign1 />
				
// 			</ScrollView>
// 		</View>
// 	)
// }

// export default HomeItemList

// const styles = StyleSheet.create({
// 	container: {
// 		marginHorizontal: 4,
// 		borderRadius: 4,
// 		backgroundColor: 'white',
// 		padding: 4,
// 		marginTop: 8,
// 		marginBottom: 0,
// 		shadowColor: '#000',
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowOpacity: 0.1,
// 		shadowRadius: 8,
// 		elevation: 14 // For Android shadow
// 	},
// 	header: {
// 		flexDirection: 'row',
// 		padding: 8,
// 		alignItems: 'center',
// 		justifyContent: 'space-between'
// 	},
// 	title: {
// 		fontSize: 22,
// 		textTransform: 'capitalize',
// 		fontWeight: '700',
// 		color: '#333'
// 	},
// 	subTitle: {
// 		fontSize: 16,
// 		fontWeight: '600',
// 		color: '#FF6F61' // Changed to a more modern color
// 	},
// 	list: {
// 		marginTop: 8 // Add some space between the header and the list
// 	},
// 	scrollContainer: {
// 		flexDirection: 'row',
// 		paddingHorizontal: 8 // Add some padding to the scroll container
// 	}
// })


import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import CardDesign1 from '../screens/product/CardDesign1';

const HomeItemList = ({ title, subTitle }) => {
  const data = Array(6).fill(null); // Replace with real data

  const renderItem = () => <CardDesign1 />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

export default memo(HomeItemList); // Prevent re-renders if props unchanged

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: 'white',
    padding: 4,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 14,
  },
  header: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    textTransform: 'capitalize',
    fontWeight: '700',
    color: '#333',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6F61',
  },
  scrollContainer: {
    paddingHorizontal: 8,
  },
});
