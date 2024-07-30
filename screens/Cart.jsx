import React, { useEffect, useState, useCallback } from 'react'
import {
	Button,
	FlatList,
	Pressable,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CartITem from '../components/CartITem'
import { RadioButton } from 'react-native-paper'
import { removeCart } from '../store/cartSlice'
import { checkOut, deleteCart } from '../utils/actions/cartActions'

const Cart = ({ route, navigation }) => {
	const { carts } = useSelector(state => state.cart)
	const { authData } = useSelector(state => state.auth)
	const [selectAll, setSelectAll] = useState(false)
	const [selectedItemList, setSelectedItemList] = useState([])
	const [total, setTotal] = useState(0)
	const dispatch = useDispatch()

	useEffect(() => {
		if (selectAll) {
			setSelectedItemList(carts)
		} else {
			setTotal(0)
			setSelectedItemList([])
		}
	}, [selectAll, carts])

	useEffect(() => {
		navigation.setOptions({
			headerShown: true,
			headerTitle: `My Cart(${carts?.length})`,
			headerRight: () => (
				<TouchableOpacity onPress={deleteHandler}>
					<Text style={{ paddingRight: 12, fontSize: 16 }}>Delete</Text>
				</TouchableOpacity>
			)
		})
	}, [navigation, selectAll, selectedItemList])

	const selectedItemHandler = (qty, cart) => {
		setSelectedItemList(prevList => {
			const itemIndex = prevList.findIndex(
				product => product.productKey === cart.productKey
			)
			const totalPrice = +cart?.price * +qty

			if (itemIndex > -1) {
				if (!selectAll) {
					setTotal(prev => +prev - +totalPrice)
					const updatedList = prevList.filter(
						product => product.productKey !== cart.productKey
					)
					return updatedList
				}
				return prevList
			} else {
				setTotal(prev => +prev + +totalPrice)
				cart = { ...cart, qty: qty }
				return [...prevList, cart]
			}
		})
	}

	const seletedItemsData = (cart, btn, qty) => {
		if (
			selectedItemList.some(product => product.productKey === cart.productKey)
		) {
			const price = cart?.price
			if (btn === '+') {
				setSelectedItemList(prevList =>
					prevList.map(product =>
						product.productKey === cart.productKey
							? { ...product, qty: qty }
							: product
					)
				)
				setTotal(prev => +prev + +price)
			} else if (btn === '-') {
				setTotal(prev => {
					const item = selectedItemList.find(
						product => product.productKey === cart.productKey
					)
					if (item) {
						const newTotal = +prev - +price
						return newTotal < 0 ? 0 : newTotal
					}
					return prev
				})
			}
		}
	}

	const checkoutHandler = async () => {
		if (selectedItemList.length) {
			const action = await checkOut(authData.uid, selectedItemList)
			dispatch(action)
		}
		setSelectedItemList([])
		setTotal(0)
	}

	const deleteHandler = async () => {
		// Filter out the selected items from carts

		if (selectedItemList.length) {
			const action = await deleteCart(authData.uid, selectedItemList)
			dispatch(action)
		}
		setSelectedItemList([])
		setTotal(0)
	}

	const BottomTab = () => (
		<View
			style={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0,
				elevation: 4
			}}>
			<View
				style={{
					flexDirection: 'row',
					backgroundColor: 'white',
					padding: 8,
					alignItems: 'center'
				}}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<RadioButton
						key="all"
						value="All"
						color="#007BFF"
						status={
							selectAll && selectedItemList.length === carts.length
								? 'checked'
								: 'unchecked'
						}
						onPress={() => setSelectAll(prev => !prev)}
					/>
					<Text style={{ fontSize: 18 }}>All</Text>
				</View>
				<View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
					<View
						style={{
							justifyContent: 'space-around',
							padding: 4,
							paddingHorizontal: 8
						}}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 12, opacity: 0.5 }}>Delivery :</Text>
							<Text style={{ fontSize: 12, opacity: 0.5 }}>Rs.165</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ fontSize: 15 }}>Total :</Text>
							<Text style={{ fontSize: 15, color: 'red', fontWeight: 'bold' }}>
								Rs.{total}
							</Text>
						</View>
					</View>
					<Pressable
						onPress={checkoutHandler}
						style={{ padding: 2, backgroundColor: 'red', borderRadius: 8 }}>
						<Text
							style={{
								color: 'white',
								fontWeight: '500',
								margin: 'auto',
								padding: 8,
								fontSize: 15
							}}>
							Check Out ({selectedItemList.length})
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	)

	return (
		<>
			<View style={{ position: 'relative', flex: 1 }}>
				<FlatList
					data={carts}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<CartITem
							selectAll={selectAll}
							cart={item}
							selectedItemList={selectedItemList}
							selectedItemHandler={selectedItemHandler}
							seletedItemsData={seletedItemsData}
							setSelectAll={setSelectAll}
						/>
					)}
				/>
			</View>
			<BottomTab />
		</>
	)
}

export default Cart
