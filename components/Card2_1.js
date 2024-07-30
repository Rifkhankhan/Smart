import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeCard from './HomeCard'

const Card2_1 = () => {
	return (
		<View style={styles.container}>
			<HomeCard />
			<HomeCard />
		</View>
	)
}

export default Card2_1

const styles = StyleSheet.create({
  container:{
    flexDirection:'column'
  }
})
