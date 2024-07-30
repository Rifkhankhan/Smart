import React, { useState, useLayoutEffect, useMemo, useEffect } from 'react'
import {
	FlatList,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import TopTabBar from '../components/TopTabBar'
import ProductListItem from '../components/ProductListItem'
import PageContainer from '../components/PageContainer'
import IconButton from '../UI/IconButton'
import PageTitle from '../components/PageTitle'
import OrderListItem from '../components/OrderListItem'

const OrderListPage = ({ navigation }) => {
	const { orders } = useSelector(state => state.order)

	const ordersData = useMemo(() => Object.values(orders), [orders])

	const [isClicked, setIsClicked] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	const searchHandler = () => {
		setIsClicked(current => !current)
	}

	const searchProducts = useMemo(
		() =>
			ordersData.filter(product =>
				new RegExp(searchQuery, 'i').test(product.name)
			),
		[ordersData, searchQuery]
	)

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<IconButton
					name={isClicked ? 'close' : 'search'}
					color="white"
					size={24}
					onPress={searchHandler}
				/>
			)
		})
	}, [isClicked, navigation, searchHandler])

	const addCustomerHandler = () => {
		navigation.navigate('CreateProduct')
	}

	return (
		<>
			<View style={{ marginBottom: 5 }}>
				<TopTabBar />
			</View>
			<PageContainer>
				<FlatList
					data={searchProducts}
					keyExtractor={order => order?.orderKey}
					renderItem={({ item }) => <OrderListItem order={item} />}
				/>
			</PageContainer>
		</>
	)
}

export default OrderListPage

const styles = StyleSheet.create({
	plusbtn: {
		width: 50,
		height: 50
	},
	plusBtnContainer: {
		position: 'absolute',
		right: 15,
		bottom: 20,
		width: 50,
		height: 50
	},
	searchBarContainer: {
		marginHorizontal: '5%',
		marginVertical: 5,
		borderWidth: 1,
		borderRadius: 5,
		width: '90%',
		padding: 5
	},
	searchBar: {
		padding: 5,
		fontSize: 18,
		height: 40,
		width: '100%'
	}
})
