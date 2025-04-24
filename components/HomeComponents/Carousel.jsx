// import React from 'react'
// import { Dimensions, Text, View } from 'react-native'
// import Carousel from 'react-native-reanimated-carousel'
// import image1 from './../../assets/images/shop2.jpg'
// import image2 from './../../assets/images/shop3.jpg'
// import image3 from './../../assets/images/shop4.jfif'
// import image4 from './../../assets/images/shop5.jfif'
// import { View } from 'react-native'

// carouselItems: [
// 	{
// 		title: 'Item 1',
// 		text: 'Text 1'
// 	},
// 	{
// 		title: 'Item 2',
// 		text: 'Text 2'
// 	},
// 	{
// 		title: 'Item 3',
// 		text: 'Text 3'
// 	},
// 	{
// 		title: 'Item 4',
// 		text: 'Text 4'
// 	},
// 	{
// 		title: 'Item 5',
// 		text: 'Text 5'
// 	}
// ]
// const images = [image1, image2, image3, image4]

// const Carouselcomponent = () => {
// 	const width = Dimensions.get('window').width
// 	return (
// 		<View style={{ flex: 1 }}>
// 			<Carousel
// 				loop
// 				width={width}
// 				height={width / 2}
// 				autoPlay={true}
// 				data={images}
// 				scrollAnimationDuration={1000}
// 				onSnapToItem={index => console.log('current index:', index)}
// 				renderItem={({ index }) => (
// 					<View
// 						style={{
// 							flex: 1,
// 							borderWidth: 1,
// 							justifyContent: 'center'
// 						}}>
// 						<Text style={{ textAlign: 'center', fontSize: 30 }}>Rifkhan</Text>
// 					</View>
// 				)}
// 			/>
// 		</View>
// 	)
// }

// export default Carouselcomponent


import React from 'react'
import { Dimensions, Text, View, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

import image1 from './../../assets/images/shop2.jpg'
import image2 from './../../assets/images/shop3.jpg'
import image3 from './../../assets/images/shop4.jfif'
import image4 from './../../assets/images/shop5.jfif'

const images = [image1, image2, image3, image4]

const Carouselcomponent = () => {
	const width = Dimensions.get('window').width

	return (
		<View style={{ flex: 1 }}>
			<Carousel
				loop
				width={width}
				height={width / 2}
				autoPlay={true}
				data={images}
				scrollAnimationDuration={1000}
				onSnapToItem={index => console.log('current index:', index)}
				renderItem={({ item }) => (
					<View style={{ flex: 1 }}>
						<Image
							source={item}
							style={{
								width: '100%',
								height: '100%',
								resizeMode: 'cover',
								borderRadius: 10
							}}
						/>
					</View>
				)}
			/>
		</View>
	)
}

export default Carouselcomponent
