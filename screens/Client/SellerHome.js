// import {
// 	FlatList,
// 	Image,
// 	ScrollView,
// 	StyleSheet,
// 	Text,
// 	TouchableOpacity,
// 	View
// } from 'react-native'
// import React from 'react'
// import ItemsList from './../Client/ItemsList'
// import { useNavigation } from '@react-navigation/native'
// import plusImage from "./../assets/images/plus.png";

// const SellerHome = ({ route, navigation }) => {
// 	const navigate = useNavigation()
// 	const itemAddHandler = () => {
// 		navigate.navigate('AddItem')
// 	}
// 	return (
// 		<>
// 			<ItemsList />
// 			<TouchableOpacity activeOpacity={0.8} onPress={itemAddHandler}>
// 				<Image
// 					source={plusImage}
// 					style={styles.plusbtn}
// 				/>
// 			</TouchableOpacity>
// 		</>
// 	)
// }

// export default SellerHome

// const styles = StyleSheet.create({
// 	plusbtn: {
// 		position: 'absolute',
// 		right: '15px',
// 		bottom: '20px',
// 		width: '50px',
// 		height: '50px'
// 	}
// })


import React, { useCallback } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ItemsList from './../Client/ItemsList'
import plusImage from './../../assets/images/plus.png'

const SellerHome = React.memo(({ route, navigation }) => {
  const navigate = useNavigation()

  // Memoize itemAddHandler to avoid unnecessary re-renders
  const itemAddHandler = useCallback(() => {
    navigate.navigate('AddItem')
  }, [navigate])

  return (
    <>
      <ItemsList />
      <TouchableOpacity activeOpacity={0.8} onPress={itemAddHandler}>
        <Image source={plusImage} style={styles.plusbtn} />
      </TouchableOpacity>
    </>
  )
})

export default SellerHome

const styles = StyleSheet.create({
  plusbtn: {
    position: 'absolute',
    right: 15,  // Directly use number values instead of string percentage
    bottom: 20,
    width: 50,  // Removed unnecessary string values
    height: 50,  // Removed unnecessary string values
  },
})
