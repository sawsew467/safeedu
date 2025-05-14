import {
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Animated,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  RefreshControl,
} from "react-native";
import GlobalStyles from "@/components/ui/SafeViewAndroid";
import frog_draw from "@/assets/icons/frog_draw.png";
import React from "react";

import { DRAW_DATA } from "@/healper/data/contest";
import chevron_left from "@/assets/icons/chevron_left.png";
import { Link, router, useLocalSearchParams, usePathname } from "expo-router";
import HeaderShown from "@/components/ui/HeaderShown";
import {
  useGetAllCommentByPictureIdQuery,
  useGetAllPictureByQuizIdQuery,
  useGetPictureQuery,
} from "@/services/competitions/competitions.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { content } from "@/tailwind.config";
import { Picture } from "@/healper/type/Contest";
import { formatDate } from "@/utils/format-date";
import ModalViewPicture from "./ModalViewPicture";

type ItemProps = {
  image: any;
  slug: string;
  handleClickBtn: (id: string) => void;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  item: {
    flex: 1,
    width: "50%",
    borderRadius: 24,
    aspectRatio: "19/28",
    overflow: "hidden",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
  },
  frog_draw: {
    position: "absolute",
    right: 4,
    top: 36.5,
    zIndex: 10,
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
    backgroundColor: "#fff",
  },
  headerContainer: {
    overflow: "hidden",
    borderBottomLeftRadius: 24,
    height: 64,
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "white",
    elevation: 4,
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
});

const ListItem = ({ image, slug, handleClickBtn }: ItemProps) => {
  const pathname = usePathname();

  return (
    <TouchableOpacity onPress={() => handleClickBtn(slug)} style={styles.item}>
      <View>
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </TouchableOpacity>
  );
};

function DrawPictureContest() {
  const { drawPictureID }: { drawPictureID: string } = useLocalSearchParams();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [pictureId, setPictureDetail] = React.useState(null);

  const { pictures, isFetching, refetch } = useGetAllPictureByQuizIdQuery(
    drawPictureID ? { id: drawPictureID } : skipToken,
    {
      selectFromResult: ({ data, isFetching }) => ({
        pictures: data?.data,
        isFetching,
      }),
    }
  );

  const {
    detailPicture,
    isFetchingPicture,
  }: { detailPicture: Picture; isFetchingPicture: boolean } =
    useGetPictureQuery(pictureId ? { id: pictureId } : skipToken, {
      selectFromResult: ({ data, isFetching }) => ({
        detailPicture: data?.data,
        isFetchingPicture: isFetching,
      }),
    });

  const { comments, isFetchingComment } = useGetAllCommentByPictureIdQuery(
    pictureId ? { id: pictureId } : skipToken,
    {
      selectFromResult: ({ data, isFetching }) => ({
        comments: data?.data,
        isFetchingComment: isFetching,
      }),
    }
  );

  const scrollY = new Animated.Value(0);
  const stickyOpacity = scrollY.interpolate({
    outputRange: [0, 1],
    inputRange: [0, 160],
    extrapolate: "clamp",
  });
  const stickyTop = scrollY.interpolate({
    outputRange: [-60, 20],
    inputRange: [0, 160],
    extrapolate: "clamp",
  });

  const handleClickBtn = () => {
    router.back();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleClickPicture = (id: string) => {
    setPictureDetail(id);
  };

  return (
    <HeaderShown
      title="Vẽ tranh cổ động"
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={isFetching} />
      }
    >
      <ModalViewPicture
        open={!!pictureId}
        setPictureDetail={setPictureDetail}
        picture={detailPicture}
        comments={comments}
        isFetching={isFetchingComment || isFetchingPicture}
      />
      <View style={styles.frog_draw}>
        <Image source={frog_draw} />
      </View>
      <FlatList
        scrollEnabled={false}
        data={pictures}
        numColumns={2}
        columnWrapperStyle={{ gap: 20 }}
        key={"key"}
        renderItem={({ item }: { item: Picture }) => (
          <ListItem
            image={item?.picture}
            slug={item?._id}
            handleClickBtn={handleClickPicture}
          />
        )}
        keyExtractor={(item: Picture) => item?._id}
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 16,
          marginTop: 100,
          width: "100%",
          paddingBottom: 100,
        }}
      />
    </HeaderShown>
  );
}

export default DrawPictureContest;
