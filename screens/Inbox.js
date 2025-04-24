// import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { useNavigation } from '@react-navigation/native'

// const Inbox = () => {
// 	const navigate = useNavigation()
// 	const viewHandler = () => {
// 		navigate.navigate('ViewMessage')
// 	}
// 	return (
// 		<ScrollView>
// 			<Pressable style={styles.item} onPress={viewHandler}>
// 				<Text style={styles.text}>
// 					Here is a new message for you from customer
// 				</Text>
// 			</Pressable>

// 			<View style={styles.item}>
// 				<Text style={styles.text}>
// 					Here is a new message for you from Admin
// 				</Text>
// 			</View>

// 			<View style={styles.item}>
// 				<Text style={styles.text}>
// 					Here is a new message for you from customer
// 				</Text>
// 			</View>

// 			<View style={styles.item}>
// 				<Text style={styles.text}>
// 					Here is a new message for you from Admin
// 				</Text>
// 			</View>

// 			<View style={styles.item}>
// 				<Text style={styles.text}>
// 					Here is a new message for you from customer
// 				</Text>
// 			</View>

// 			<View style={styles.item}>
// 				<Text style={styles.text}>
// 					Here is a new message for you from Admin
// 				</Text>
// 			</View>

// 			<View style={styles.item}>
// 				<Text style={styles.text}>
// 					Here is a new message for you from customer
// 				</Text>
// 			</View>

// 			<View style={styles.item}>
// 				<Text style={styles.text}>
// 					Here is a new message for you from Admin
// 				</Text>
// 			</View>

// 			<View style={styles.item}>
// 				<Text style={styles.text} numberOfLines={2}>
// 					Here is a new message for you from customer hi it is ok for you i
// 					think blallalladwefewfwe
// 				</Text>
// 			</View>

// 			<View style={styles.item}>
// 				<Text style={styles.text} numberOfLines={2}>
// 					Here is a new message for you from Admin
// 				</Text>
// 			</View>
// 		</ScrollView>
// 	)
// }

// export default Inbox

// const styles = StyleSheet.create({
// 	item: {
// 		width: '95%',
// 		marginVertical: 5,
// 		marginHorizontal: 'auto',
// 		borderRadius: 2,
// 		backgroundColor: '#303030',
// 		padding: 5
// 	},
// 	text: {
// 		color: 'white',
// 		fontSize: 18
// 	}
// })


import React, { useCallback } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Inbox = () => {
  const navigation = useNavigation();

  const messages = [
    { id: '1', text: 'Here is a new message for you from customer', pressable: true },
    { id: '2', text: 'Here is a new message for you from Admin' },
    { id: '3', text: 'Here is a new message for you from customer' },
    { id: '4', text: 'Here is a new message for you from Admin' },
    { id: '5', text: 'Here is a new message for you from customer' },
    { id: '6', text: 'Here is a new message for you from Admin' },
    { id: '7', text: 'Here is a new message for you from customer' },
    { id: '8', text: 'Here is a new message for you from Admin' },
    {
      id: '9',
      text: 'Here is a new message for you from customer hi it is ok for you i think blallalladwefewfwe',
      long: true,
    },
    { id: '10', text: 'Here is a new message for you from Admin' },
  ];

  const viewHandler = useCallback(() => {
    navigation.navigate('ViewMessage');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }) => {
      const ItemComponent = item.pressable ? Pressable : View;
      return (
        <ItemComponent
          style={styles.item}
          onPress={item.pressable ? viewHandler : null}
        >
          <Text style={styles.text} numberOfLines={item.long ? 2 : 1}>
            {item.text}
          </Text>
        </ItemComponent>
      );
    },
    [viewHandler]
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  item: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#303030',
    padding: 12,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
