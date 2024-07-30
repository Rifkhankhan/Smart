import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

const OrderCard = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white',
				marginVertical: 4,
				padding: 8,
				flexDirection: 'column'
			}}>
			<View
				style={{
					flexDirection: 'row',
					paddingHorizontal: 4,
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
				<View>
					<Text style={{ fontSize: 16, fontWeight: '400' }}>
						Order 6416541654
					</Text>
					<Text style={{ fontSize: 14, fontWeight: '300' }}>
						Placed on 10th may 2023
					</Text>
				</View>

				<Text>Unpaid</Text>
			</View>
			<View
				style={{
					padding: 4,
					flexDirection: 'row',
					paddingVertical: 16
				}}>
				<Image
					source={{
						uri: 'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708938721/man_nvajfu.png'
					}}
					style={{ width: 60, height: 80 }}
				/>

				<View
					style={{
						paddingHorizontal: 8,

						width: Dimensions.get('window').width * 0.8
					}}>
					<Text numberOfLines={3}>
						Pull Up Resistance body stretching band loop power gym fitness
						exercise yoga
					</Text>

					<Text style={{ fontWeight: '700', paddingVertical: 4 }}>Rs.4382</Text>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text>x 1</Text>
						<Text style={{ color: 'red', fontWeight: '500', fontSize: 15 }}>
							Delivered
						</Text>
					</View>
				</View>
			</View>

			<View
				style={{
					paddingVertical: 0,
					paddingHorizontal: 8,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'flex-end'
				}}>
				<Text>1 item,</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}>
					<Text
						style={{
							fontSize: 16,
							paddingLeft: 4
						}}>
						Total
					</Text>
					<Text
						style={{
							color: 'red',
							fontSize: 16,
							paddingHorizontal: 8,
							fontWeight: '600'
						}}>
						Rs.4158
					</Text>
				</View>
			</View>

			<View
				style={{
					justifyContent: 'flex-end',
					paddingTop: 16,
					paddingBottom: 4,
					paddingHorizontal: 8,
					alignItems: 'flex-end'
				}}>
				<Text
					style={{
						padding: 8,
						backgroundColor: 'orange',
						borderRadius: 4,
						color: 'white',
						textAlign: 'center'
					}}>
					Buy again
				</Text>
			</View>
		</View>
	)
}

export default OrderCard

const styles = StyleSheet.create({})
