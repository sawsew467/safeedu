import {
  ActivityIndicator,
  Animated,
  DimensionValue,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import RenderHTML from "react-native-render-html";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

import HeaderShown from "@/components/ui/HeaderShown";

import { useGetLibraryQuery } from "@/services/library/library.api";

import { styles_mardown } from "@/healper/style/renderHtml";
import LoadingPage from "@/components/ui/LoadingPage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const externalPadingContent = 60;

const skeletons: DimensionValue[] = [
  "60%",
  "80%",
  "70%",
  "90%",
  "50%",
  "30%",
  "70%",
];

const scaleFont = (size: number) => (windowWidth / 400) * size;

const LibraryDetail = () => {
  const { libraryID, index }: { libraryID: string; index: string } =
    useLocalSearchParams();

  const { libraryDetailData, isFetching } = useGetLibraryQuery(
    { id: libraryID },
    {
      selectFromResult: ({ data, isFetching, isError }) => ({
        libraryDetailData: data?.data,
        isFetching,
      }),
    }
  );

  const bgColor =
    JSON.parse(index) % 2 === 0 ? styles.bgGreen : styles.bgYellow;
  const colorTitle =
    JSON.parse(index) % 2 > -1 ? styles.whiteTitle : styles.blackTitle;

  const handleBack = () => {
    router.replace("..");
  };

  return (
    <>
      <LoadingPage isLoading={isFetching} />
      <HeaderShown
        title="Thông Tin Chi Tiết"
        HeaderComponent={() => (
          <View style={[styles.cardContainer, bgColor]}>
            <View style={styles.textContainer}>
              <Text style={[styles.title, colorTitle]}>
                {libraryDetailData?.category_name}
              </Text>
            </View>
          </View>
        )}
        // rightIcon={{
        //   icon: () => (
        //     <MaterialIcons name="leaderboard" size={24} color="black" />
        //   ),
        //   onPress: handleBack,
        // }}
      >
        {!isFetching && libraryDetailData && (
          <View style={styles.detailContainer}>
            <View style={styles.imageHeaderContainer}>
              <Image
                source={{ uri: libraryDetailData?.image }}
                style={styles.imageHeader}
                resizeMode="contain"
              />
            </View>
            <View>
              <RenderHTML
                contentWidth={windowWidth - externalPadingContent}
                source={{
                  html: `${libraryDetailData?.description}`,
                }}
                enableExperimentalMarginCollapsing={true}
                classesStyles={styles_mardown}
                tagsStyles={styles_mardown}
              />
            </View>
            {/* <View style={styles.contentContainer}>
          {selectedSubtitle?.content.map((content, index) => (
            <Text
              style={styles.contentText}
              key={`${selectedSubtitle.id}-content-${index}`}
            >
              {content}
            </Text>
          ))}
        </View> */}
            {/* <View style={styles.sectionContainer}>
          {selectedSubtitle?.image.map((img, imgIndex) => (
            <View
              style={styles.container}
              key={`${selectedSubtitle.id}-image-${imgIndex}`}
            >
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={img} />
              </View>
              <Text style={styles.imageDescription}>
                {selectedSubtitle.imageDescription[imgIndex]}
              </Text>
            </View>
          ))}
        </View> */}
          </View>
        )}
      </HeaderShown>
    </>
  );
};

export default LibraryDetail;

const styles = StyleSheet.create({
  skeletonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  btnIconLeft: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: 54,
    height: 54,
    borderRadius: 999,
  },
  cardListContainer: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    gap: 30,
  },
  cardContainer: {
    width: "100%",
    paddingBottom: 140,
    position: "absolute",
    paddingTop: 24,
    paddingHorizontal: 20,
    display: "flex",
    // alignItems: "center",
  },
  bgGreen: {
    backgroundColor: "#75A815",
  },
  bgYellow: {
    backgroundColor: "#F6CB1E",
  },
  textContainer: {
    width: windowWidth > 700 ? windowWidth : windowWidth * 0.75,
    flex: 1,
  },
  title: {
    width: "100%",
    fontWeight: "700",
    fontSize: scaleFont(36),
    // lineHeight: ,
    maxWidth: "90%",
  },
  whiteTitle: {
    color: "#FFFFFF",
  },
  blackTitle: {
    color: "#000000",
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  readMoreText: {
    fontWeight: "400",
    fontSize: scaleFont(16),
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
  imageHeaderContainer: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.38 * 1.2,
    maxWidth: 220,
    maxHeight: 220,
    position: "absolute",
    top: windowHeight < 700 ? -30 : -150,
    right: windowWidth > 400 ? 0 : -10,
  },
  imageHeader: {
    width: "100%",
    height: "100%",
  },
  detailContainer: {
    marginTop: windowWidth > 700 ? 240 : 180,
    paddingTop: 60,
    minHeight: "100%",
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    position: "relative",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  button: {
    padding: 9,
    borderRadius: 12,
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 12,
    shadowOpacity: 0.12,
    elevation: 10,
  },
  primaryButton: {
    backgroundColor: "#75A815",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 12,
    textAlign: "center",
  },
  primaryText: {
    fontWeight: "500",
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
  secondaryText: {
    fontWeight: "500",
    fontSize: 12,
    textAlign: "center",
  },
  contentContainer: {
    width: windowWidth * 0.9,
    marginTop: 20,
    gap: 20,
  },
  contentText: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21.2,
  },
  sectionContainer: {
    marginTop: 20,
    paddingBottom: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 230,
    resizeMode: "cover",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageDescription: {
    marginTop: 10,
    width: windowWidth * 0.4,
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 14.06,
    textAlign: "center",
  },
});
