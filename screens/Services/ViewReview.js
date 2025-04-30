import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import defaultImage1 from "./../../assets/images/service/homemadethings.jpg";
import { Dimensions } from "react-native";
import ReviewImageCarousel from "./ReviewImageCarousel";
const ViewReview = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(12); // example initial count
  const [dislikeCount, setDislikeCount] = useState(2); // example initial count

  const [comment, setComment] = useState("");

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
    } else {
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    }
  };

  const reviewImages = [
    defaultImage1,
    defaultImage1,
    defaultImage1,
    defaultImage1,
    defaultImage1,
    defaultImage1,
    defaultImage1,
    defaultImage1,
    defaultImage1,
  ];

  const comments = [
    { id: 1, name: "Ali", text: "I agree with your review." },
    { id: 2, name: "Sara", text: "Thanks for the detailed feedback!" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Product Card */}
      <View style={styles.productCard}>
        <Image
          source={{ uri: "https://via.placeholder.com/80" }}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            Premium Bluetooth Headphones
          </Text>
          <Text style={styles.productPrice}>$59.99</Text>
        </View>
      </View>

      {/* User & Date */}
      <View style={styles.header}>
        <Text style={styles.username}>Mohammed</Text>
        <Text style={styles.date}>April 29, 2025</Text>
      </View>

      {/* Star Rating */}
      <View style={styles.rating}>
        {[...Array(5)].map((_, i) => (
          <AntDesign
            key={i}
            name={i < 4 ? "star" : "staro"}
            size={18}
            color="#f5a623"
            style={styles.star}
          />
        ))}
      </View>

      {/* Review Text */}
      <Text style={styles.reviewText}>
        This product is amazing. Delivery was fast and quality is great!
      </Text>

      {/* Image Carousel */}
      <ReviewImageCarousel />
      {/* Image Thumnails */}
      <View style={styles.gridContainer}>
        <FlatList
          data={reviewImages.slice(0, 4)} // Limit to 4 images
          keyExtractor={(item, index) => index.toString()}
          numColumns={3} // Maximum 3 images per row
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => console.log(`Tapped image ${index}`)}
            >
              <Image source={item} style={styles.thumbnail} />
            </TouchableOpacity>
          )}
        />

        {reviewImages.length > 4 && (
          <TouchableOpacity
            style={styles.moreImagesContainer}
            onPress={() => console.log("Show more images")}
          >
            <Image
              source={reviewImages[4]} // Use the 5th image as the "more" thumbnail
              style={styles.thumbnail}
            />
            <Text style={styles.moreImagesText}>
              +{reviewImages.length - 4} more
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Like/Dislike */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
          <AntDesign
            name={liked ? "like1" : "like2"}
            size={18}
            color={liked ? "#1e90ff" : "#888"}
          />
          <Text style={[styles.actionText, liked && { color: "#1e90ff" }]}>
            {likeCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={handleDislike}>
          <AntDesign
            name={disliked ? "dislike1" : "dislike2"}
            size={18}
            color={disliked ? "#ff4d4d" : "#888"}
          />
          <Text style={[styles.actionText, disliked && { color: "#ff4d4d" }]}>
            {dislikeCount}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Seller Reply */}
      <View style={styles.sellerReply}>
        <Text style={styles.sellerLabel}>Seller Reply:</Text>
        <Text style={styles.sellerText}>
          Thank you for your kind feedback! We hope to serve you again soon.
        </Text>
      </View>

      {/* Comment Input */}
      <View style={styles.commentBox}>
        <Feather name="message-circle" size={18} color="#888" />
        <TextInput
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Other Comments */}
      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comments</Text>
        {comments.map((c) => (
          <View key={c.id} style={styles.commentItem}>
            <Text style={styles.commentName}>{c.name}</Text>
            <Text style={styles.commentText}>{c.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ViewReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 50,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  productPrice: {
    color: "#1e90ff",
    fontWeight: "600",
    fontSize: 15,
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
  rating: {
    flexDirection: "row",
    marginVertical: 8,
  },
  star: {
    marginRight: 2,
  },
  reviewText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 10,
    lineHeight: 22,
  },
  carousel: {
    marginBottom: 12,
  },
  carouselImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  gridContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  thumbnail: {
    width: (Dimensions.get("window").width - 48) / 3, // 1/3 of the container width
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    marginRight: 8, // Margin between the images
  },
  moreImagesContainer: {
    width: (Dimensions.get("window").width - 48) / 3, // Same size as the thumbnail
    height: 100,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    marginRight: 8, // Margin like other images
  },
  moreImagesText: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    gap: 20,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#888",
  },
  sellerReply: {
    marginTop: 16,
    backgroundColor: "#f6fffa",
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#00b894",
    borderRadius: 6,
  },
  sellerLabel: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#00b894",
  },
  sellerText: {
    fontSize: 14,
    color: "#444",
  },
  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#f4f4f4",
    padding: 10,
    borderRadius: 8,
  },
  input: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
    color: "#333",
  },
  commentsSection: {
    marginTop: 20,
    paddingBottom: 20,
  },
  commentsTitle: {
    fontWeight: "600",
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  commentItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  commentName: {
    fontWeight: "600",
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#555",
  },
});
