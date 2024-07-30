import React, {
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState
} from 'react'
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native'
import BottomSheet, {
	BottomSheetFooter,
	BottomSheetScrollView,
	BottomSheetView
} from '@gorhom/bottom-sheet'
import { AntDesign, Feather } from '@expo/vector-icons'
import { reducer } from '../utils/reducers/formReducer'
import { useDispatch, useSelector } from 'react-redux'
import { validateInput } from '../utils/actions/formActions'

const initialState = {
	inputValues: {
		qty: 0,
		total: 0
	},
	inputValidities: {
		qty: false,
		total: false
	},
	formIsValid: false
}

const BuyNowBottomSheet = ({ product, open, setOpen, placeOrderHandler }) => {
	const { authData } = useSelector(state => state.auth)
	const [formState, dispatchFormState] = useReducer(reducer, initialState)

	const [error, setError] = useState()
	const [isLoading, setIsLoading] = useState(false)

	const placeOrderHandlerData = () => {
		placeOrderHandler({
			...formState.inputValues,
			uid: authData.uid,
			productKey: product?.productKey,
			shopKey: product?.shop,

			total: product?.price * formState.inputValues.qty + 100
		})
	}

	const CustomBotttomSheetBar = () => {
		return (
			<View style={styles.container}>
				<View style={styles.priceContainer}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={{ fontSize: 20 }}>Total : </Text>
						<Text>
							<Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>
								Rs.
							</Text>{' '}
							<Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>
								{product?.price * formState.inputValues.qty + 100}
							</Text>
						</Text>
					</View>
				</View>
				<View style={styles.rightBtnsContainer}>
					<Pressable
						onPress={placeOrderHandlerData}
						style={styles.addToCardbutton}>
						<Text style={styles.buttonText}>Place Order</Text>
					</Pressable>
				</View>
			</View>
		)
	}

	const sheetRef = useRef(null)
	const dispatch = useDispatch()

	const sheetSize = ['85%']

	useEffect(() => {
		sheetRef?.current?.snapToIndex(0)
	}, [])

	useEffect(() => {
		if (error) {
			Alert.alert('An error occured', error, [{ text: 'Okay' }])
		}
	}, [error])

	useEffect(() => {
		sheetRef?.current?.snapToIndex(0)
	}, [])

	const plusHandler = useCallback(() => {
		dispatchFormState({ type: 'plus' })
	}, [dispatchFormState])

	const minusHandler = useCallback(() => {
		dispatchFormState({ type: 'minus' })
	}, [dispatchFormState])

	return (
		<BottomSheet
			ref={sheetRef}
			snapPoints={sheetSize}
			onClose={() => setOpen(false)}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>But now</Text>
				<Pressable onPress={() => setOpen(false)} style={styles.closeButton}>
					<AntDesign
						style={styles.closeButtonText}
						name="close"
						size={24}
						color="black"
					/>
				</Pressable>
			</View>
			<BottomSheetScrollView>
				<View style={{ marginBottom: 55, marginTop: 5 }}>
					{/* product details */}
					<View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
						<View style={{ flex: 2 }}>
							<Image
								style={{ width: 150, height: 150, borderRadius: 5 }}
								source={{
									uri: 'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708858980/cld-sample-5.jpg'
								}}
							/>
						</View>
						<View style={{ flex: 2.3, paddingVertical: 5 }}>
							<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
								{product?.name}
							</Text>
							<Text style={{ fontSize: 18, color: 'red' }}>
								Rs.{product?.price}
							</Text>
							<Text
								style={{ fontSize: 12, textDecorationLine: 'line-through' }}>
								Rs.{product?.oPrice}
							</Text>
						</View>
					</View>

					{/* colors */}
					<View
						style={{
							marginVertical: 10,
							paddingVertical: 5,
							paddingHorizontal: 10,
							borderTopWidth: 0.5,
							borderBottomWidth: 0.5,
							borderColor: 'aqua'
						}}>
						<View>
							<Text style={{ fontSize: 18 }}>Color</Text>
						</View>
						<View
							style={{ marginTop: 5, flexDirection: 'row', flexWrap: 'wrap' }}>
							{[...Array(10)].map((_, index) => (
								<View key={index} style={{ alignItems: 'center', margin: 5 }}>
									<Image
										width={50}
										height={50}
										borderRadius={5}
										source={{
											uri: 'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708858980/cld-sample-5.jpg'
										}}
									/>
									<Text>Color {index + 1}</Text>
								</View>
							))}
						</View>
					</View>

					{/* quantity */}

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginVertical: 10,

							paddingHorizontal: 10
						}}>
						<Text style={{ marginRight: 'auto', fontSize: 18 }}>Quantity</Text>
						<View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
							<Pressable onPress={minusHandler}>
								<Text
									style={{
										fontSize: 20,
										paddingHorizontal: 8,
										borderWidth: 0.5
									}}>
									-
								</Text>
							</Pressable>

							<View
								style={{
									margin: 'auto',
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<Text> {formState.inputValues.qty}</Text>
							</View>

							<Pressable onPress={plusHandler}>
								<Text
									style={{
										fontSize: 20,
										paddingHorizontal: 8,
										borderWidth: 0.5
									}}>
									+
								</Text>
							</Pressable>
						</View>
					</View>

					{/* summary details */}
					<View style={{ paddingHorizontal: 10 }}>
						<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
							Order Summary
						</Text>
						<View style={{ paddingHorizontal: 5 }}>
							{/* {[
								{ label: 'Items Total', amount: product?.price },
								{ label: 'Delivery Fee', amount: 100 },
								{ label: 'Total Payment', amount: ((product?.price * formState.inputValues.qty) + 100 }
							] */}

							<View style={{ flexDirection: 'row', paddingVertical: 3 }}>
								<Text style={{ marginRight: 'auto', fontSize: 17 }}>
									Items Total
								</Text>
								<Text style={{ fontSize: 17 }}>{product?.price}</Text>
							</View>

							<View style={{ flexDirection: 'row', paddingVertical: 3 }}>
								<Text style={{ marginRight: 'auto', fontSize: 17 }}>
									Delivery Fee
								</Text>
								<Text style={{ fontSize: 17 }}>100</Text>
							</View>

							<View style={{ flexDirection: 'row', paddingVertical: 3 }}>
								<Text style={{ marginRight: 'auto', fontSize: 17 }}>
									Total Payment
								</Text>
								<Text style={{ fontSize: 17 }}>
									{product?.price * formState.inputValues.qty + 100}
								</Text>
							</View>
						</View>
					</View>
				</View>
			</BottomSheetScrollView>

			{open && <CustomBotttomSheetBar />}
		</BottomSheet>
	)
}

export default BuyNowBottomSheet

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		elevation: 2,
		paddingVertical: 0,
		marginVertical: 0,
		backgroundColor: 'white'
	},
	headerTitle: {
		fontSize: 18,
		margin: 'auto',
		paddingVertical: 0,
		marginVertical: 0,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	closeButton: {
		paddingVertical: 5,
		marginVertical: 0
	},
	closeButtonText: {
		fontSize: 20,

		color: 'black'
	},
	container: {
		flexDirection: 'row',

		alignItems: 'center',
		elevation: 20,
		paddingVertical: 6,
		paddingHorizontal: 2,
		backgroundColor: 'white',
		borderTopColor: 'aqua',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0
	},

	priceContainer: {
		marginLeft: 10,
		marginRight: 'auto',
		flexDirection: 'row'
	},
	priceContainerTotal: {
		fontSize: 20
	},
	rightBtnsContainer: {
		flexDirection: 'row',
		marginLeft: 'auto'
	},
	addToCardbutton: {
		padding: 12,
		elevation: 4,
		marginLeft: 'auto',
		marginRight: 10,
		borderWidth: 0,

		borderRadius: 4,
		backgroundColor: '#ff5400'
	},
	buttonText: {
		fontSize: 14,
		color: 'white',
		paddingHorizontal: 8
	}
})
