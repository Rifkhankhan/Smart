import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { FlatList } from 'react-native'
import { Image } from 'react-native'
import OrderCard from './../components/OrderCard'
import { ScrollView } from 'react-native'
import TopTabBar from './../components/TopTabBar'

const Orders = ({ route, navigation }) => {
	navigation.setOptions({
		tabBarVisible: false
	})
	const type = route.params?.type
	const items = [
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 3 },
		{ id: 5 },
		{ id: 6 },
		{ id: 7 },
		{ id: 8 },
		{ id: 9 },
		{ id: 10 },
		{ id: 11 },
		{ id: 12 }
	]
	const lists = []

	const displayProducts = items.slice(0, 10)

	return (
		<>
			<TopTabBar type={type} />

			{displayProducts.length > 0 && (
				<FlatList
					data={displayProducts}
					renderItem={() => <OrderCard />}
					keyExtractor={item => item.id}
					showsVerticalScrollIndicator={false}
				/>
			)}

			{displayProducts.length === 0 && (
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1
					}}>
					<Text style={{ fontSize: 24, color: 'black' }}>
						There is no product
					</Text>
				</View>
			)}
		</>
	)
}

export default Orders

const styles = StyleSheet.create({})
