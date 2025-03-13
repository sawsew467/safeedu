import {
  ActivityIndicator,
  Animated,
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

import Entypo from "@expo/vector-icons/Entypo";

import HeaderShown from "@/components/ui/HeaderShown";

import { LIBRARY_DATA } from "@/healper/data/library";
import { useGetLibraryQuery } from "@/services/library/library.api";

import { styles_mardown } from "@/healper/style/renderHtml";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const externalPadingContent = 60;

const scaleFont = (size: number) => (windowWidth / 400) * size;

const LibraryDetail = () => {
  const { libraryID, index }: { libraryID: string; index: string } =
    useLocalSearchParams();

  const { libraryDetailData, isFetching, isSuccess, refetch } =
    useGetLibraryQuery(
      { id: libraryID },
      {
        selectFromResult: ({ data, isFetching, isSuccess }) => ({
          libraryDetailData: data,
          isSuccess: data?.isActive ? isSuccess : false,
          isFetching,
        }),
      }
    );

  const bgColor =
    JSON.parse(index) % 2 === 0 ? styles.bgGreen : styles.bgYellow;
  const colorTitle =
    JSON.parse(index) % 2 > -1 ? styles.whiteTitle : styles.blackTitle;
  const textColor = JSON.parse(index) % 2 === 0 ? "#75A815" : "#F6CB1E";

  const handleBack = () => {
    router.replace("..");
  };

  const CustomImageRenderer = ({ tnode }) => {
    const uri = tnode.attributes.src;

    return (
      <View style={styles.imageContainer}>
        {uri ? (
          <Image
            source={{ uri }}
            style={[
              styles.image,
              { width: windowWidth - externalPadingContent },
            ]}
            resizeMode="contain"
          />
        ) : (
          <ActivityIndicator size="large" color="gray" />
        )}
      </View>
    );
  };

  const renderers = {
    img: CustomImageRenderer, // Gán component custom cho thẻ <img>
  };

  if (!isSuccess && !isFetching)
    return (
      <HeaderShown
        title="Thông Tin Chi Tiết"
        HeaderComponent={() => (
          <View style={[styles.cardContainer, bgColor]}>
            <View style={styles.textContainer}>
              <Text style={[styles.title, colorTitle]}>
                404 - Không tìm thấy trang
              </Text>
            </View>
          </View>
        )}
      >
        <View style={styles.detailContainer}>
          <Text>
            Có thể trang đã bị xóa hoặc không tồn tại hãy kiểm tra lại
          </Text>
        </View>
      </HeaderShown>
    );

  return (
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
      <View style={styles.detailContainer}>
        <View style={styles.imageHeaderContainer}>
          <Image
            source={{ uri: libraryDetailData?.image }}
            style={styles.imageHeader}
            resizeMode="contain"
          />
        </View>

        {/* <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === "primary" ? bgColor : styles.secondaryButton,
            ]}
            onPress={() => setSelectedButton("primary")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedButton === "primary"
                  ? styles.primaryText
                  : [styles.secondaryText, { color: textColor }],
              ]}
            >
              {detailLibrary.subtitle[0].title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === "secondary" ? bgColor : styles.secondaryButton,
            ]}
            onPress={() => setSelectedButton("secondary")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedButton === "secondary"
                  ? styles.primaryText
                  : [styles.secondaryText, { color: textColor }],
              ]}
            >
              {detailLibrary.subtitle[1].title}
            </Text>
          </TouchableOpacity>
        </View> */}

        <View>
          <RenderHTML
            contentWidth={windowWidth - externalPadingContent}
            source={{
              html: `${libraryDetailData?.description}`,
            }}
            enableExperimentalMarginCollapsing={true}
            classesStyles={styles_mardown}
            tagsStyles={styles_mardown}
            renderers={renderers}
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
    </HeaderShown>
  );
};

export default LibraryDetail;

const styles = StyleSheet.create({
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
  },
  bgGreen: {
    backgroundColor: "#75A815",
  },
  bgYellow: {
    backgroundColor: "#F6CB1E",
  },
  textContainer: {
    width: windowWidth * 0.75,
    flex: 1,
  },
  title: {
    width: "100%",
    fontWeight: "900",
    fontSize: scaleFont(28),
    lineHeight: 34,
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
    position: "absolute",
    top: windowHeight < 700 ? -30 : -110,
    right: windowWidth > 400 ? -20 : -10,
  },
  imageHeader: {
    width: "100%",
    height: "100%",
  },
  detailContainer: {
    marginTop: 180,
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
