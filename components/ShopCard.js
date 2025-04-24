// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Image } from 'react-native'
// import { TouchableOpacity } from 'react-native'
// import { Ionicons } from '@expo/vector-icons'
// import { useNavigation } from '@react-navigation/native'
// const ShopCard = ({ item }) => {
// 	const navigate = useNavigation()

// 	const detailsHandler = sid => {
// 		navigate.navigate('ViewShop', { sid: item.sid })
// 	}
// 	return (
// 		<TouchableOpacity
// 			style={styles.card}
// 			onPress={() => detailsHandler(item.sid)}>
// 			<Image
// 				source={
// 					item?.image
// 						? item?.image
// 						: {
// 								uri: 'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708930468/shop4_uyti2o.jpg'
// 						  }
// 				}
// 				style={styles.image}
// 			/>
// 			<View style={styles.details}>
// 				<Text numberOfLines={2} style={styles.productName}>
// 					{item.name}
// 				</Text>
// 				<View style={styles.reviewStars}>
// 					{/* <Ionicons name="star" color="yellow" size={20} /> */}
// 					<Text style={styles.reviewRate}>{item.address}</Text>
// 				</View>
// 				<View style={styles.reviewStars}>
// 					{/* <Ionicons name="star" color="yellow" size={20} /> */}
// 					<Text style={styles.reviewRate}>{item.phone}</Text>
// 				</View>
// 			</View>
// 		</TouchableOpacity>
// 	)
// }

// export default ShopCard

// const styles = StyleSheet.create({
// 	card: {
// 		// flex: 1,
// 		height: 300,
// 		backgroundColor: 'white',
// 		width: '48%',
// 		margin: 4
// 	},
// 	image: {
// 		height: '55%',
// 		width: '100%',
// 		objectFit: 'cover'
// 	},
// 	name: {
// 		fontWeight: '500',
// 		fontSize: 18,
// 		textAlign: 'left',
// 		paddingHorizontal: 8
// 	},
// 	price: {
// 		fontWeight: '500',
// 		textAlign: 'justify',

// 		// paddingHorizontal: 8,
// 		fontSize: 18,
// 		color: 'red'
// 	},
// 	details: {
// 		flexDirection: 'column',
// 		paddingHorizontal: 8,
// 		paddingVertical: 4
// 	},
// 	productName: {
// 		fontSize: 18
// 	},
// 	reviewStars: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		paddingTop: 4
// 	},
// 	reviewRate: {
// 		paddingLeft: 4
// 	},
// 	coupons: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		paddingTop: 4
// 	},
// 	coupon1: {
// 		paddingHorizontal: 5,
// 		paddingVertical: 1,
// 		paddingRight: 4,
// 		borderWidth: 1,
// 		borderColor: 'blue',
// 		color: 'blue',
// 		fontSize: 12,
// 		marginRight: 4,
// 		borderRadius: 2
// 	},
// 	coupon2: {
// 		paddingHorizontal: 5,
// 		paddingVertical: 1,
// 		borderWidth: 1,
// 		borderColor: 'red',
// 		color: 'red',

// 		fontSize: 12,
// 		borderRadius: 2
// 	},
// 	priceContainer: {
// 		flexDirection: 'row',
// 		paddingTop: 4,
// 		alignItems: 'center'
// 	}
// })


import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShopCard = React.memo(({ item }) => {
  const navigate = useNavigation();

  // Memoize the details handler to avoid re-creating it on each render
  const detailsHandler = useCallback(() => {
    navigate.navigate('ViewShop', { sid: item.sid });
  }, [navigate, item.sid]);

  // Fallback image for missing images
  const imageSource = item.image
    ? { uri: item.image }
    : { uri: 'https://res.cloudinary.com/deoh6ya4t/image/upload/v1708930468/shop4_uyti2o.jpg' };

  return (
    <TouchableOpacity style={styles.card} onPress={detailsHandler}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.productName}>
          {item.name}
        </Text>
        <View style={styles.reviewStars}>
          <Text style={styles.reviewRate}>{item.address}</Text>
        </View>
        <View style={styles.reviewStars}>
          <Text style={styles.reviewRate}>{item.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    height: 300,
    backgroundColor: 'white',
    width: '48%',
    margin: 4,
  },
  image: {
    height: '55%',
    width: '100%',
    resizeMode: 'cover', // Use resizeMode instead of objectFit
  },
  details: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  productName: {
    fontSize: 18,
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  reviewRate: {
    paddingLeft: 4,
  },
});

export default ShopCard;
