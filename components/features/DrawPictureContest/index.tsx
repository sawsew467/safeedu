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
  useGetMyPictureQuery,
  useGetPictureQuery,
  useIsDoQuizzQuery,
} from "@/services/competitions/competitions.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { content } from "@/tailwind.config";
import { Picture } from "@/healper/type/Contest";
import { formatDate } from "@/utils/format-date";
import ModalViewPicture from "./ViewPicture";
import { Button } from "@/components/ui/Button";
import { deleteClientCookie } from "@/lib/jsCookies";
import constants from "@/settings/constants";
import { useGetQuizzQuery } from "@/services/quiz/quiz.api";
import { useAppDispatch } from "@/hooks/redux";
import { setAccessToken, setRefreshToken } from "../auth/slices";
import ModalScorePicture from "./ViewScorePicture";
import UploadMyPicture from "./uploadnewPicture";

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
    right: 2,
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
  const [isOpenUploadNewPicture, setOpenUploadNewPicture] =
    React.useState(false);
  const [isOpenViewScore, setOpenViewScore] = React.useState(false);

  const dispatch = useAppDispatch();

  const { pictures, isFetching } = useGetAllPictureByQuizIdQuery(
    drawPictureID ? { id: drawPictureID } : skipToken,
    {
      selectFromResult: ({ data, isFetching }) => ({
        pictures: data?.data,
        isFetching,
      }),
    }
  );

  const { quiz, competition } = useGetQuizzQuery(
    drawPictureID ? { id: drawPictureID } : skipToken,
    {
      selectFromResult: ({ data, isFetching }) => ({
        quiz: data?.data,
        competition: data?.data?.competitionId?.at(0),
        isFetching,
      }),
    }
  );

  const { status, refetch } = useIsDoQuizzQuery(
    drawPictureID ? { id: drawPictureID } : skipToken,
    {
      selectFromResult: ({ data }) => ({
        status: data?.data?.status,
      }),
    }
  );

  const { myPicture }: { myPicture: Picture } = useGetMyPictureQuery(
    status === "done" ? { id: drawPictureID } : skipToken,
    {
      selectFromResult: ({ data }) => ({
        myPicture: data?.data,
      }),
    }
  );

  const statusCompetition =
    new Date(competition?.startDate) > new Date()
      ? "Upcoming"
      : new Date(competition?.endDate) < new Date()
      ? "Outgoing"
      : "Ongoing";

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
    router.push(`/contest/${drawPictureID}/drawPicture/${drawPictureID}/${id}`);
  };

  return (
    <HeaderShown
      title="Vẽ tranh cổ động"
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={isFetching} />
      }
    >
      <View>
        {status === "not-started" && statusCompetition === "Ongoing" ? (
          <View className="flex flex-1 gap-2 mt-5 px-4">
            <Button
              variant="primary"
              onPress={() => {
                if (status === "not-started") setOpenUploadNewPicture(true);
                else if (status === undefined) {
                  dispatch(setAccessToken(null));
                  dispatch(setRefreshToken(null));
                }
              }}
            >
              Nộp tranh
            </Button>
          </View>
        ) : (
          status === "done" && (
            <View className="flex flex-row">
              <View className="flex flex-1 gap-2 mt-5 px-4">
                <Button
                  variant="outline"
                  onPress={() => {
                    setOpenViewScore(true);
                  }}
                >
                  Xem điểm của bài thi
                </Button>
                <Button
                  variant="primary"
                  onPress={() => {
                    handleClickPicture(myPicture?._id);
                  }}
                >
                  Xem bài thi của mình
                </Button>
              </View>
            </View>
          )
        )}
        <ModalScorePicture
          visible={isOpenViewScore}
          onClose={() => setOpenViewScore(false)}
          quiz_id={drawPictureID}
        />
        <UploadMyPicture
          isVisible={isOpenUploadNewPicture}
          setVisible={() => setOpenUploadNewPicture(false)}
          quiz_id={drawPictureID}
        />
        <View className="relative ">
          <View style={[styles.frog_draw, { top: 36.2 }]}>
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
        </View>
      </View>
    </HeaderShown>
  );
}

export default DrawPictureContest;
