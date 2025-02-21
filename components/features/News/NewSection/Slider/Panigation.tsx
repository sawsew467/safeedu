import { TypeNews } from "@/healper/type/news.type";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
const { width } = Dimensions.get("window");
const Panigation = ({
  items,
  panigationIndex,
  scrollX,
}: {
  items: TypeNews[];
  panigationIndex: number;
  scrollX: SharedValue<number>;
}) => {
  console.log("panigationIndex", panigationIndex);

  return (
    <View style={styles.container}>
      {items?.map((_, index) => {
        const rnAnimatedStyle = useAnimatedStyle(() => {
          console.log(
            "panigationIndex",
            panigationIndex,
            panigationIndex === index
          );
          const dotWidth = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [8, 20, 8],
            Extrapolation.CLAMP
          );

          return {
            width: dotWidth,
          };
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              rnAnimatedStyle,
              {
                backgroundColor: panigationIndex === index ? "#75A815" : "#aaa",
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    gap: 4,
  },
});

export default Panigation;
