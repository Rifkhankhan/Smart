import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
const SearchBar = ({ width }) => {
	const [searchQuery, setSearchQuery] = useState('')

	const setSearchText = query => setSearchQuery(query)
	return (
		<View style={styles.searchContainer}>
			<TextInput
				style={[
					styles.searchBar,
					{ width: Dimensions.get('window').width * width }
				]}
				placeholder="Search..."
				onChangeText={setSearchText}
				value={searchQuery}
			/>
		</View>
	)
}

export default SearchBar

const styles = StyleSheet.create({
	searchContainer: {
		// flex:1,
		// justifyContent: 'center',
		// alignItems:'center',
		// backgroundColor:'black'
	},
	searchBar: {
		flex: 1,
		width: Dimensions.get('window').width * 0.8,

		paddingHorizontal: 15,
		paddingVertical: 10,

		borderRadius: 5,
		borderColor: '#ddd',
		backgroundColor: 'white',
		color: 'black'
	}
})
