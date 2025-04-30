import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const reviews = [
  {
    id: "1",
    username: "Mohammed",
    rating: 4,
    review: "Great product, works as expected!",
    date: "April 29, 2025",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    username: "Anonymous",
    rating: 5,
    review:
      "Absolutely loved it. Fast delivery and quality is top-notch. Will buy again!",
    date: "April 28, 2025",
    image: null,
  },
];

const ReviewItem = ({ review }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigate.navigate("ViewReview")}
    >
      <View style={styles.header}>
        <Text style={styles.username}>{review.username}</Text>
        <Text style={styles.date}>{review.date}</Text>
      </View>

      <View style={styles.ratingRow}>
        {[...Array(5)].map((_, i) => (
          <AntDesign
            key={i}
            name={i < review.rating ? "star" : "staro"}
            size={16}
            color="#f5a623"
            style={styles.star}
          />
        ))}
      </View>

      <Text style={styles.reviewText}>{review.review}</Text>

      {review.image && (
        <Image source={{ uri: review.image }} style={styles.reviewImage} />
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setLiked(!liked)}
        >
          <AntDesign
            name={liked ? "like1" : "like2"}
            size={18}
            color={liked ? "#1e90ff" : "#999"}
          />
          <Text style={[styles.actionText, liked && { color: "#1e90ff" }]}>
            Like
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="message-circle" size={18} color="#999" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const ReviewListScreen = () => {
  return (
    <View style={styles.screen}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ReviewItem review={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ReviewListScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 16,
    marginTop: 50,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  username: {
    fontWeight: "600",
    fontSize: 15,
    color: "#333",
  },
  date: {
    fontSize: 13,
    color: "#888",
  },
  ratingRow: {
    flexDirection: "row",
    marginVertical: 6,
  },
  star: {
    marginRight: 2,
  },
  reviewText: {
    fontSize: 15,
    color: "#444",
    marginTop: 4,
  },
  reviewImage: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    justifyContent: "flex-start",
    gap: 20,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#999",
  },
});
