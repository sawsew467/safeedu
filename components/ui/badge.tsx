import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from "react-native";

interface BadgeProps {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge = ({ text, style, textStyle }: BadgeProps) => {
  return (
    <View style={[styles.badge, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "#f3f4f6",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#374151",
  },
});

export default Badge;
