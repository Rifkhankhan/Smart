import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import { useDispatch } from 'react-redux'
import PageContainer from '../components/PageContainer'

const SearchScreen = ({ navigation }) => {
	const dispatch = useDispatch()

	const [searchTerm, setSearchTerm] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [noResultsFound, setNoResultsFound] = useState(false)

	useEffect(() => {
		const delaySearch = setTimeout(async () => {
			if (!searchTerm || searchTerm === '') {
				setNoResultsFound(false)
				return
			}

			setIsLoading(true)

			// Perform search logic here
			// const usersResult = await searchUsers(searchTerm);
			// delete usersResult[userData.userId];
			// setUsers(usersResult);

			// Simulate search result handling
			// if (Object.keys(usersResult).length === 0) {
			setNoResultsFound(true)
			// } else {
			// 	setNoResultsFound(false)
			// 	dispatch(setStoredUsers({ newUsers: usersResult }))
			// }

			setIsLoading(false)
		}, 500)

		return () => clearTimeout(delaySearch)
	}, [searchTerm])

	const headerLeft = () => (
		<Pressable
			onPress={() => navigation.goBack()}
			style={{ marginRight: 'auto' }}>
			<Ionicons name="chevron-back" size={24} color="black" />
		</Pressable>
	)

	const headerRight = () => (
		<TouchableOpacity
			onPress={() => console.log('pressed')}
			style={{
				width: 'auto',
				paddingLeft: 16
			}}>
			<Text>Search</Text>
		</TouchableOpacity>
	)

	useEffect(() => {
		navigation.setOptions({
			headerShown: false,
			headerLeft: headerLeft,
			headerRight
		})
	}, [navigation])

	return (
		<PageContainer>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 10,
					flexDirection: 'row'
				}}>
				<Pressable
					onPress={() => navigation.goBack()}
					style={{ marginRight: 'auto' }}>
					<Ionicons name="chevron-back" size={24} color="black" />
				</Pressable>
				<TextInput
					placeholder="Search"
					onChangeText={text => setSearchTerm(text)}
					style={{
						padding: 2,
						borderWidth: 1,
						width: '70%',
						paddingHorizontal: 8,
						borderRadius: 8,

						borderColor: 'red',
						fontSize: 16
					}}
				/>

				<TouchableOpacity
					onPress={() => console.log('pressed')}
					style={{
						width: 'auto',
						paddingLeft: 16
					}}>
					<Text>Search</Text>
				</TouchableOpacity>
			</View>
		</PageContainer>
	)
}

export default SearchScreen
