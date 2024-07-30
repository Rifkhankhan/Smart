import React from 'react'
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Animated
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const CategoryComponent = () => {
	const navigation = useNavigation()

	const onPressHandler = item => {
		if (item === 'gifts') {
			console.log(item)
			navigation.navigate('ItemsList')
		}
	}

	const categories = [
		'Services',
		'Gifts',
		'Toys',
		'Gifts',
		'Services',
		'Gifts',
		'Toys',
		'Gifts'
	]

	const animatedValue = new Animated.Value(1)

	const handlePressIn = () => {
		Animated.spring(animatedValue, {
			toValue: 0.95,
			useNativeDriver: true
		}).start()
	}

	const handlePressOut = () => {
		Animated.spring(animatedValue, {
			toValue: 1,
			useNativeDriver: true
		}).start()
	}

	const animatedStyle = {
		transform: [{ scale: animatedValue }]
	}

	return (
		<ScrollView
			showsHorizontalScrollIndicator={false}
			horizontal
			style={styles.container}>
			{categories.map((category, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => onPressHandler(category)}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					style={styles.touchable}>
					<Animated.View style={[styles.itemContainer, animatedStyle]}>
						<LinearGradient
							colors={['#FF6F61', '#DE1B7F']}
							style={styles.gradient}>
							<Text style={styles.item}>{category}</Text>
						</LinearGradient>
					</Animated.View>
				</TouchableOpacity>
			))}
		</ScrollView>
	)
}

export default CategoryComponent

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 8
	},
	touchable: {
		marginRight: 10
	},
	itemContainer: {
		borderRadius: 8,
		overflow: 'hidden'
	},
	gradient: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 8
	},
	item: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
		fontFamily: 'System' // Replace with your modern font if available
	}
})
