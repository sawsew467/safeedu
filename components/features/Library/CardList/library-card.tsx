import React from "react";
import { skeletonCommonProps } from "@/healper/type/type-common-skeleton";
import { router } from "expo-router";
import {
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import { Skeleton } from "moti/skeleton";

import linear_gradient_1 from "@/assets/images/library_images/linear_gradient_1.png";
import linear_gradient_2 from "@/assets/images/library_images/linear_gradient_2.png";
import arrow_icon from "@/assets/icons/arrow_icon.png";

const windowWidth = Dimensions.get("window").width;
const scaleFont = (size: number) => (windowWidth / 400) * size;
const imageLeft = windowWidth > 400 ? 15 : 10;
const getTextContainer = (index: number) => {
  switch (index) {
    case 0:
      return styles.textContainer_1;
    case 1:
      return styles.textContainer_2;
    case 2:
      return styles.textContainer_3;
    case 3:
      return styles.textContainer_4;
  }
};
const LibraryCard = ({ isFetching, item, index }) => {
  return (
    <Skeleton
      show={isFetching}
      width={"100%"}
      height={windowWidth * 0.3}
      radius={24}
      {...skeletonCommonProps}
    >
      <TouchableOpacity
        key={item?._id}
        onPress={() => {
          router.push({
            pathname: `/library/${item?._id}`,
            params: {
              index,
            },
          });
        }}
      >
        <Image source={linear_gradient_1} style={styles.linearBackground1} />
        <Image source={linear_gradient_1} style={styles.linearBackground2} />
        <Image
          source={linear_gradient_2}
          style={styles.linearBackground3}
          resizeMode="contain"
        />

        <Image
          source={linear_gradient_2}
          style={styles.linearBackground4}
          resizeMode="contain"
        />
        <Image
          source={linear_gradient_1}
          style={styles.linearBackground5}
          resizeMode="contain"
        />
        <Image
          source={linear_gradient_1}
          style={styles.linearBackground6}
          resizeMode="contain"
        />

        <View
          style={[
            styles.cardContainer,
            index % 2 === 0 ? styles.cardGreen : styles.cardYellow,
          ]}
        >
          <View style={[styles.contentCard, getTextContainer(index)]}>
            <Text
              style={[
                styles.title,
                index % 2 === 0 ? styles.whiteTitle : styles.blackTitle,
              ]}
              className="font-pmedium"
              numberOfLines={2}
            >
              {item?.category_name}
            </Text>
            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.readMoreText,
                  index % 2 === 0
                    ? styles.whiteReadMoreText
                    : styles.blackReadMoreText,
                ]}
                className="font-pregular"
              >
                Xem thông tin
              </Text>
              <Image
                source={arrow_icon}
                style={[
                  styles.arrow,
                  index % 2 === 0 ? styles.whiteArrow : styles.blackArrow,
                ]}
                resizeMode="cover"
              />
            </View>
          </View>
          <View
            style={
              index % 2 === 0
                ? styles.imageContainerRight
                : styles.imageContainerLeft
            }
          >
            <Image
              source={{ uri: item?.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>
    </Skeleton>
  );
};

const styles = StyleSheet.create({
  contentCard: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
  },
  linearBackground1: {
    width: 113,
    height: 113,
    zIndex: 2,
    position: "absolute",
    bottom: -50,
    left: -18,
    pointerEvents: "none",
  },
  linearBackground2: {
    width: 40,
    height: 40,
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
  },
  linearBackground3: {
    width: 49,
    height: 45,
    zIndex: 2,
    position: "absolute",
    top: 50,
    left: imageLeft + 100,
    pointerEvents: "none",
  },
  linearBackground4: {
    width: 87,
    height: 80,
    zIndex: 2,
    position: "absolute",
    bottom: -30,
    right: -10,
    pointerEvents: "none",
  },
  linearBackground5: {
    width: 97,
    height: 97,
    zIndex: 2,
    position: "absolute",
    top: -30,
    right: 50,
    pointerEvents: "none",
  },
  linearBackground6: {
    width: 50,
    height: 50,
    zIndex: 2,
    position: "absolute",
    bottom: 30,
    right: 120,
    pointerEvents: "none",
  },
  cardContainer: {
    width: "100%",
    minHeight: windowWidth * 0.3,
    flex: 1,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    display: "flex",
    pointerEvents: "none",
    position: "relative",
  },
  cardGreen: {
    backgroundColor: "#75A815",
  },
  cardYellow: {
    backgroundColor: "#F6CB1E",
    flexDirection: "row-reverse",
  },
  textContainer_1: {
    width: "50%",
  },
  textContainer_2: {
    width: "50%",
    alignItems: "flex-end",
  },
  textContainer_3: {
    width: "50%",
  },
  textContainer_4: {
    width: "50%",
    alignItems: "flex-end",
  },
  title: {
    width: "100%",
    fontWeight: "900",
    fontSize: scaleFont(16),
  },
  whiteTitle: {
    color: "#FFFFFF",
  },
  blackTitle: {
    color: "#000000",
    textAlign: "right",
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  readMoreText: {
    fontWeight: "400",
    fontSize: scaleFont(12),
    lineHeight: 38.6,
    opacity: 0.6,
  },
  whiteReadMoreText: {
    color: "#FFFFFF",
  },
  blackReadMoreText: {
    color: "#000000",
    textAlign: "right",
  },
  arrow: {
    width: 6,
    height: 10,
    opacity: 0.6,
    marginTop: 2,
    marginLeft: 8,
  },
  whiteArrow: {
    tintColor: "#FFFFFF",
  },
  blackArrow: {
    tintColor: "#000000",
  },
  imageContainerRight: {
    width: "50%",
    height: "100%",
    position: "absolute",
    top: 10,
    right: 0,
  },
  imageContainerLeft: {
    width: "50%",
    height: "100%",
    position: "absolute",
    top: 10,
    left: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    zIndex: 4,
  },
});

export default LibraryCard;
