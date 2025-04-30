import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PageContainer from "../../components/PageContainer";
import { TextInput } from "react-native";
import PageTitle from "../../components/PageTitle";

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
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Ionicons
            name="arrow-back-sharp"
            color="black"
            size={30}
            onPress={() => navigation.goBack()}
            style={{ marginRight: 10 }}
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
        <PageTitle
          text={`${
            data[0]?.type.charAt(0).toUpperCase() + data[0]?.type.slice(1)
          } Services`.substring(0, 25)}
        />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()} // Unique key for each card
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("ViewService", { service: item })
              }
              activeOpacity={0.85}
            >
              <Image
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.name}
                </Text>

                {item.category && (
                  <Text style={styles.cardCategory}>{item.category}</Text>
                )}

                {item.description && (
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                )}

                <View style={styles.infoRow}>
                  <Text style={styles.cardRatings}>
                    ⭐ {item.ratings?.toFixed(1) || "N/A"}
                  </Text>
                  <Text style={styles.cardSold}>
                    🔥 {item.soldCount || 0} used
                  </Text>
                </View>

                {item.price && (
                  <Text style={styles.cardPrice}>From ${item.price}</Text>
                )}
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
    backgroundColor: "#f0f4f8", // Light background for a clean look
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    // color: 'black',
  },
  row: {
    justifyContent: "space-between", // Space between columns
    marginBottom: 15, // Space between rows
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 6,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    transition: "all 0.3s",
  },

  cardImage: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
  },

  cardContent: {
    padding: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  cardCategory: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    textTransform: "capitalize",
  },

  cardDescription: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  cardRatings: {
    fontSize: 12,
    color: "#28a745",
    fontWeight: "500",
  },

  cardSold: {
    fontSize: 12,
    color: "#ff5722",
    fontWeight: "500",
  },

  cardPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0077cc",
    marginTop: 6,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardDescription: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  searchBarContainer: {
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
  cardCategory: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  cardCategory: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  cardDescription: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
});

// import React, { useState, useCallback, useMemo } from 'react';
// import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
// import { Ionicons } from "@expo/vector-icons";
// import PageContainer from '../../components/PageContainer';
// import { useDebounce } from 'use-debounce';

// const ViewServicesByCategory = ({ navigation, route }) => {
//   const [isClicked, setIsClicked] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // 500ms debounce

//   const { data } = route.params; // Access the passed data

//   const searchHandler = () => {
//     setSearchQuery("");
//     setIsClicked((current) => !current);
//   };

//   // Memoize filtered data to avoid unnecessary re-renders
//   const filteredData = useMemo(() => {
//     return data.filter(item =>
//       item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
//     );
//   }, [data, debouncedSearchQuery]);

//   // Memoize the flatlist render item for performance
//   const renderItem = useCallback(({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.card}
//         onPress={() => navigation.navigate('ViewService', { service: item })}
//       >
//         <Image
//           source={item.images[0]} // Dynamic image
//           style={styles.cardImage}
//         />
//         <View style={styles.cardContent}>
//           <Text style={styles.cardTitle}>{item.name}</Text>
//           <Text style={styles.cardDescription}>
//             {item.description.length > 50
//               ? item.description.substring(0, 50) + '...'
//               : item.description}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   }, [navigation]);

//   return (
//     <PageContainer>
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <Ionicons
//             name="backspace-outline"
//             color="lightgray"
//             size={30}
//             onPress={() => navigation.goBack()}
//           />
//           {!isClicked && (
//             <Ionicons
//               name="search"
//               color="lightgray"
//               size={30}
//               onPress={searchHandler}
//             />
//           )}
//         </View>
//       </View>

//       {isClicked && (
//         <View style={styles.searchBarContainer}>
//           <TextInput
//             placeholder="Type..."
//             style={styles.searchBar}
//             onChangeText={setSearchQuery}
//             value={searchQuery}
//           />
//           <Ionicons
//             name="close"
//             color="gray"
//             size={20}
//             style={styles.closeIcon}
//             onPress={searchHandler}
//           />
//         </View>
//       )}

//       <View style={styles.container}>
//         <PageTitle text={`${data[0]?.type.charAt(0).toUpperCase() + data[0]?.type.slice(1)} Services`.substring(0, 25)} />

//         <FlatList
//           data={filteredData} // Using filtered data
//           keyExtractor={(item) => item.id.toString()} // Unique key for each card
//           renderItem={renderItem} // Memoized renderItem
//           numColumns={2} // Display two cards per row
//           columnWrapperStyle={styles.row} // Space between rows
//           initialNumToRender={10} // Start with rendering 10 items
//           maxToRenderPerBatch={10} // Max items per batch
//           windowSize={21} // Number of items to keep in the viewport
//         />
//       </View>
//     </PageContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#f0f4f8',
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 8,
//   },
//   headerContent: {
//     marginVertical: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flex: 1,
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   card: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     margin: 5,
//     overflow: 'hidden',
//     elevation: 3,
//   },
//   cardImage: {
//     width: '100%',
//     height: 120,
//     resizeMode: 'cover',
//   },
//   cardContent: {
//     padding: 10,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   cardDescription: {
//     fontSize: 14,
//     color: '#777',
//     marginTop: 5,
//   },
//   searchBarContainer: {
//     position: "relative",
//     flexDirection: "row",
//     marginHorizontal: "5%",
//     marginVertical: 5,
//     borderWidth: 1,
//     borderRadius: 5,
//     width: "90%",
//   },
//   searchBar: {
//     padding: 5,
//     fontSize: 16,
//     height: 25,
//     width: "100%",
//   },
//   closeIcon: {
//     position: "absolute",
//     right: 0,
//     top: 2,
//   },
// });

// export default ViewServicesByCategory;
