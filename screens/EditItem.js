import {
	Button,
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const EditItem = () => {
	const [ingredient, setIngredient] = useState('')
	const [ingredientList, setIngredientList] = useState([])
	const [name, setName] = useState('')
	const handleAddIngredient = () => {
		if (ingredient.trim() !== '') {
			setIngredientList([...ingredientList, ingredient])
			setIngredient('')
		}
	}

	return (
		<ScrollView>
			<TouchableOpacity activeOpacity={0.8} style={styles.imageContainer}>
				<Image
					source={require('./../assets/images/photo.png')}
					style={styles.photo}
				/>
			</TouchableOpacity>
			<View>
				<TextInput
					placeholder="Enter Name of Item"
					style={styles.name}
					value={name}
					onChangeText={setName}
				/>
				<View style={styles.price}>
					<TextInput placeholder="old Price" style={styles.price1} />
					<TextInput placeholder="new Price" style={styles.price2} />
				</View>
				<TextInput
					multiline={true}
					placeholder="Type Your description"
					style={styles.desc}
				/>
				<TextInput placeholder="shop name" style={styles.shopName} />
				<View>
					{ingredientList.length > 0 && (
						<Text style={styles.header}>Ingredients</Text>
					)}
					<View style={styles.list}>
						{/* <ul>
							<FlatList
								data={ingredientList}
								keyExtractor={item => item}
								renderItem={({ item }) => (
									<li>
										<Text>{item}</Text>
									</li>
								)}
							/>
						</ul> */}
					</View>
					<View style={styles.ingredientContainer}>
						<TextInput
							placeholder="ingridiance"
							style={styles.ingredient}
							onChangeText={setIngredient}
							value={ingredient}
						/>
						{ingredient.length > 0 && (
							<Pressable>
								<Ionicons
									name="checkmark"
									size={30}
									color="red"
									style={styles.checkMark}
									onPress={handleAddIngredient}
								/>
							</Pressable>
						)}
					</View>
				</View>
			</View>
			<View style={styles.button}>
				<Button title="Update Item" />
			</View>
		</ScrollView>
	)
}

export default EditItem

const styles = StyleSheet.create({
	imageContainer: {
		width: '100%',
		marginHorizontal: 'auto',
		marginVertical: 5,
		height: 250
	},

	photo: {
		marginVertical: 5,
		marginHorizontal: 'auto',
		width: '100%',
		height: '100%'
	},
	name: {
		width: '90%',
		borderRadius: 5,
		padding: 5,
		marginVertical: 10,
		borderWidth: 1,
		marginHorizontal: 'auto',
		fontSize: '20px'
	},
	shopName: {
		width: '90%',
		borderRadius: 5,
		padding: 5,
		borderWidth: 1,
		marginHorizontal: 'auto',
		fontSize: '20px'
	},
	price: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '90%',
		// borderWidth: 1,
		margin: 'auto',
		flexDirection: 'row'
	},
	price1: {
		width: '48%',
		borderWidth: 1,
		padding: 5,
		borderRadius: 5,
		fontSize: '20px'
	},
	price2: {
		width: '48%',
		borderWidth: 1,
		padding: 5,
		borderRadius: 5,
		fontSize: '20px'
	},

	desc: {
		width: '90%',
		margin: 'auto',
		marginVertical: 10,
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		fontSize: '20px',
		height: 150
	},
	header: {
		fontSize: '22px',
		textDecorationLine: 'underline',
		marginLeft: 20
	},
	ingredientContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '90%',
		margin: 'auto'
	},
	ingredient: {
		width: '100%',
		borderRadius: 5,
		padding: 5,
		borderWidth: 1,
		marginHorizontal: 'auto',
		fontSize: '20px'
	},
	checkMark: {
		fontWeight: '700'
	},
	checkImage: {
		width: '50px',
		height: '50px',
		position: 'absolute',
		right: '5px',
		bottom: 5
	},
	button: {
		flex: 1,
		width: '90%',
		marginTop: 10,
		marginHorizontal: 'auto',
		marginVertical: 5
	}
})
