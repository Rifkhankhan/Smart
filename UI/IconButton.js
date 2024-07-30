import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({ name, color, size, backgroundColor, searchHandler }) => {
	return (
		<TouchableOpacity
			onPress={searchHandler}
			style={[
				styles.container,
				backgroundColor && { backgroundColor, ...styles.extraStyles }
			]}>
			<Ionicons name={name} color={color} size={size} />
		</TouchableOpacity>
	)
}

export default IconButton

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 12,
		marginVertical: 4
	},
	extraStyles: {
		padding: 8,
		borderRadius: 50 // Corrected borderRadius value
	}
})
