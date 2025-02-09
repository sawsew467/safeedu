import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import SafeViewAndroid from "@/components/ui/SafeViewAndroid";
import HeaderShown from "@/components/ui/HeaderShown";
import { DataType } from "@/healper/type/news-type";
import GameResult from "@/components/features/GameTestTheoryModule/GameResult";
import { useGetNewsQuery } from "@/services/news/news.api";
import { formatDate } from "@/utils/format-date";
import RenderHtml from "react-native-render-html";
import { coverHTMLToReactNative } from "@/utils/cover-html-to-reactnative";
import { styles_mardown } from "@/healper/style/renderHtml";
const externalPadingContent = 60;

const NewsDetail = () => {
  const { newsID }: { newsID: string } = useLocalSearchParams();
  const width = Dimensions.get("window").width;

  const { newsDetailData, isFetching, isSuccess } = useGetNewsQuery(
    { id: newsID },
    {
      selectFromResult: ({ data, isFetching, isSuccess }) => {
        return {
          newsDetailData: data,
          isFetching,
          isSuccess: data?.isActive ? isSuccess : false,
        };
      },
    }
  );

  const CustomImageRenderer = ({ tnode }) => {
    const uri = tnode.attributes.src;

    return (
      <View style={styles.imageContainer}>
        {uri ? (
          <Image
            source={{ uri }}
            style={[styles.image, { width: width - externalPadingContent }]}
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
          <View style={styles.backgroundContainer}>
            <Image
              style={styles.background}
              source={require("@/assets/images/news_image/newsDetail_background.jpg")}
            />
          </View>
        )}
      >
        <View style={styles.newsContainer}>
          <View style={styles.whiteBoard}>
            <View style={styles.newsDetailContainer}>
              <Text style={styles.not_found}>Không tìm thấy trang</Text>
            </View>
          </View>
        </View>
      </HeaderShown>
    );
  return (
    <HeaderShown
      title="Thông Tin Chi Tiết"
      HeaderComponent={() => (
        <View style={styles.backgroundContainer}>
          <Image
            style={styles.background}
            source={
              newsDetailData?.image
                ? { uri: newsDetailData?.image }
                : require("@/assets/images/news_image/newsDetail_background.jpg")
            }
          />
        </View>
      )}
    >
      <View style={styles.newsContainer}>
        <View style={styles.whiteBoard}>
          <View style={styles.newsDetailContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{newsDetailData?.title}</Text>
            </View>
            <View style={styles.container_detailNews}>
              <Text style={styles.newsDate}>
                {formatDate(
                  newsDetailData?.updated_at ?? newsDetailData?.created_at,
                  "DD MMMM ,YYYY - HH:mm"
                )}
              </Text>
              <View style={styles.badge}>
                <Text style={styles.text_badge}>
                  {newsDetailData?.topic_id?.topic_name}
                </Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: newsDetailData?.image }}
                alt={`image about ${newsDetailData?.title}`}
              />
            </View>
            <RenderHtml
              contentWidth={width - externalPadingContent}
              source={{ html: newsDetailData?.content }}
              enableExperimentalMarginCollapsing={true}
              classesStyles={styles_mardown}
              tagsStyles={styles_mardown}
              renderers={renderers}
            />
          </View>
        </View>
      </View>
    </HeaderShown>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container_detailNews: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignContent: "center",
  },
  badge: {
    paddingHorizontal: 10,
    paddingBlock: 4,
    backgroundColor: "#75A815",
    alignSelf: "flex-start",
    width: "auto",
    borderRadius: 8,
    marginTop: 4,
  },
  text_badge: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "semibold",
    textTransform: "capitalize",
  },
  safeArea: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  not_found: {
    fontWeight: "700",
    fontSize: 29,
    lineHeight: 38,
    alignSelf: "center",
  },
  backgroundContainer: {
    width: "100%",
    height: "30%",
    position: "absolute",
    zIndex: 0,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  newsContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 2,
    paddingTop: 60,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  whiteBoard: {
    width: "100%",
    height: "100%",
    paddingTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingBottom: 100,
  },
  newsDetailContainer: {
    width: "100%",
    paddingHorizontal: 15,
  },
  titleContainer: {},
  title: {
    fontWeight: "700",
    fontSize: 29,
    lineHeight: 38,
  },
  newsDate: {
    lineHeight: 25,
    fontWeight: "700",
    fontSize: 12,
    color: "#75A815",
    paddingVertical: 5,
    paddingBottom: 15,
  },
  content: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 25.6,
    color: "#000000",
    paddingBottom: 15,
    marginTop: 15,
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
  caption: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 22.4,
    color: "#8C8C8A",
    paddingVertical: 15,
    alignSelf: "center",
  },
});
