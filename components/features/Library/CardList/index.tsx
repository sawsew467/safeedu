import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import arrow_icon from "@/assets/icons/arrow_icon.png";
import { LibraryDataType } from "@/healper/type/library-type";
import { router } from "expo-router";
import { useGetAllLibraryQuery } from "@/services/library/library.api";
import { TypeLibrary } from "@/healper/type/library.type";
import linear_gradient_1 from "@/assets/images/library_images/linear_gradient_1.png";
import linear_gradient_2 from "@/assets/images/library_images/linear_gradient_2.png";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { useCallback, useEffect, useState } from "react";
import { Topic } from "@/healper/type/topic.type";
import { useGetAllTopicsQuery } from "@/services/topic/topic.api";
import { Skeleton } from "moti/skeleton";
import { skeletonCommonProps } from "@/healper/type/type-common-skeleton";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const scaleFont = (size: number) => (windowWidth / 400) * size;
const imageTop = windowHeight < 700 ? -30 : -50;
const imageRight = windowWidth > 400 ? 15 : -10;
const imageLeft = windowWidth > 400 ? 15 : 10;

const imageWidth = windowWidth * 0.45;
const imageHeight = imageWidth * 1.2;

const textContainerWidth =
  windowWidth > 400 ? windowWidth * 0.25 : windowWidth * 0.3;

const CardList = () => {
  const [activeTab, setActiveTab] = useState("");
  const { topicData, isSuccess } = useGetAllTopicsQuery(undefined, {
    selectFromResult: ({ data, isSuccess }) => {
      return {
        topicData: data?.data?.filter((item: Topic) => item?.isActive) ?? [],
        isSuccess,
      };
    },
  });

  useEffect(() => {
    setActiveTab(topicData[0]?._id);
  }, [isSuccess]);
  const { libraryData, isFetching, refetch, isSuccessLibrary } =
    useGetAllLibraryQuery(undefined, {
      selectFromResult: ({
        data,
        isFetching,
        isSuccess: isSuccessLibrary,
      }) => ({
        libraryData:
          data?.items?.filter((item: TypeLibrary) => item?.isActive) ?? [],
        isFetching,
        isSuccessLibrary,
      }),
    });

  const onRefresh = () => {
    if (isSuccessLibrary) {
      refetch();
    }
  };

  const getTextContainer = (index: number) => {
    switch (index) {
      case 0:
        return styles.textContainer_1;
      case 1:
        return styles.textContainer_2;
    }
  };

  return (
    <View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
        >
          {topicData?.map((tab: Topic) => (
            <TouchableOpacity
              key={tab._id}
              onPress={() => setActiveTab(tab._id)}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab._id && styles.activeTabText,
                ]}
                className="font-pregular"
              >
                {tab?.topic_name}
              </Text>
              {activeTab === tab._id && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={
          isFetching
            ? Array.from({ length: 5 })
            : libraryData?.filter(
                (library: TypeLibrary) => library?.topic_id === activeTab
              )
        }
        scrollEnabled={true}
        keyExtractor={(item: TypeLibrary) => item?._id}
        ListHeaderComponent={() => <View style={styles.header_space} />}
        ListFooterComponent={() => <View style={styles.footer_space} />}
        renderItem={({ item, index }: { item: TypeLibrary; index: number }) => (
          <Skeleton
            show={isFetching}
            {...skeletonCommonProps}
            width={"100%"}
            height={windowWidth * 0.3 * 1.2}
            radius={24}
          >
            <TouchableOpacity
              key={item?._id}
              style={[
                styles.cardContainer,
                index % 2 === 0 ? styles.cardGreen : styles.cardYellow,
              ]}
              onPress={() => {
                router.push({
                  pathname: `/library/${item?._id}`,
                  params: {
                    index,
                  },
                });
              }}
            >
              <Image
                source={linear_gradient_1}
                style={styles.linearBackground1}
              />
              <Image
                source={linear_gradient_1}
                style={styles.linearBackground2}
              />
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
                  styles.contentCard,
                  index % 2 === 0
                    ? { flexDirection: "row" }
                    : { flexDirection: "row-reverse" },
                ]}
              >
                <View style={[getTextContainer(index % 2)]}>
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
        )}
        ListEmptyComponent={
          <View style={styles.container_emptyData}>
            <Text style={styles.title_emptyData}>Không có thư viện nào</Text>
            <Text style={styles.content_emptyData}>
              Hãy thử tìm chủ đề khác
            </Text>
          </View>
        }
        // style={styles.cardListContainer}
        contentContainerStyle={styles.cardListContainer}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  contentCard: {
    display: "flex",
    position: "relative",
    width: "100%",
    pointerEvents: "none",
  },
  title_emptyData: {
    fontSize: 20,
    fontWeight: "700",
  },
  content_emptyData: {
    fontSize: 14,
    fontWeight: "500",
  },
  container_emptyData: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    position: "relative",
    minWidth: windowWidth / 4,
  },
  tabText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  activeTabText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: "#4CAF50",
  },
  header_space: {
    paddingTop: 20,
  },
  footer_space: {
    paddingBottom: 40,
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
  cardListContainer: {
    paddingVertical: 0,
    paddingHorizontal: 12,
    gap: 30,
  },
  cardContainer: {
    width: "100%",
    height: windowWidth * 0.3 * 1.2,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    overflow: "hidden",
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
    fontSize: scaleFont(24),
    lineHeight: 34,
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
