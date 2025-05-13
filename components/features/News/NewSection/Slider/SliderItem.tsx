import { DataType } from "@/healper/type/news-type";
import { TypeNews } from "@/healper/type/news.type";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type SliderItemProps = {
  item: TypeNews;
  index: number;
  scrollX: Animated.SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ item, index, scrollX }: SliderItemProps) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.85, 1, 0.85],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/news/${item?._id}`);
      }}
    >
      <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
        <Animated.Image
          source={{ uri: item.image }}
          style={[styles.itemImage]}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.titleContainerOverlay}>
          <Text
            className="font-pregular"
            style={styles.titleOverlay}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <View style={styles.badge}>
            <Text className="font-pregular" style={styles.text_badge}>
              {item?.topic_id?.topic_name}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingBlock: 2,
    backgroundColor: "#75A815",
    alignSelf: "flex-start",
    width: "auto",
    borderRadius: 8,
    marginTop: 2,
  },
  text_badge: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "semibold",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: width - 32,
    aspectRatio: 16 / 9,
    position: "relative",
    overflow: "hidden",
    borderRadius: 30,
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  backgroundOverlay: {
    position: "absolute",
    width: "100%",
    height: "40%",
    bottom: 0,
    borderRadius: 30,
  },
  titleContainerOverlay: {
    position: "absolute",
    width: "100%",
    bottom: 12,
    left: 8,
    paddingHorizontal: 40,
  },
  titleOverlay: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 28,
  },
});
