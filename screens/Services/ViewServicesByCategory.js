import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import PageContainer from '../../components/PageContainer';
import { TextInput } from 'react-native';

const ViewServicesByCategory = ({ navigation, route }) => {

      const [isClicked, setIsClicked] = useState(false);
      const [searchQuery, setSearchQuery] = useState("");
    
    const { data } = route.params; // Access the passed data
    const searchHandler = () => {
        setSearchQuery("");
        setIsClicked((current) => !current);
      };

    return (
        <PageContainer>
                <View
                style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 8,
                }}
            >
                <View style={{marginVertical:10,flexDirection:'row',justifyContent:'space-between',flex:1}}>

                <Ionicons
                    name="backspace-outline"
                    color="lightgray"
                    size={30}
                    onPress={() => navigation.goBack()}
                    />

                {!isClicked && (
                    <Ionicons
                    name="search"
                    color="lightgray"
                    size={30}
                    onPress={searchHandler}
                    />
                )}
                </View>
      </View>
      {isClicked && (
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="Type..."
            style={styles.searchBar}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />

          <Ionicons
            name="close"
            color="gray"
            size={20}
            style={{ position: "absolute", right: 0, top: 2 }}
            onPress={searchHandler}
          />
        </View>
      )}
        <View style={styles.container}>
        <PageTitle text={`${data[0]?.type.charAt(0).toUpperCase() + data[0]?.type.slice(1)} Services`.substring(0, 25)} />
       
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()} // Unique key for each card
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ViewService', { service: item })}
                    >
                        <Image
                            source={ item.images[0] } // Dynamic image
                            style={styles.cardImage}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardDescription}>
                                {item.description.length > 50
                                    ? item.description.substring(0, 50) + '...'
                                    : item.description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                numColumns={2} // Display two cards per row
                columnWrapperStyle={styles.row} // Space between rows
            />
        </View>

</PageContainer>

    );
};

export default ViewServicesByCategory;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f0f4f8', // Light background for a clean look
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        // color: 'black',
    },
    row: {
        justifyContent: 'space-between', // Space between columns
        marginBottom: 15, // Space between rows
    },
    card: {
        flex: 1, // Ensure cards stretch evenly
        backgroundColor: '#fff', // White card background
        borderRadius: 15, // Rounded corners for modern design
        margin: 5, // Space between cards
        overflow: 'hidden', // Ensure content stays within the card
        elevation: 3, // Elevation for shadow (Android)
    },
    cardImage: {
        width: '100%',
        height: 120, // Fixed height for the image
        resizeMode: 'cover', // Ensure image scales nicely
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDescription: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    }, searchBarContainer: {
        position: "relative",
        flexDirection: "row",
        marginHorizontal: "5%",
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: "90%",
      },
      searchBar: {
        padding: 5,
        fontSize: 16,
        height: 25,
        width: "100%",
      },
});
