// import React from 'react'
// import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native'
// import ShopCard from './ShopCard'

// const ShopList = ({ shops }) => {
// 	return (
// 		<View>
// 			<View style={styles.similarProductsContainer}>
// 				{shops.length > 0 ? (
// 					<FlatList
// 						data={shops}
// 						keyExtractor={item => item.sid}
// 						renderItem={({ item }) => <ShopCard {...item} />}
// 						showsHorizontalScrollIndicator={false}
// 						numColumns={2}
// 						contentContainerStyle={styles.cards}
// 					/>
// 				) : (
// 					<View style={styles.noShopsContainer}>
// 						<Text>There are no shops</Text>
// 					</View>
// 				)}
// 			</View>
// 		</View>
// 	)
// }

// export default ShopList

// const styles = StyleSheet.create({
// 	similarProductsContainer: {
// 		marginHorizontal: 8,
// 		marginVertical: 4,
// 		flexDirection: 'column'
// 	},
// 	cards: {
// 		flexDirection: 'row',
// 		flexWrap: 'wrap'
// 	},
// 	noShopsContainer: {
// 		alignItems: 'center',
// 		marginVertical: 16
// 	}
// })


import React, { memo } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ShopCard from './ShopCard'

const ShopList = ({ shops }) => {
  return (
    <View style={styles.similarProductsContainer}>
      {shops.length > 0 ? (
        <FlatList
          data={shops}
          keyExtractor={item => item.sid.toString()} // Ensure sid is a string for keyExtractor
          renderItem={({ item }) => <ShopCard {...item} />} // Spread the props to ShopCard
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.cards}
          initialNumToRender={6} // Adjust the number of items to render initially
          maxToRenderPerBatch={6} // Adjust the number of items rendered per batch
          windowSize={5} // Render 5 items above and below the viewport for better performance
        />
      ) : (
        <View style={styles.noShopsContainer}>
          <Text>There are no shops</Text>
        </View>
      )}
    </View>
  )
}

// Memoize the ShopList component to prevent re-renders when the shops array doesn't change
export default memo(ShopList)

const styles = StyleSheet.create({
  similarProductsContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
    flexDirection: 'column',
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noShopsContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
})
