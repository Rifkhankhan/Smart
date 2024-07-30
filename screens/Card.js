import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import CardProduct from '../Components/CardProduct'
import { FlatList } from 'react-native'
import CardComponent from '../Components/Card'
import { ScrollView } from 'react-native'
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
		{ id: 12 }
	]
	navigation.setOptions({
		headerTitle: 'My Card(15)',
		headerShown: true,
		headerStyle: { backgroundColor: '#8B008B' },
		headerTintColor: 'white',
		headerTitleStyle: { fontSize: 20 },
		headerRight: () => (
			<TouchableOpacity
				style={{ fontSize: 20, color: 'white', paddingHorizontal: 8 }}>
				Delete
			</TouchableOpacity>
		)
	})
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			{/* <FlatList
				data={items}
				renderItem={item => <CardProduct />}
				keyExtractor={item => item.id}
				showsVerticalScrollIndicator={false}
				scrollEnabled={true}
			/> */}

			<View
				style={{
					flexDirection: 'column',
					backgroundColor: 'white',
					marginTop: 8
				}}>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 500,
						textAlign: 'center',
						paddingVertical: 8
					}}>
					Just For You
				</Text>
				{/* <FlatList
					data={items}
					renderItem={item => <CardComponent />}
					keyExtractor={item => item.id}
					showsVerticalScrollIndicator={false}
					numColumns={2}
				/> */}
			</View>
		</ScrollView>
	)
}

export default Card
