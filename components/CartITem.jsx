// import React, { useCallback, useEffect, useState } from 'react'
// import {
// 	Image,
// 	Pressable,
// 	Text,
// 	TextInput,
// 	TouchableOpacity,
// 	View
// } from 'react-native'
// import { RadioButton } from 'react-native-paper'
// import { useSelector } from 'react-redux'
// import { reducer } from '../utils/reducers/formReducer'

// const initialState = {
// 	inputValues: {
// 		qty: 0,
// 		total: 0
// 	},
// 	inputValidities: {
// 		qty: false,
// 		total: false
// 	},
// 	formIsValid: false
// }
// const CartITem = ({
// 	selectAll,
// 	cart,
// 	selectedItemList,
// 	selectedItemHandler,
// 	seletedItemsData,
// 	setSelectAll
// }) => {
// 	const [qty, setQty] = useState(1)
// 	const [btn, setBtn] = useState('')

// 	const selectedValueHandler = () => {
// 		selectedItemHandler(qty, cart)
// 	}

// 	useEffect(() => {
// 		seletedItemsData(cart, btn, qty)
// 	}, [qty, btn])

// 	const plusHandler = useCallback(() => {
// 		setBtn('+')
// 		setQty(prev => {
// 			if (prev === +cart?.stock) {
// 				return prev
// 			} else {
// 				return prev + 1
// 			}
// 		})
// 	}, [qty])

// 	const minusHandler = useCallback(() => {
// 		setBtn('-')

// 		setQty(prev => {
// 			if (prev === 1) {
// 				return 1
// 			}

// 			return prev - 1
// 		})
// 	}, [qty])

// 	useEffect(() => {
// 		if (!selectAll) {
// 			selectedItemHandler(0, cart)
// 		} else {
// 			selectedValueHandler()
// 		}
// 	}, [selectAll])

// 	return (
// 		<View
// 			style={{
// 				padding: 8,
// 				paddingHorizontal: 2,
// 				elevation: 2,
// 				marginVertical: 4,
// 				backgroundColor: 'white',
// 				flexDirection: 'row'
// 			}}>
// 			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
// 				<RadioButton
// 					key={cart.productKey}
// 					value="option1"
// 					color="#007BFF"
// 					status={
// 						selectedItemList?.find(item => item.productKey === cart.productKey)
// 							? 'checked'
// 							: 'unchecked'
// 					}
// 					onPress={selectedValueHandler}
// 				/>

// 				<Image
// 					width={80}
// 					borderRadius={4}
// 					height={80}
// 					source={{
// 						uri: 'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708930468/shop4_uyti2o.jpg'
// 					}}
// 				/>
// 			</View>

// 			<View style={{ flex: 1, paddingHorizontal: 8 }}>
// 				<View>
// 					<Text>{cart?.name}</Text>
// 					<Text style={{ opacity: 0.3 }}>{cart?.brand}</Text>
// 					<Text style={{ color: 'red' }}>
// 						Only {cart?.stock} items(s) in stock
// 					</Text>
// 				</View>
// 				<View
// 					style={{
// 						flexDirection: 'row',
// 						marginTop: 4,
// 						justifyContent: 'space-between'
// 					}}>
// 					<View>
// 						<Text style={{ color: 'red' }}>Rs.{cart?.price}</Text>
// 						<Text
// 							style={{
// 								opacity: 0.3,
// 								fontSize: 12,
// 								textDecorationLine: 'line-through'
// 							}}>
// 							Rs.{cart?.oPrice}
// 						</Text>
// 					</View>
// 					<View style={{ flexDirection: 'row' }}>
// 						<View
// 							style={{
// 								marginLeft: 'auto',
// 								flexDirection: 'row',
// 								alignItems: 'center'
// 							}}>
// 							<TouchableOpacity onPress={minusHandler}>
// 								<Text
// 									style={{
// 										fontSize: 25,
// 										paddingHorizontal: 4,
// 										margin: 'auto',
// 										justifyContent: 'center',
// 										alignItems: 'center'
// 									}}>
// 									-
// 								</Text>
// 							</TouchableOpacity>

// 							<TouchableOpacity
// 								style={{
// 									margin: 'auto',
// 									justifyContent: 'center',
// 									alignItems: 'center'
// 								}}>
// 								<Text
// 									style={{
// 										fontSize: 20,
// 										paddingHorizontal: 16,
// 										borderRadius: 4,
// 										margin: 'auto',
// 										justifyContent: 'center',
// 										alignItems: 'center',
// 										backgroundColor: 'lightgray'
// 									}}>
// 									{qty}
// 								</Text>
// 							</TouchableOpacity>

// 							<TouchableOpacity onPress={plusHandler}>
// 								<Text
// 									style={{
// 										fontSize: 25,
// 										paddingHorizontal: 4,
// 										margin: 'auto',
// 										justifyContent: 'center',
// 										alignItems: 'center'
// 									}}>
// 									+
// 								</Text>
// 							</TouchableOpacity>
// 						</View>
// 					</View>
// 				</View>
// 			</View>
// 		</View>
// 	)
// }

// export default CartITem


import React, { useCallback, useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import defaultImage from './../assets/images/man.png';

const CartITem = ({
	selectAll,
	cart,
	selectedItemList,
	selectedItemHandler,
	seletedItemsData,
	setSelectAll
}) => {
	const [qty, setQty] = useState(1)

	const isSelected = selectedItemList?.some(
		item => item.productKey === cart.productKey
	)

	const handleSelection = useCallback(() => {
		selectedItemHandler(qty, cart)
	}, [qty, cart, selectedItemHandler])

	useEffect(() => {
		seletedItemsData(cart, qty)
	}, [qty, cart, seletedItemsData])

	useEffect(() => {
		if (!selectAll) {
			selectedItemHandler(0, cart)
		} else {
			handleSelection()
		}
	}, [selectAll, cart, selectedItemHandler, handleSelection])

	const plusHandler = useCallback(() => {
		setQty(prevQty => (prevQty < +cart?.stock ? prevQty + 1 : prevQty))
	}, [cart?.stock])

	const minusHandler = useCallback(() => {
		setQty(prevQty => (prevQty > 1 ? prevQty - 1 : 1))
	}, [])

	return (
		<View
			style={{
				padding: 8,
				marginVertical: 4,
				backgroundColor: 'white',
				flexDirection: 'row',
				elevation: 2
			}}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<RadioButton
					value="selected"
					color="#007BFF"
					status={isSelected ? 'checked' : 'unchecked'}
					onPress={handleSelection}
				/>
				<Image
					source={defaultImage}
					style={{ width: 80, height: 80, borderRadius: 4 }}
				/>
			</View>

			<View style={{ flex: 1, paddingHorizontal: 8 }}>
				<Text>{cart?.name}</Text>
				<Text style={{ opacity: 0.3 }}>{cart?.brand}</Text>
				<Text style={{ color: 'red' }}>
					Only {cart?.stock} item(s) in stock
				</Text>

				<View
					style={{
						flexDirection: 'row',
						marginTop: 4,
						justifyContent: 'space-between',
						alignItems: 'center'
					}}>
					<View>
						<Text style={{ color: 'red' }}>Rs.{cart?.price}</Text>
						<Text
							style={{
								opacity: 0.3,
								fontSize: 12,
								textDecorationLine: 'line-through'
							}}>
							Rs.{cart?.oPrice}
						</Text>
					</View>

					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<TouchableOpacity onPress={minusHandler}>
							<Text style={styles.qtyBtn}>-</Text>
						</TouchableOpacity>

						<Text style={styles.qtyBox}>{qty}</Text>

						<TouchableOpacity onPress={plusHandler}>
							<Text style={styles.qtyBtn}>+</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = {
	qtyBtn: {
		fontSize: 25,
		paddingHorizontal: 8
	},
	qtyBox: {
		fontSize: 20,
		paddingHorizontal: 16,
		borderRadius: 4,
		backgroundColor: 'lightgray',
		marginHorizontal: 4
	}
}

export default CartITem
