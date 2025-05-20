"use client";

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  type ImageSourcePropType,
} from "react-native";

interface AvatarProps {
  source: ImageSourcePropType;
  fallback: string;
  size?: number;
  borderColor?: string;
}

const Avatar = ({
  source,
  fallback,
  size = 40,
  borderColor = "#e5e5e5",
}: AvatarProps) => {
  const [imageError, setImageError] = React.useState(false);

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor,
  };

  const textStyle = {
    fontSize: size * 0.4,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {!imageError ? (
        <Image
          source={source}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.fallbackContainer}>
          <Text style={[styles.fallbackText, textStyle]}>{fallback}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallbackContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontWeight: "bold",
    color: "#6b7280",
  },
});

export default Avatar;
