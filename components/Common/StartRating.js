import { Ionicons } from "@expo/vector-icons";

export const StartRating = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Ionicons key={`full-${i}`} name="star" color="#FF8C00" size={24} />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Ionicons key="half" name="star-half" color="#FF8C00" size={24} />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Ionicons
        key={`empty-${i}`}
        name="star-outline"
        color="#FF8C00"
        size={24}
      />
    );
  }

  return stars;
};

export const getRatingText = (rating) => {
  if (rating >= 4.5) return "Excellent";
  if (rating >= 3.5) return "Good";
  if (rating >= 2.5) return "Average";
  if (rating >= 1.5) return "Poor";
  return "Very Poor";
};
