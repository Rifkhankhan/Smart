import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
const CardProduct = () => {
	const [select, setSelect] = useState(false)

	return (
		<View
			style={{
				backgroundColor: 'white',
				marginVertical: 4,
				paddingHorizontal: 8,
				paddingVertical: 8,
				flexDirection: 'row',
				alignItems: 'center'
			}}>
			{select && (
				<AntDesign
					name="checkcircle"
					size={24}
					color="red"
					onPress={() => setSelect(curr => !curr)}
				/>
			)}
			{!select && (
				<Entypo
					name="circle"
					size={24}
					color="lightgray"
					onPress={() => setSelect(curr => !curr)}
				/>
			)}
			<Image
				source={{
					uri: 'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png'
				}}
				style={{
					width: 80,
					height: 100,
					borderRadius: 4,
					marginHorizontal: 8
				}}
			/>
			<View>
				<View>
					<Text
						numberOfLines={1}
						style={{
							width: Dimensions.get('window').width * 0.65,

							fontSize: 16
						}}>
						Glass water bottle colour helooowev vwevewvwe wfewefsfwf eruvjs{' '}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}>
						<View>
							<Text style={{ color: 'red', fontSize: 12, paddingVertical: 4 }}>
								Only 8 items in stock
							</Text>
							<Text
								style={{
									color: 'red',
									fontSize: 16,
									fontWeight: 600,
									paddingRight: 8
								}}>
								Rs.1515
							</Text>
							<Text style={{ textDecorationLine: 'line-through' }}>
								Rs.2541
							</Text>
						</View>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								paddingVertical: 16
							}}>
							<Text style={{ fontSize: 24, fontWeight: '500', padding: 8 }}>
								-
							</Text>
							<Text style={{ fontSize: 20, fontWeight: '500', padding: 8 }}>
								2
							</Text>
							<Text style={{ fontSize: 24, fontWeight: '500', padding: 8 }}>
								+
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}

export default CardProduct

const styles = StyleSheet.create({})
