// import React from 'react'
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import image from './../assets/images/albert-dera-ILip77SbmOE-unsplash.jpg'
// import { useNavigation } from '@react-navigation/native'

// const UserListItem = ({ customer }) => {
// 	const navigation = useNavigation()
// 	return (
// 		<TouchableOpacity
// 			style={styles.container}
// 			onPress={() => navigation.navigate('ViewPerson', { customer })}>
// 			<Image
// 				source={
// 					customer?.profilePicture ? { uri: customer?.profilePicture } : image
// 				}
// 				style={styles.propic}
// 			/>
// 			<View style={styles.textContainer}>
// 				<Text style={styles.name}>{customer?.firstLast}</Text>
// 				<Text>{customer?.nic}</Text>
// 			</View>
// 		</TouchableOpacity>
// 	)
// }

// export default UserListItem

// const styles = StyleSheet.create({
// 	container: {
// 		flexDirection: 'row',
// 		backgroundColor: '#ccc',
// 		elevation: 3,
// 		marginHorizontal: 8,
// 		marginVertical: 2,
// 		borderRadius: 5,
// 		alignItems: 'center', // Align items vertically centered
// 		padding: 5 // Add padding for better spacing
// 	},
// 	name: {
// 		fontSize: 15,
// 		fontWeight: 'bold'
// 	},
// 	propic: {
// 		width: 50, // Adjust size as needed
// 		height: 50, // Adjust size as needed
// 		borderRadius: 25, // Make it circular
// 		marginRight: 10 // Add margin to separate from text
// 	},
// 	textContainer: {
// 		flex: 1 // Allow text container to take up remaining space
// 	}
// })


import React, { useCallback } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import image from "./../assets/images/shop2.jpg";

import { useNavigation } from '@react-navigation/native'

const UserListItem = React.memo(({ customer }) => {
  const navigation = useNavigation()

  const handlePress = useCallback(() => {
    navigation.navigate('ViewPerson', { customer })
  }, [navigation, customer])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
    >
      <Image
        source={customer?.profilePicture ? { uri: customer?.profilePicture } : image}
        style={styles.propic}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{customer?.firstLast}</Text>
        <Text>{customer?.nic}</Text>
      </View>
    </TouchableOpacity>
  )
})

export default UserListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    elevation: 3,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 5,
    alignItems: 'center', // Align items vertically centered
    padding: 5 // Add padding for better spacing
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  propic: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    borderRadius: 25, // Make it circular
    marginRight: 10 // Add margin to separate from text
  },
  textContainer: {
    flex: 1 // Allow text container to take up remaining space
  }
})
