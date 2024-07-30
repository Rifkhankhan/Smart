import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import { Pressable } from 'react-native'

const ViewMessage = () => {
	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.text}>
					Hi this is the message for you from one of the customer, you can
					discuss with them Hi this is the message for you from one of the
					customer, you can discuss with them
				</Text>

				<Text style={styles.date}>2024-1-22 9.45Am</Text>
			</View>

			<View style={styles.from}>
				<Text style={styles.fromText}>From : </Text>
				<Text style={styles.fromText}>Rifkhan</Text>
			</View>

			<View style={styles.replyContainer}>
				<TextInput
					placeholder="Enter your Reply"
					multiline={true}
					style={styles.reply}
				/>
			</View>

			<View style={styles.btnContainer}>
				<Button title="Send Reply" />
			</View>
		</View>
	)
}

export default ViewMessage

const styles = StyleSheet.create({
	btnContainer: {
		marginHorizontal: 'auto',
		marginVertical: 10,
		width: '90%'
	},
	container: {
		padding: 5,
		borderWidth: 1,
		margin: 5
	},
	replyContainer: {
		padding: 5
	},
	reply: {
		padding: 5,
		fontSize: 20,
		borderWidth: 1
	},
	text: {
		fontSize: 20
	},
	date: {
		fontSize: 12,
		marginTop: 5
	},
	from: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	fromText: {
		fontSize: 20
	}
})
