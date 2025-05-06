import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import defaultImage from "./../../assets/images/man.png";

const categoryDetails = {
  chats: {
    icon: "chatbubble-ellipses",
    color: "#4a90e2",
    backgroundColor: "#e6f0ff",
    title: "You've got a message",
    sender: "John",
    content: `"Hey, can we talk later tonight?"`,
    avatar: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
  },
  orders: {
    icon: "cube",
    color: "#27ae60",
    backgroundColor: "#e9fbe7",
    title: "Your order has shipped",
    sender: "Daraz Orders",
    contentLeft: "Your package is on the way",
    contentRight: "Package #1234 dispatched",
    orderId: "987654321",
    trackingNumber: "TRK123456",
    image: "https://picsum.photos/id/180/100",
  },
  activities: {
    icon: "notifications",
    color: "#f39c12",
    backgroundColor: "#fff5e6",
    title: "New Login Alert",
    sender: "Daraz Security",
    content: "Your account was accessed from a new device.",
    image: "https://cdn-icons-png.flaticon.com/512/595/595067.png",
  },
  promos: {
    icon: "pricetags",
    color: "#e74c3c",
    backgroundColor: "#ffeaea",
    title: "Flash Sale is Live!",
    sender: "Daraz Promos",
    content: "Grab up to 70% off only for today. Don’t miss it!",
    image: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
  },
};

const DUMMY_MESSAGES = [
  {
    id: "1",
    sender: "John",
    text: "Let's catch up tomorrow.",
    time: "10:15 AM",
    category: "chats",
  },
  {
    id: "2",
    sender: "ShopNow",
    text: "Your order #1234 has been shipped.",
    time: "9:42 AM",
    category: "orders",
  },
  {
    id: "3",
    sender: "Security",
    text: "Login from new device detected.",
    time: "Yesterday",
    category: "activities",
  },
  {
    id: "4",
    sender: "Discount Hub",
    text: "Flash sale! 70% off today only.",
    time: "Mon",
    category: "promos",
  },
];

const MessageHome = () => {
  const [messages, setMessages] = useState(DUMMY_MESSAGES);

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const renderRightActions = (progress, dragX, id) => {
    const translateX = dragX.interpolate({
      inputRange: [-50, 0], // From -100 to 0 as the swipe goes from right to left
      outputRange: [0, 100], // Move the icon to the left by 100 when swiping
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => deleteMessage(id)}>
        <View style={styles.deleteBox}>
          <Animated.View
            style={{
              transform: [{ translateX }], // Apply horizontal translation to the trash icon
            }}
          >
            <MaterialIcons name="delete" size={32} color="#fff" />
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    const cat = categoryDetails[item.category];
    return (
      <Swipeable
        friction={2}
        // dragOffsetFromLeftEdge={10} // Minimum distance to swipe from the left edge
        // leftThreshold={100} // Distance from the left edge to open the left panel
        // overshootLeft={false} // Prevent overshooting the left panel
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item.id)
        }
      >
        <View style={[styles.messageCard]}>
          <View style={styles.cardContentRow}>
            <View style={{ flex: 1 }}>
              {item.category === "chats" ? (
                <View style={styles.chatHeaderRow}>
                  <Image source={defaultImage} style={styles.chatAvatar} />
                  <View style={styles.chatTextContainer}>
                    <Text style={styles.chatUserName}>{item.sender}</Text>
                    <Text style={styles.chatTime}>{item.time}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.cardHeaderRow}>
                  <View style={styles.leftRow}>
                    <Icon
                      name={cat.icon}
                      size={24}
                      color={cat.color}
                      style={styles.icon}
                    />
                    <Text style={[styles.title, { color: cat.color }]}>
                      {cat.title}
                    </Text>
                  </View>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              )}

              {item.category === "orders" ? (
                <View style={styles.orderContentRow}>
                  <Image
                    source={{ uri: cat.image }}
                    style={styles.orderImage}
                    resizeMode="cover"
                  />
                  <View style={styles.orderDetails}>
                    <Text style={styles.orderTextRight}>
                      {cat.contentRight}
                    </Text>
                    <Text style={styles.orderMeta}>
                      Order ID: {cat.orderId}
                    </Text>
                    <Text style={styles.orderMeta}>
                      Tracking No: {cat.trackingNumber}
                    </Text>
                  </View>
                </View>
              ) : (
                <>
                  {item.category === "chats" ? null : (
                    <Image
                      source={{ uri: cat.image }}
                      style={styles.categoryImage}
                      resizeMode="cover"
                    />
                  )}
                  <Text style={styles.text}>{cat.content}</Text>
                </>
              )}
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <Text style={styles.markAll}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        {Object.entries(categoryDetails).map(([key, value]) => (
          <View key={key} style={styles.categoryItem}>
            <Icon name={value.icon} size={24} color={value.color} />
            <Text style={styles.categoryLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
          </View>
        ))}
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // ItemSeparatorComponent={() => <View style={styles.sepertor}></View>}
        contentContainerStyle={{ paddingVertical: 5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#f7f7f7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  markAll: {
    color: "#007AFF",
    fontSize: 14,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
  },
  messageCard: {
    marginHorizontal: 6,
    padding: 15,
    borderRadius: 4,
    elevation: 2,
    backgroundColor: "white",
    marginVertical: 4,
  },

  cardContentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  chatHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatTextContainer: {
    justifyContent: "center",
  },
  chatUserName: {
    fontSize: 16,
    fontWeight: "600",
  },
  chatTime: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  text: {
    marginTop: 6,
    fontSize: 14,
    color: "#444",
  },
  deleteBox: {
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    borderEndEndRadius: 4,
    borderTopEndRadius: 4,
    flex: 1,
    marginRight: 6,
    marginVertical: 4,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  categoryImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 6,
  },
  orderContentRow: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 10,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  orderDetails: {
    marginLeft: 10,
    flex: 1,
  },
  orderTextRight: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  orderMeta: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },
});

export default MessageHome;
