import {
	FlatList,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import React from 'react'
import ItemsList from './ItemsList'
import { useNavigation } from '@react-navigation/native'
import { Asset } from "expo-asset";
import plusImage from "./../assets/images/plus.png";

const SellerHome = ({ route, navigation }) => {
	const navigate = useNavigation()
	const itemAddHandler = () => {
		navigate.navigate('AddItem')
	}
	return (
		<>
			<ItemsList />
			<TouchableOpacity activeOpacity={0.8} onPress={itemAddHandler}>
				<Image
					source={plusImage}
					style={styles.plusbtn}
				/>
			</TouchableOpacity>
		</>
	)
}

export default SellerHome

const styles = StyleSheet.create({
	plusbtn: {
		position: 'absolute',
		right: '15px',
		bottom: '20px',
		width: '50px',
		height: '50px'
	}
})
