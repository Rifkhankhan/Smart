import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Inbox = () => {
	const navigate = useNavigation()
	const viewHandler = () => {
		navigate.navigate('ViewMessage')
	}
	return (
		<ScrollView>
			<Pressable style={styles.item} onPress={viewHandler}>
				<Text style={styles.text}>
					Here is a new message for you from customer
				</Text>
			</Pressable>

			<View style={styles.item}>
				<Text style={styles.text}>
					Here is a new message for you from Admin
				</Text>
			</View>

			<View style={styles.item}>
				<Text style={styles.text}>
					Here is a new message for you from customer
				</Text>
			</View>

			<View style={styles.item}>
				<Text style={styles.text}>
					Here is a new message for you from Admin
				</Text>
			</View>

			<View style={styles.item}>
				<Text style={styles.text}>
					Here is a new message for you from customer
				</Text>
			</View>

			<View style={styles.item}>
				<Text style={styles.text}>
					Here is a new message for you from Admin
				</Text>
			</View>

			<View style={styles.item}>
				<Text style={styles.text}>
					Here is a new message for you from customer
				</Text>
			</View>

			<View style={styles.item}>
				<Text style={styles.text}>
					Here is a new message for you from Admin
				</Text>
			</View>

			<View style={styles.item}>
				<Text style={styles.text} numberOfLines={2}>
					Here is a new message for you from customer hi it is ok for you i
					think blallalladwefewfwe
				</Text>
			</View>

			<View style={styles.item}>
				<Text style={styles.text} numberOfLines={2}>
					Here is a new message for you from Admin
				</Text>
			</View>
		</ScrollView>
	)
}

export default Inbox

const styles = StyleSheet.create({
	item: {
		width: '95%',
		marginVertical: 5,
		marginHorizontal: 'auto',
		borderRadius: 2,
		backgroundColor: '#303030',
		padding: 5
	},
	text: {
		color: 'white',
		fontSize: 18
	}
})
