// import React from 'react'
// import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
// import CategoryList from '../components/HomeComponents/CategoryList'
// import Carouselcomponent from '../components/HomeComponents/Carousel'

// const Home = () => {
// 	return (
// 		<SafeAreaView>
// 			<CategoryList />

// 			{/* Carousel */}
// 			<Carouselcomponent />
// 			{/* New Things Carousel */}

// 			{/* Flash Sale */}

// 			{/* Products card */}
// 		</SafeAreaView>
// 	)
// }

// export default Home

// const styles = StyleSheet.create({
// 	categoryList: {
// 		display: 'flex'
// 	},
// 	categoryBox: {
// 		borderWidth: 1,
// 		borderRadius: 5,
// 		padding: 2,
// 		marginHorizontal: 2
// 	}
// })


import React, { useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
} from "react-native";

// Components
import CategoryList from "../components/HomeComponents/CategoryList";
import Carouselcomponent from "../components/HomeComponents/Carousel";

const Home = () => {
  const renderContent = useCallback(() => (
    <View>
      <CategoryList />
      <Carouselcomponent />
      {/* Future: Flash Sale Component */}
      {/* Future: Product Cards */}
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]} // Dummy data to allow FlatList rendering
        ListHeaderComponent={renderContent}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
