// import { StyleSheet, Text, View, FlatList } from 'react-native'
// import React from 'react'
// import { useSelector } from 'react-redux' // Added import
// import PersonCard from './../components/PersonCard'

// const PersonList = ({ customers }) => {
// 	const renderItem = ({ item }) => <PersonCard {...item} />

// 	return (
// 		<FlatList
// 			data={customers}
// 			renderItem={renderItem}
// 			keyExtractor={item => item.cid.toString()}
// 			ListEmptyComponent={
// 				<View style={styles.emptyContainer}>
// 					<Text>There are no customers</Text>
// 				</View>
// 			}
// 			showsVerticalScrollIndicator={false}
// 			numColumns={2}
// 			contentContainerStyle={styles.cards}
// 		/>
// 	)
// }

// export default PersonList

// const styles = StyleSheet.create({
// 	emptyContainer: {
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		padding: 20
// 	},
// 	cards: {
// 		flexDirection: 'row',
// 		flexWrap: 'wrap'
// 	}
// })


import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import PersonCard from './../components/PersonCard'

const PersonList = ({ customers }) => {
  // Memoize the renderItem function to avoid unnecessary re-renders
  const renderItem = useMemo(() => {
    return ({ item }) => <PersonCard {...item} />
  }, []);

  return (
    <FlatList
      data={customers}
      renderItem={renderItem}
      keyExtractor={item => item.cid.toString()}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>There are no customers</Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
      numColumns={2} // Display items in two columns
      contentContainerStyle={styles.cards}
      initialNumToRender={10} // Initially render only 10 items
      maxToRenderPerBatch={10} // Max items to render in each batch
      windowSize={5} // Window size for virtualized list rendering
      removeClippedSubviews={true} // Optimize memory usage by removing off-screen components
    />
  )
}

export default PersonList

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
