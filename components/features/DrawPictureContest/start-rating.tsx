import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StarRatingProps {
  rating: number;
  maxRating: number;
  size?: number;
  color?: string;
  emptyColor?: string;
}

export const StarRating = ({
  rating,
  maxRating,
  size = 24,
  color = "#fbbf24",
  emptyColor = "#e5e7eb",
}: StarRatingProps) => {
  // Calculate the percentage filled for the partial star
  const getStarType = (position: number) => {
    if (position <= Math.floor(rating)) {
      return "full";
    } else if (position === Math.ceil(rating) && rating % 1 !== 0) {
      return "half";
    } else {
      return "empty";
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxRating / 2 }, (_, i) => i + 1).map(
        (position) => {
          const starType = getStarType(position);

          return (
            <Ionicons
              key={position}
              name={
                starType === "full"
                  ? "star"
                  : starType === "half"
                  ? "star-half"
                  : "star-outline"
              }
              size={size}
              color={starType === "empty" ? emptyColor : color}
              style={styles.star}
            />
          );
        }
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 4,
  },
});
