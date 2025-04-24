// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { TextInput } from 'react-native'
// import { Button } from 'react-native'
// import { Pressable } from 'react-native'

// const ViewMessage = () => {
// 	return (
// 		<View>
// 			<View style={styles.container}>
// 				<Text style={styles.text}>
// 					Hi this is the message for you from one of the customer, you can
// 					discuss with them Hi this is the message for you from one of the
// 					customer, you can discuss with them
// 				</Text>

// 				<Text style={styles.date}>2024-1-22 9.45Am</Text>
// 			</View>

// 			<View style={styles.from}>
// 				<Text style={styles.fromText}>From : </Text>
// 				<Text style={styles.fromText}>Rifkhan</Text>
// 			</View>

// 			<View style={styles.replyContainer}>
// 				<TextInput
// 					placeholder="Enter your Reply"
// 					multiline={true}
// 					style={styles.reply}
// 				/>
// 			</View>

// 			<View style={styles.btnContainer}>
// 				<Button title="Send Reply" />
// 			</View>
// 		</View>
// 	)
// }

// export default ViewMessage

// const styles = StyleSheet.create({
// 	btnContainer: {
// 		marginHorizontal: 'auto',
// 		marginVertical: 10,
// 		width: '90%'
// 	},
// 	container: {
// 		padding: 5,
// 		borderWidth: 1,
// 		margin: 5
// 	},
// 	replyContainer: {
// 		padding: 5
// 	},
// 	reply: {
// 		padding: 5,
// 		fontSize: 20,
// 		borderWidth: 1
// 	},
// 	text: {
// 		fontSize: 20
// 	},
// 	date: {
// 		fontSize: 12,
// 		marginTop: 5
// 	},
// 	from: {
// 		display: 'flex',
// 		flexDirection: 'row',
// 		justifyContent: 'center'
// 	},
// 	fromText: {
// 		fontSize: 20
// 	}
// })


import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native'

const ViewMessage = () => {
  const [reply, setReply] = useState('')

  // Memoize the handler to avoid re-creating it on each render
  const handleReplyChange = useCallback((text) => {
    setReply(text)
  }, [])

  const handleSendReply = () => {
    // Logic to send the reply (e.g., API call, state update, etc.)
    console.log('Reply Sent:', reply)
  }

  return (
    <View style={styles.container}>
      {/* Message Section */}
      <View style={styles.messageContainer}>
        <Text style={styles.text}>
          Hi, this is the message for you from one of the customers, you can
          discuss with them. Hi, this is the message for you from one of the
          customers, you can discuss with them.
        </Text>
        <Text style={styles.date}>2024-01-22 9:45 AM</Text>
      </View>

      {/* From Section */}
      <View style={styles.from}>
        <Text style={styles.fromText}>From: </Text>
        <Text style={styles.fromText}>Rifkhan</Text>
      </View>

      {/* Reply Section */}
      <View style={styles.replyContainer}>
        <TextInput
          placeholder="Enter your Reply"
          multiline
          value={reply}
          onChangeText={handleReplyChange}
          style={styles.reply}
        />
      </View>

      {/* Send Button */}
      <View style={styles.btnContainer}>
        <Button title="Send Reply" onPress={handleSendReply} />
      </View>
    </View>
  )
}

export default ViewMessage

const styles = StyleSheet.create({
  btnContainer: {
    marginHorizontal: 'auto',
    marginVertical: 10,
    width: '90%',
  },
  container: {
    flex: 1, // Added flex to make sure container expands
    padding: 10,
    borderWidth: 1,
    margin: 5,
    backgroundColor: '#fff', // Added background color for clarity
  },
  messageContainer: {
    marginBottom: 10, // Space between message and other sections
  },
  replyContainer: {
    marginTop: 15, // Add some spacing
  },
  reply: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5, // Rounded corners for text input
    minHeight: 100, // Ensures multiline input has a decent height
  },
  text: {
    fontSize: 18,
    lineHeight: 25, // Add line height to improve readability
  },
  date: {
    fontSize: 12,
    marginTop: 5,
    color: '#888', // Lighter color for the date
  },
  from: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align text to the left
    marginTop: 10,
  },
  fromText: {
    fontSize: 16,
    color: '#333',
  },
})
