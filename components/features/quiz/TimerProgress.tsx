import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  ViewProps,
} from "react-native";

interface TimerProgressProps extends ViewProps {
  value?: number;
  max?: number;
  style?: ViewStyle;
  progressColor?: string;
  backgroundColor?: string;
  textStyle?: TextStyle;
}

const TimerProgress: React.FC<TimerProgressProps> = (
  {
    value = 0,
    max = 100,
    style,
    progressColor = "#75A815", // primary color
    backgroundColor = "#e5e7eb", // secondary color
    textStyle,
  },
  props
) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Calculate the progress percentage (capped at 97.5% to match the original)
    const progressPercentage = (value / max) * 100;
    const cappedPercentage =
      progressPercentage >= 100
        ? 100
        : progressPercentage > 97.5
        ? 97.5
        : progressPercentage;

    // Animate the progress bar
    Animated.timing(animatedWidth, {
      toValue: cappedPercentage,
      duration: cappedPercentage === 0 ? 300 : 1200, // Disable animation if value equals max
      useNativeDriver: false,
      easing: (t) => t, // Linear easing to match the original
    }).start();
  }, [value, max, animatedWidth]);

  const progressWidth = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["100%", "2.5%"],
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <Animated.View
        style={[
          styles.progressBar,
          { width: progressWidth, backgroundColor: progressColor },
        ]}
      >
        <Text style={[styles.valueText, textStyle]}>{max - value}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 16,
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: 9999,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  valueText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
  },
});

export default TimerProgress;
