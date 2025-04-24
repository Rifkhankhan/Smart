// import { StyleSheet, Text, View, FlatList } from 'react-native'
// import React from 'react'
// import { useSelector } from 'react-redux'
// import Card from './../../components/Card'

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


import React, { useCallback } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import Card from './../../components/Card'

const ItemsList = ({ route, navigation }) => {
  const items = useSelector((state) => state.item.items)

  // Memoize renderItem to avoid unnecessary re-renders
  const renderItem = useCallback(({ item }) => <Card {...item} />, [])

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      ListHeaderComponent={
        <View style={styles.similarProductsContainer}>
          <Text style={styles.similarProductsHeader}>Similar Products</Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.cards}
      // For fixed item sizes, we can improve performance by using getItemLayout
      getItemLayout={(data, index) => ({
        length: 200, // Height of each item
        offset: 200 * index, // Calculating the offset based on index
        index,
      })}
    />
  )
}

export default ItemsList

const styles = StyleSheet.create({
  similarProductsContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
    flexDirection: 'column',
  },
  similarProductsHeader: {
    padding: 8,
    fontSize: 19,
    fontWeight: '400',
    textAlign: 'center',
    color: 'red',
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
