import React from "react";
import { FlatList, Pressable, TouchableOpacity, View } from "react-native";
import ServicesCard from "./ServicesCard";
import { StyleSheet, Text } from "react-native";
import quickdelivery from "./../../assets/images/service/quickdelivery.jpg";
import rent from "./../../assets/images/service/rent.jpg";
import homemadethings from "./../../assets/images/service/homemadethings.jpg";
import homemadefoods from "./../../assets/images/service/homemadefood.jpg";
import { useNavigation } from "@react-navigation/native";

const ServiceListComponent = ({ title, subTitle }) => {
  const navigation = useNavigation();
  const onPressHandler = () => {
    navigation.navigate("ServiceStack");
  };

  const services = [
    // Delivery
    {
      id: 1,
      name: "Quick Delivery",
      availability: "yes",
      chargePerKM: 150,
      oldChargePerKM: 400,
      type: "delivery",
      contact: "2758569360",
      address: "45 Main Road, Palamunai",
      description: "Fast and reliable delivery service for goods.",
      ratings: 4.8,
      images: [
        quickdelivery,
        "https://example.com/images/quickdelivery2.jpg",
        "https://example.com/images/quickdelivery3.jpg",
      ],
      tags: ["fast", "reliable", "affordable"],
      provider: "Smart",
    },
    {
      id: 2,
      name: "Express Courier",
      availability: "yes",
      chargePerKM: 200,
      type: "delivery",
      contact: "2758569361",
      address: "12 Sunset Boulevard, Colombo",
      description: "Same-day courier services for documents and parcels.",
      ratings: 4.6,
      images: [
        "https://example.com/images/expresscourier1.jpg",
        "https://example.com/images/expresscourier2.jpg",
        "https://example.com/images/expresscourier3.jpg",
      ],
      tags: ["express", "secure", "timely"],
      provider: "Smart",
    },
    {
      id: 3,
      name: "Eco Delivery",
      availability: "yes",
      chargePerKM: 120,
      type: "delivery",
      contact: "2758569362",
      address: "Green Hub, Kandy",
      description: "Affordable and environmentally friendly delivery.",
      ratings: 4.5,
      images: [
        "https://example.com/images/ecodelivery1.jpg",
        "https://example.com/images/ecodelivery2.jpg",
        "https://example.com/images/ecodelivery3.jpg",
      ],
      tags: ["eco-friendly", "affordable", "reliable"],
      provider: "Smart",
    },

    // Food Making
    {
      id: 4,
      name: "Home Food Make",
      availability: "yes",
      chargePerItem: 500,
      oldChargePerItem: 400,
      type: "food making",
      duration: "3 days",
      contact: "2758569360",
      address: "45 Main Road, Palamunai",
      description:
        "Delicious home-cooked meals made with care and quality ingredients.",
      ratings: 4.5,
      images: [
        "https://example.com/images/homefoodmake1.jpg",
        "https://example.com/images/homefoodmake2.jpg",
        "https://example.com/images/homefoodmake3.jpg",
      ],
      tags: ["homemade", "tasty", "quality"],
      provider: "Masiya",
    },
    {
      id: 5,
      name: "Tasty Treats",
      availability: "yes",
      chargePerItem: 350,
      type: "food making",
      contact: "2758569361",
      address: "15 High Street, Colombo",
      description: "Satisfying cravings with fresh and healthy meals.",
      ratings: 4.8,
      images: [
        "https://example.com/images/tastytreats1.jpg",
        "https://example.com/images/tastytreats2.jpg",
        "https://example.com/images/tastytreats3.jpg",
      ],
      tags: ["fresh", "tasty", "quality"],
      provider: "Rifnas",
    },
    {
      id: 6,
      name: "Healthy Eats",
      availability: "yes",
      chargePerItem: 450,
      type: "food making",
      contact: "2758569362",
      address: "32 Wellness Lane, Maharagama",
      description: "Nutritious and tasty meals tailored for your health.",
      ratings: 4.6,
      images: [
        "https://example.com/images/healthyeats1.jpg",
        "https://example.com/images/healthyeats2.jpg",
        "https://example.com/images/healthyeats3.jpg",
      ],
      tags: ["healthy", "nutritious", "homemade"],
      provider: "Mafa",
    },

    // Cleaning
    {
      id: 7,
      name: "Sparkle Cleaning",
      availability: "yes",
      chargePerHour: 300,
      type: "cleaning",
      contact: "2758569363",
      address: "10 Service Lane, Colombo",
      description: "Professional home and office cleaning services.",
      ratings: 4.8,
      images: [
        "https://example.com/images/sparklecleaning1.jpg",
        "https://example.com/images/sparklecleaning2.jpg",
        "https://example.com/images/sparklecleaning3.jpg",
      ],
      tags: ["professional", "efficient", "affordable"],
      provider: "Someone",
    },
    {
      id: 8,
      name: "Shiny Spaces",
      availability: "yes",
      chargePerHour: 250,
      type: "cleaning",
      contact: "2758569364",
      address: "20 Bright Road, Colombo",
      description: "Detailed and thorough cleaning for your space.",
      ratings: 4.6,
      images: [
        "https://example.com/images/shinyspaces1.jpg",
        "https://example.com/images/shinyspaces2.jpg",
        "https://example.com/images/shinyspaces3.jpg",
      ],
      tags: ["thorough", "reliable", "efficient"],
      provider: "Someone1",
    },
    {
      id: 9,
      name: "Eco Cleaners",
      availability: "yes",
      chargePerHour: 280,
      type: "cleaning",
      contact: "2758569365",
      address: "35 Green Valley, Colombo",
      description: "Environmentally friendly cleaning solutions.",
      ratings: 4.7,
      images: [
        "https://example.com/images/ecocleaners1.jpg",
        "https://example.com/images/ecocleaners2.jpg",
        "https://example.com/images/ecocleaners3.jpg",
      ],
      tags: ["eco-friendly", "clean", "efficient"],
      provider: "Someone1",
    },

    // Rentals
    {
      id: 10,
      name: "Rent",
      availability: "yes",
      type: "things making",
      duration: "3 days",
      contact: "2758569360",
      address: "45 Main Road, Palamunai",
      description: "Affordable rental services for a variety of items.",
      ratings: 4.0,
      images: [
        "https://example.com/images/rent1.jpg",
        "https://example.com/images/rent2.jpg",
        "https://example.com/images/rent3.jpg",
      ],
      tags: ["affordable", "convenient", "rentals"],
      provider: "Daraz",
    },
    {
      id: 11,
      name: "Car Rentals Sri Lanka",
      availability: "yes",
      type: "rental service",
      duration: "1 week",
      contact: "2758569365",
      address: "35 Fleet Street, Colombo",
      description: "Convenient car rentals for short and long trips.",
      ratings: 4.6,
      images: [
        "https://example.com/images/carrentals1.jpg",
        "https://example.com/images/carrentals2.jpg",
        "https://example.com/images/carrentals3.jpg",
      ],
      tags: ["cars", "rental", "affordable"],
      provider: "Smart",
    },
    {
      id: 12,
      name: "Party Rentals",
      availability: "yes",
      type: "rental service",
      duration: "2 days",
      contact: "2758569366",
      address: "21 Celebration Avenue, Colombo",
      description: "Tables, chairs, and party supplies for rent.",
      ratings: 4.5,
      images: [
        "https://example.com/images/partyrentals1.jpg",
        "https://example.com/images/partyrentals2.jpg",
        "https://example.com/images/partyrentals3.jpg",
      ],
      tags: ["party", "supplies", "rental"],
      provider: "Rifnas",
    },
    // Tutoring
    {
      id: 13,
      name: "Math Masters",
      availability: "yes",
      chargePerHour: 500,
      type: "education",
      description: "Specialized math tutoring for all levels.",
      ratings: 4.9,
      tags: ["math", "expert", "education"],
      images: ["https://example.com/images/mathmasters.jpg"],
      provider: "Smart",
    },
    {
      id: 14,
      name: "Language Learning Hub",
      availability: "yes",
      chargePerHour: 600,
      type: "education",
      description: "Master new languages with our expert tutors.",
      ratings: 4.8,
      tags: ["language", "learning", "expert"],
      images: ["https://example.com/images/languagelearninghub.jpg"],
      provider: "Smart",
    },
    {
      id: 15,
      name: "Science Gurus",
      availability: "yes",
      chargePerHour: 550,
      type: "education",
      description: "Comprehensive science tutoring for all grades.",
      ratings: 4.7,
      tags: ["science", "learning", "education"],
      images: ["https://example.com/images/sciencegurus.jpg"],
      provider: "Smart",
    },
    // Other Services
    {
      id: 16,
      name: "Fitness Training",
      availability: "yes",
      chargePerMonth: 3000,
      type: "training",
      contact: "2758569366",
      address: "Fitness Hub, Colombo 07",
      description: "Personalized fitness training and nutrition guidance.",
      ratings: 4.9,
      images: [
        "https://example.com/images/fitnesstraining1.jpg",
        "https://example.com/images/fitnesstraining2.jpg",
        "https://example.com/images/fitnesstraining3.jpg",
      ],
      tags: ["fitness", "health", "training"],
      provider: "Smart",
    },
    {
      id: 17,
      name: "Event Planning",
      availability: "yes",
      chargePerEvent: 10000,
      type: "event planning",
      contact: "2758569367",
      address: "Grand Lane, Nugegoda",
      description:
        "Professional event planning for weddings, parties, and more.",
      ratings: 4.7,
      images: [
        "https://example.com/images/eventplanning1.jpg",
        "https://example.com/images/eventplanning2.jpg",
        "https://example.com/images/eventplanning3.jpg",
      ],
      tags: ["event", "planning", "professional"],
      provider: "Smart",
    },
    {
      id: 18,
      name: "Beauty Services",
      availability: "yes",
      chargePerSession: 1200,
      type: "beauty",
      contact: "2758569368",
      address: "Elegant Spa, Colombo 05",
      description: "Makeup, facials, and other beauty treatments.",
      ratings: 4.8,
      images: [
        "https://example.com/images/beautyservices1.jpg",
        "https://example.com/images/beautyservices2.jpg",
        "https://example.com/images/beautyservices3.jpg",
      ],
      tags: ["beauty", "spa", "makeup"],
      provider: "Smart",
    },
    {
      id: 19,
      name: "Quick Delivery",
      availability: "yes",
      chargePerKM: 150,
      oldChargePerKM: 400,
      type: "delivery",
      contact: "2758569360",
      address: "45 Main Road, Palamunai",
      description: "Fast and reliable delivery service for goods.",
      ratings: 4.8,
      images: [
        quickdelivery,
        "https://example.com/images/quickdelivery2.jpg",
        "https://example.com/images/quickdelivery3.jpg",
      ],
      tags: ["fast", "reliable", "affordable"],
      provider: "Smart",
    },
  ];
  const renderItem = ({ item }) => <ServicesCard service={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onPressHandler}>
          <Text style={styles.subTitle}>More Services</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={services} // Your array of services
        keyExtractor={(item, index) => index.toString()} // Ensure a unique key for each item
        horizontal // Enables horizontal scrolling
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        renderItem={renderItem}
      />
      );
    </View>
  );
};

export default ServiceListComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: "white",
    padding: 4,
    marginTop: 8,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 14, // For Android shadow
  },
  header: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    textTransform: "capitalize",
    fontWeight: "700",
    color: "#333",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6F61", // Changed to a more modern color
  },
  list: {
    marginTop: 8, // Add some space between the header and the list
  },
  scrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 8, // Add some padding to the scroll container
  },
});

// import React, { useCallback } from 'react';
// import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
// import ServicesCard from './ServicesCard';
// import quickdelivery from './../../assets/images/service/quickdelivery.jpg';
// import rent from './../../assets/images/service/rent.jpg';
// import homemadethings from './../../assets/images/service/homemadethings.jpg';
// import homemadefoods from './../../assets/images/service/homemadefood.jpg';
// import { useNavigation } from '@react-navigation/native';

// const ServiceListComponent = ({ title, subTitle }) => {
//   const navigation = useNavigation();

//   const onPressHandler = useCallback(() => {
//     navigation.navigate('ServiceListPage');
//   }, [navigation]);

//   const services = [
//     {
//       id: 1,
//       name: 'Quick Delivery',
//       availability: 'yes',
//       chargePerKM: 150,
//       oldChargePerKM: 400,
//       type: 'delivery',
//       contact: '2758569360',
//       address: '45 main road,palamunai',
//       image: quickdelivery,
//     },
//     {
//       id: 2,
//       name: 'Home Food Make',
//       availability: 'yes',
//       ChargePerItem: 500,
//       oldChargePerItem: 400,
//       type: 'food making',
//       duration: '3 days',
//       contact: '2758569360',
//       address: '45 main road,palamunai',
//       image: homemadefoods,
//     },
//     {
//       id: 3,
//       name: 'Home Made Things',
//       availability: 'yes',
//       type: 'things making',
//       duration: '3 days',
//       contact: '2758569360',
//       address: '45 main road,palamunai',
//       image: homemadethings,
//     },
//     {
//       id: 4,
//       name: 'Rent',
//       availability: 'yes',
//       type: 'things making',
//       duration: '3 days',
//       contact: '2758569360',
//       address: '45 main road,palamunai',
//       image: rent,
//     },
//   ];

//   const renderItem = ({ item }) => <ServicesCard service={item} />;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>{title}</Text>
//         <TouchableOpacity onPress={onPressHandler}>
//           <Text style={styles.subTitle}>More Services</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={services}
//         keyExtractor={(item) => item.id.toString()} // Use unique id instead of index
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContainer}
//         renderItem={renderItem}
//         initialNumToRender={2} // Render only a few items initially
//         maxToRenderPerBatch={3} // Limit number of items rendered per batch
//         windowSize={5} // Control how many items to render offscreen
//       />
//     </View>
//   );
// };

// export default React.memo(ServiceListComponent); // Memoize the component to prevent unnecessary re-renders

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 4,
//     borderRadius: 4,
//     backgroundColor: 'white',
//     padding: 4,
//     marginTop: 8,
//     marginBottom: 0,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 14, // For Android shadow
//   },
//   header: {
//     flexDirection: 'row',
//     padding: 8,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 22,
//     textTransform: 'capitalize',
//     fontWeight: '700',
//     color: '#333',
//   },
//   subTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FF6F61', // Modern color
//   },
//   list: {
//     marginTop: 8, // Add space between header and list
//   },
//   scrollContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 8, // Add padding to scroll container
//   },
// });
