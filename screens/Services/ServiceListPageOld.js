import React, {
  useState,
  useLayoutEffect,
  useMemo,
  useEffect,
  useRef,
} from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";
import PageContainer from "../../components/PageContainer";
import ProductListItem from "../../components/ProductListItem";
import { Ionicons } from "@expo/vector-icons";
import plusImage from "./../../assets/images/plus.png";
import quickdelivery from "./../../assets/images/service/quickdelivery.jpg";
import rent from "./../../assets/images/service/rent.jpg";
import homemadethings from "./../../assets/images/service/homemadethings.jpg";
import homemadefoods from "./../../assets/images/service/homemadefood.jpg";
import ServiceCard from "./ServiceCard";
import ServicesCard from "./ServicesCard";

const ServiceListPageOld = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {}, [products]);
  // const renderItem = ({ item }) => <ServiceCard service={item} />

  // Render Item Component
  // const renderServiceItem = ({ item }) => {
  //   return (
  //     <ScrollView
  //       horizontal={false}
  //       showsHorizontalScrollIndicator={false}
  //       contentContainerStyle={[styles.row, { flexDirection: "row" }]}
  //     >
  //       <ServicesCard service={item} />
  //     </ScrollView>
  //   );
  // };

  const renderServiceItem = ({ item }) => <ServicesCard service={item} />;

  const filteredServices = useMemo(
    () =>
      services?.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, services]
  );

  const searchHandler = () => {
    setSearchQuery("");
    setIsClicked((current) => !current);
  };

  const backHandler = () => {
    navigation.goBack();
  };

  // const searchProducts = useMemo(
  //     () =>
  //     products.filter((product) =>
  //         new RegExp(searchQuery, "i").test(product.name)
  //     ),
  //     [products, searchQuery]
  // );
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

  // Group services by category/type
  const groupedServices = Object.entries(
    services.reduce((acc, service) => {
      // Create an array for each category if it doesn't already exist
      if (!acc[service.type]) {
        acc[service.type] = [];
      }
      // Push the current service into its corresponding category
      acc[service.type].push(service);
      return acc;
    }, {})
  ).map(([type, data]) => ({
    title: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize first letter of the category
    data,
  }));

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
        {/* Animated Header */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Ionicons
            name="arrow-back-sharp"
            color="black"
            size={30}
            onPress={backHandler}
            style={{ marginRight: 10 }}
          />
          <PageTitle text="Services" />
        </View>

        {!isClicked && (
          <Ionicons
            name="search"
            color="black"
            size={30}
            onPress={searchHandler}
          />
        )}
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

      <SectionList
        sections={groupedServices} // Your grouped data
        keyExtractor={(item, index) => item.id.toString()} // Ensure unique keys
        renderSectionHeader={({ section: { title, data } }) => (
          <View style={styles.headerContainer}>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionHeader}>{title}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewServicesByCategory", {
                    data: data,
                  })
                }
              >
                {data?.length > 2 && (
                  <Text style={styles.moreHeader}>View More</Text>
                )}
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.row}
            >
              {data.map((item) => renderServiceItem({ item }))}

              {/* Render each item */}
            </ScrollView>
          </View>
        )}
        renderItem={({ item }) => null} // Prevents rendering items again in renderItem
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </PageContainer>
  );
};

export default ServiceListPageOld;

const styles = StyleSheet.create({
  plusbtn: {
    width: 50,
    height: 50,
  },
  plusBtnContainer: {
    position: "absolute",
    right: 15,
    bottom: 20,
    width: 50,
    height: 50,
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
  sectionHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    color: "#333",
    backgroundColor: "#f5f5f5", // Header background color
  },
  headerContainer: {
    borderRadius: 8, // Rounded corners for the header
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Text color
    padding: 10,
    borderRadius: 5,
  },
  moreHeader: {
    color: "red",
    fontWeight: 500,
    fontSize: 14,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: "row", // Ensure items are laid out horizontally
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
});
