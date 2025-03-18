import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleProp,
  ImageStyle,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";

import { Slider } from "@/components/features/News/NewSection/Slider/Slider";

import logo from "@/assets/images/news_image/news_logo.png";
import { router } from "expo-router";
import { compareDatesStrict, formatDate } from "@/utils/format-date";
import { useGetAllNewsQuery } from "@/services/news/news.api";
import { useGetAllTopicsQuery } from "@/services/topic/topic.api";
import { Topic } from "@/healper/type/topic.type";
import React, { useEffect, useState } from "react";
import { TypeNews } from "@/healper/type/news.type";

import nav_background from "@/assets/images/background_nav_home.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Button } from "@/components/ui/Button";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { skeletonCommonProps } from "@/healper/type/type-common-skeleton";

const width = Dimensions.get("window").width;

const buttons = [
  // {
  //   id: 1,
  //   icon: () => (
  //     <Ionicons name="extension-puzzle-outline" size={24} color="#75A815" />
  //   ),
  //   text: "Trò chơi",
  //   route: "game",
  //   bgColor: "bg-white",
  // },
  {
    id: 2,
    icon: () => <Feather name="book" size={24} color="#75A815" />,
    text: "Thư viện",
    route: "/library",
    bgColor: "bg-white",
  },
];

export function NewSection() {
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

  const { newsData, newsSliderData, isFetching, refetch, isSuccessNews } =
    useGetAllNewsQuery(undefined, {
      skip: !isSuccess,
      selectFromResult: ({ data, isFetching, isSuccess: isSuccessNews }) => {
        const activeData =
          data?.items?.filter((item: TypeNews) => item?.isActive) ?? [];
        const slideData = activeData
          ?.sort((item: TypeNews, other: TypeNews) =>
            compareDatesStrict(other?.created_at, item?.created_at)
          )
          .slice(0, 5);
        return {
          newsData: activeData,
          newsSliderData: slideData,
          isFetching,
          isSuccessNews,
        };
      },
    });

  const header = React.useMemo(
    () => (
      <View>
        <Text style={styles.newsText}>Tin mới</Text>
        <View style={styles.logoContainer}>
          <Image
            source={logo}
            style={styles.logoImage as StyleProp<ImageStyle>}
            resizeMode="cover"
          />
        </View>
        <Slider isFetching={isFetching} data={newsSliderData} />
        {/* <View className="flex-1 items-center justify-center mt-6 mb-8">
          <Image
            source={nav_background}
            resizeMode="contain"
            className="w-[110%] absolute"
          />
          <View className="flex flex-row justify-center items-center">
            {buttons.map((button) => (
              <Button
                onPress={() => {
                  router.push(button.route);
                }}
                key={button.id}
                className={`flex-1 h-[120%] mx-1.5 ${button.bgColor} rounded-2xl`}
              >
                <View className="flex flex-col justify-center items-center">
                  {button.icon()}
                  <Text className="text-[#75A815]">{button.text}</Text>
                </View>
              </Button>
            ))}
          </View>
        </View> */}
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
    ),
    [activeTab, newsSliderData, isFetching]
  );

  const onRefresh = () => {
    if (isSuccessNews) {
      refetch();
    }
  };

  return (
    <FlatList
      style={styles.sectionContainer}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
      ListHeaderComponent={header}
      contentContainerStyle={styles.flatListContainer}
      data={
        isFetching
          ? Array.from({ length: 5 })
          : newsData?.filter(
              (item: TypeNews) => item?.topic_id?._id === activeTab
            )
      }
      keyExtractor={(item) => item?._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            router.push(`/news/${item?._id}`);
          }}
        >
          <MotiView
            transition={{
              type: "timing",
            }}
            style={styles.listItem}
          >
            <Skeleton
              show={isFetching}
              width={100}
              height={100}
              radius={8}
              {...skeletonCommonProps}
            >
              <Image
                source={{ uri: item?.image }}
                style={styles.listImage as StyleProp<ImageStyle>}
                resizeMode="cover"
                alt={`image about ${item?.title}`}
              />
            </Skeleton>
            <View style={styles.listTextContainer}>
              <View>
                <Skeleton
                  show={isFetching}
                  width={"100%"}
                  height={30}
                  radius={8}
                  {...skeletonCommonProps}
                >
                  <Text className="font-pmedium" style={styles.listTitle}>
                    {item?.title}
                  </Text>
                </Skeleton>
              </View>
              <View>
                <Skeleton
                  show={isFetching}
                  width={"60%"}
                  height={20}
                  radius={8}
                  {...skeletonCommonProps}
                >
                  <Text style={styles.listDate}>
                    {formatDate(item?.updated_at ?? item?.create_at)}
                  </Text>
                </Skeleton>
              </View>
              {item && (
                <View style={styles.badge}>
                  <Text style={styles.text_badge}>
                    {item?.topic_id?.topic_name}
                  </Text>
                </View>
              )}
            </View>
          </MotiView>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  skeletonPadded: {
    padding: 16,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    position: "relative",
    minWidth: width / 4,
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
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  image: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: "#666",
  },
  badge: {
    paddingHorizontal: 8,
    paddingBlock: 4,
    backgroundColor: "#75A815",
    alignSelf: "flex-start",
    width: "auto",
    borderRadius: 8,
    marginTop: 8,
  },
  text_badge: {
    color: "#fff",
    fontSize: 10,
  },
  sectionContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 32,
    zIndex: 1,
  },
  newsText: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    top: 12,
    padding: 8,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 10,
    top: 36,
    left: "50%",
    transform: [{ translateX: -104 }, { translateY: -70 }],
  },
  logoImage: {
    width: 208,
    height: 140,
  },
  suggestionText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  flatListContainer: {
    marginTop: 20,
    gap: 8,
    paddingBottom: 80,
  },
  listItem: {
    flexDirection: "row",
    gap: 12,
  },
  listImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#75a81528",
  },
  listTextContainer: {
    flex: 1,
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
  },
  listTitle: {
    fontSize: 16,
    minHeight: 20,
    fontWeight: "bold",
  },
  listDate: {
    fontSize: 12,
    minHeight: 20,
    fontWeight: "bold",
    color: "#8F9F96",
  },
});
