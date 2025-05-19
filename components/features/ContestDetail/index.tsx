import {
  Image,
  FlatList,
  View,
  StyleSheet,
  Animated,
  Platform,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import GlobalStyles from "@/components/ui/SafeViewAndroid";
import React from "react";
import location from "@/assets/icons/location.png";
import { ContentType, DataType } from "../Contest";
import { DATA } from "@/healper/data/contest";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import book from "@/assets/icons/book.png";
import chrven_bottom from "@/assets/icons/chevron_bottom.png";
import chrven_top from "@/assets/icons/chevron_top.png";
import chrven_right from "@/assets/icons/chevron_right.png";
import HeaderShown from "@/components/ui/HeaderShown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  useGetCompetitionQuery,
  useGetQuizzBySlugQuery,
} from "@/services/competitions/competitions.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { Quizz, QuizzType } from "@/healper/type/Contest";
import { useGetMeQuery } from "@/services/user/user.api";
import { Button } from "@/components/ui/Button";
type ItemProps = {
  item: Quizz;
  index: number;
  id: string;
};

const styles = StyleSheet.create({
  scrollViewContent: {
    marginTop: 20,
    paddingBottom: 20,
  },
  animatedView: {
    height: 48,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    opacity: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  readMoreText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#00000075",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    width: "100%",
    height: 56,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08, // tương đương với #00000014 (8% opacity)
    shadowRadius: 12,
    elevation: 4, // Dùng cho Android để có hiệu ứng shadow
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "pbold",
  },
  animatedHeader: {
    height: 80,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    position: "absolute",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 0,
    top: 0, // -150 -> 0
    left: 0,
    right: 0,
    opacity: 1,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 16,
        shadowOffset: {
          width: 4,
          height: 3,
        },
      },
    }),
  },
  safeAreaView: {
    ...GlobalStyles.AndroidSafeArea,
    paddingTop: 0,
  },
  headerContainer: {
    overflow: "hidden",
    borderBottomLeftRadius: 24,
    height: 64,
    position: "absolute",
    top: 35,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "white",
  },
  headerContent: {
    display: "flex",
    marginLeft: 10,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignContent: "center",
  },
  backButtonContainer: {
    width: 28,
    height: 28,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  headerTitle: {
    fontWeight: "500",
    fontSize: 20,
    width: "100%",
  },
  imageContainer: {
    height: 400,
    marginTop: 0,
  },
  imageDarkOverlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 2,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "black",
    position: "absolute",
    right: 0,
    left: 0,
  },
  contentContainer: {
    marginTop: 96,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 16,
    zIndex: 3,
  },
  contentTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 28,
    marginTop: 20,
  },
  locationIcon: {
    width: 28,
    height: 28,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    width: "100%",
  },
  flatListContainer: {
    paddingTop: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  flatListHeaderContainer: {
    paddingHorizontal: 16,
  },
  flatListHeaderContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: 20,
    flexDirection: "row",
    gap: 12,
  },
  bookIcon: {
    width: 24,
    height: 28,
  },
  flatListHeaderTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  expandButtonContainer: {
    marginTop: 8,
  },
  expandButtonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
  },
  expandButtonIcon: {
    width: 8,
    height: 8,
  },
});

const ListItem = ({ item, index, id }: ItemProps) => {
  const handleClickBtn = (item: Quizz) => {
    switch (item?.type) {
      case QuizzType.SingleChoice:
        router.push(`/contest/${id}/quiz/${item?._id}`);
        break;
      case QuizzType.PaintingPropaganda:
        router.push(`/contest/${id}/drawPicture/${item?._id}`);
        break;
    }
  };
  return (
    <TouchableOpacity
      style={{ paddingHorizontal: 16 }}
      onPress={() => handleClickBtn(item)}
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>{`${index + 1}. ${item?.title}`}</Text>
        <Image source={chrven_right} style={{ width: 24, height: 24 }} />
      </View>
    </TouchableOpacity>
  );
};

function Contest() {
  const { contestID }: { contestID: string } = useLocalSearchParams();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const { isError } = useGetMeQuery(undefined, {
    selectFromResult: ({ isError, isFetching }) => ({
      isError: isError && !isFetching,
    }),
  });

  const { quizs, competition, isFetching, isSuccess, refetch } =
    useGetQuizzBySlugQuery(contestID ? { id: contestID } : skipToken, {
      selectFromResult: ({ data, isFetching, isSuccess }) => ({
        quizs: data?.data?.data,
        competition: data?.data?.data?.at(0)?.competitionId?.at(0),
        isFetching,
        isSuccess,
      }),
    });

  const scrollY = new Animated.Value(0);
  const stickyTopViewContent = scrollY.interpolate({
    outputRange: [-80, -200],
    inputRange: [0, 160],
    extrapolate: "clamp",
  });

  const handleClickRankingBtn = () => {
    router.push(`contest/${contestID}/leaderboard`);
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const onRefresh = () => {
    if (isSuccess) {
      refetch();
    }
  };

  return (
    <HeaderShown
      title="Mô tả cuộc thi"
      rightIcon={{
        icon: () => (
          <MaterialIcons name="leaderboard" size={24} color="black" />
        ),
        onPress: handleClickRankingBtn,
      }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
          useNativeDriver: false,
        }
      )}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
    >
      <View style={styles.imageContainer}>
        <View style={styles.imageDarkOverlay} />
        <Image
          source={{ uri: competition?.image_url }}
          resizeMode="cover"
          style={styles.backgroundImage}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle} className="font-pbold">
            {competition?.title}
          </Text>
          <View style={styles.locationContainer}>
            <Image source={location} style={styles.locationIcon} />
            <Text style={styles.locationText}>
              {competition?.organizations ?? "Toàn quốc"}
            </Text>
          </View>
        </View>
      </View>
      <Animated.View
        style={[
          {
            height: "100%",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            position: "relative",
            overflow: "hidden",
            zIndex: 5,
          },
          {
            top: stickyTopViewContent,
          },
        ]}
      >
        <FlatList
          scrollEnabled={false}
          style={styles.flatListContainer}
          data={isError ? [] : isFetching ? [] : quizs}
          renderItem={({ item, index }: { item: Quizz; index: number }) => (
            <ListItem item={item} index={index} id={contestID} />
          )}
          keyExtractor={(item: Quizz) => item.slug}
          ListEmptyComponent={() => (
            <View className="flex flex-1 items-center justify-center h-full">
              <Text className="text-xl font-pmedium">
                Vui lòng đăng nhập để tham gia cuộc thi này
              </Text>
              <View className="flex flex-row justify-center items-center gap-2 mt-4">
                <TouchableOpacity
                  onPress={handleSignIn}
                  className="w-44 flex items-center border-2  rounded-xl py-4 border-primary"
                >
                  <Text className="text-primary text-lg">Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSignUp}
                  className="w-44 border-2 flex items-center px-8 rounded-xl py-4 border-primary bg-primary"
                >
                  <Text className="text-white text-lg">Đăng kí</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles.flatListHeaderContainer}>
              <View style={styles.flatListHeaderContent}>
                <Image source={book} style={styles.bookIcon} />
                <Text
                  style={styles.flatListHeaderTitle}
                  className="font-psemibold"
                >
                  Thể lệ cuộc thi
                </Text>
              </View>
              <View>
                <Text
                  style={styles.text}
                  numberOfLines={isExpanded ? undefined : 3}
                >
                  {"    "}
                  {competition?.description}
                </Text>
                <TouchableOpacity
                  onPress={toggleExpanded}
                  style={styles.expandButtonContainer}
                >
                  <View style={styles.expandButtonContent}>
                    <Text style={styles.readMoreText}>
                      {isExpanded ? "Lược bớt" : "Xem thêm"}
                    </Text>
                    <View style={styles.expandButtonIcon}>
                      <Image source={isExpanded ? chrven_top : chrven_bottom} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{
            gap: 20,
            paddingVertical: 16,
            overflow: "hidden",
          }}
        />
      </Animated.View>
    </HeaderShown>
  );
}

export default Contest;
