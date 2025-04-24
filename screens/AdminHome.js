// import {
// 	StyleSheet,
// 	Text,
// 	View,
// 	Image,
// 	ScrollView,
// 	TouchableOpacity,
// 	FlatList
// } from 'react-native'
// import React, { useState } from 'react'
// import CategoryComponent from './../components/CategoryComponent'
// import HomeItemList from './../components/HomeItemList'
// import BigItemList from './../components/BigItemList'
// import Card from './../components/Card'
// import CardContainer from '../components/CardContainer'
// import { Asset } from "expo-asset";
// import plusImage from "./../assets/images/plus.png";


// const AdminHome = ({ navigation }) => {
// 	const [isClicked, setIsClicked] = useState(false)

// 	const toggleSearchHandler = () => {
// 		setIsClicked(prevState => !prevState)
// 	}

// 	const createIdea = () => {
// 		navigation.navigate('CreateIdea')
// 	}

// 	return (
// 		<>
// 			{!isClicked && (
// 				<ScrollView showsVerticalScrollIndicator={false}>
// 					<CategoryComponent />
// 					<HomeItemList title="Services" />
// 					<BigItemList title="Today Offers" subTitle="Limited" />
// 					<HomeItemList title="Everything Under" subTitle="Rs.99" />

// 					<CardContainer />
// 				</ScrollView>
// 			)}

// 			<TouchableOpacity
// 				style={styles.plusButton}
// 				activeOpacity={0.8}
// 				onPress={createIdea}>
// 				<Image
// 					source={plusImage}
// 					style={styles.plusImage}
// 				/>
// 			</TouchableOpacity>
// 		</>
// 	)
// }

// export default AdminHome

// const styles = StyleSheet.create({
// 	productCardContainer: {
// 		padding: 4,
// 		backgroundColor: '#15df',
// 		marginHorizontal: 8,
// 		marginVertical: 10,
// 		borderRadius: 8,
// 		elevation: 3
// 	},
// 	plusButton: {
// 		position: 'absolute',
// 		right: 15,
// 		bottom: 20,
// 		width: 50,
// 		height: 50
// 	},
// 	plusImage: {
// 		width: '100%',
// 		height: '100%'
// 	},
// 	title: {
// 		paddingLeft: 8,
// 		fontSize: 20,
// 		fontWeight: '600',
// 		paddingVertical: 8
// 	},
// 	cards: {
// 		flexDirection: 'row',
// 		flexWrap: 'wrap'
// 	}
// })


import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import CategoryComponent from './../components/CategoryComponent';
import HomeItemList from './../components/HomeItemList';
import BigItemList from './../components/BigItemList';
import CardContainer from '../components/CardContainer';
import { Asset } from 'expo-asset';
import plusImage from './../assets/images/plus.png';

const AdminHome = ({ navigation }) => {
  const [isClicked, setIsClicked] = useState(false);

  // Callback to toggle search visibility
  const toggleSearchHandler = useCallback(() => {
    setIsClicked(prevState => !prevState);
  }, []);

  // Navigate to create idea screen
  const createIdea = useCallback(() => {
    navigation.navigate('CreateIdea');
  }, [navigation]);

  return (
    <>
      {!isClicked && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[1]} // Dummy data to render components, replace with actual data as necessary
          renderItem={() => (
            <>
              <CategoryComponent />
              <HomeItemList title="Services" />
              <BigItemList title="Today Offers" subTitle="Limited" />
              <HomeItemList title="Everything Under" subTitle="Rs.99" />
              <CardContainer />
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <TouchableOpacity
        style={styles.plusButton}
        activeOpacity={0.8}
        onPress={createIdea}
      >
        <Image
          source={plusImage}
          style={styles.plusImage}
        />
      </TouchableOpacity>
    </>
  );
};

export default React.memo(AdminHome);

const styles = StyleSheet.create({
  plusButton: {
    position: 'absolute',
    right: 15,
    bottom: 20,
    width: 50,
    height: 50,
  },
  plusImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    paddingLeft: 8,
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 8,
  },
});
