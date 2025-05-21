import { Button } from "@/components/ui/Button";
import { CommentType, Picture } from "@/healper/type/Contest";
import { cn } from "@/utils/cn";
import { formatDate } from "@/utils/format-date";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import stylesAndroid from "@/components/ui/SafeViewAndroid";

import {
  useCommentPictureMutation,
  useGetAllCommentByPictureIdQuery,
  useGetPictureQuery,
} from "@/services/competitions/competitions.api";
import { MotiView } from "moti";
import { skeletonCommonProps } from "@/healper/type/type-common-skeleton";
import { useGetMeQuery } from "@/services/user/user.api";
import HeaderShown from "@/components/ui/HeaderShown";
import { skipToken } from "@reduxjs/toolkit/query";

const width = Dimensions.get("window").width;

const formatDateFromNow = (date: string) => {
  return moment(new Date(date)).startOf("second").fromNow();
};

const ModalViewPicture = () => {
  const { pictureID } = useLocalSearchParams();
  const [inputValue, setInputValue] = React.useState<string>("");
  const router = useRouter();
  const [createComment] = useCommentPictureMutation();
  const handleSubmitComment = async () => {
    if (inputValue.length === 0) return;
    try {
      await createComment({
        picture_id: picture?._id,
        content: inputValue,
      }).unwrap();
      setInputValue("");
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const { myseft } = useGetMeQuery(undefined, {
    selectFromResult: ({ data }) => {
      return {
        myseft: data?.data,
      };
    },
  });

  const { picture, isFetching }: { picture: Picture; isFetching: boolean } =
    useGetPictureQuery(pictureID ? { id: pictureID } : skipToken, {
      selectFromResult: ({ data, isFetching }) => ({
        picture: data?.data,
        isFetching: isFetching,
      }),
    });

  const { comments, isFetchingComment } = useGetAllCommentByPictureIdQuery(
    pictureID ? { id: pictureID } : skipToken,
    {
      selectFromResult: ({ data, isFetching }) => ({
        comments: data?.data,
        isFetchingComment: isFetching,
      }),
    }
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, stylesAndroid.AndroidSafeArea]}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {isFetching ? (
        <ModalViewPictureSkeleton />
      ) : (
        <View className={cn("h-full", Platform.OS === "ios" && "pt-10")}>
          <View className="flex p-4 bg-transparent flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Entypo name="chevron-left" size={30} className="text-primary" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push(`/account/${picture?.user_id?.username}`);
              }}
            >
              <Image
                source={{ uri: picture?.user_id?.avatar }}
                className="w-12 h-12 rounded-full"
              />
            </TouchableOpacity>
            <View>
              <Link
                href={`/account/${picture?.user_id?.username}`}
                className="flex flex-row "
              >
                <Text className="font-pmedium">
                  {picture?.user_id?.first_name} {picture?.user_id?.last_name}{" "}
                </Text>
                <Text className="font-psemibold ml-4 underline">
                  @{picture?.user_id?.username}
                </Text>
              </Link>
              <Text className="first-letter:capitalize text-gray-500">
                {formatDate(
                  picture?.created_at,
                  "dddd, [Ngày] DD [tháng] MM[,] YYYY"
                )}
              </Text>
            </View>
          </View>
          <ScrollView overScrollMode="never">
            <View className="flex flex-1 w-full h-[90%] bg-white">
              <View className="flex">
                <View
                  style={{
                    width: width,
                    height: width * 0.65,
                  }}
                  className="flex flex-1 bg-black/10 py-2 h-auto items-center w-full justify-center"
                >
                  <Image
                    className="max-h-[500px] w-full h-full"
                    source={{ uri: picture?.picture }}
                    resizeMode="contain"
                  />
                </View>
                <View className="mx-4 flex-1">
                  <View className="mt-2">
                    <View className="flex flex-row gap-1">
                      <Text className="font-pmedium">Bài dự thi:</Text>
                      <Text className="font-pmedium text-primary">
                        {picture?.name}.
                      </Text>
                    </View>
                    <View className="flex flex-row gap-1">
                      <Text className="font-pregular ">
                        {picture?.description}.
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="first-letter:capitalize text-gray-500">
                      {formatDate(
                        picture?.created_at,
                        "dddd, [Ngày] DD [tháng] MM[,] YYYY"
                      )}
                    </Text>
                  </View>
                </View>

                <View className="flex m-4 space-y-4">
                  {comments?.map((comment: CommentType) => (
                    <View
                      className="flex w-[90%] flex-1 flex-row justify-start"
                      style={{ gap: 10 }}
                      key={comment?._id}
                    >
                      <View>
                        <Image
                          source={{ uri: comment?.user_id?.avatar }}
                          className="w-12 h-12 rounded-full"
                        />
                      </View>
                      <View className="flex justify-start">
                        <Link href="" className="flex flex-row">
                          <Text className="font-pmedium text-sm mr-2">
                            {comment?.user_id?.first_name}{" "}
                            {comment?.user_id?.last_name}{" "}
                          </Text>
                          <Text className="font-plight text-xs underline pl-4">
                            @{comment?.user_id?.username}
                          </Text>
                        </Link>
                        <Text className="font-pregular">
                          {comment?.content}
                        </Text>
                        <Text className="font-plight text-xs text-gray-500">
                          {formatDateFromNow(comment?.updated_at)}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="bg-white pb-4 border-t-[1px] border-gray-500">
            <View className="m-2 flex flex-row items-center">
              <TouchableOpacity>
                <Image
                  source={{ uri: myseft?.avatar }}
                  className="w-10 h-10 rounded-full"
                />
              </TouchableOpacity>
              <TextInput
                multiline={true}
                numberOfLines={4}
                className="flex-1  mx-2"
                placeholder="Nhập bình luận của bạn..."
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
              />
              <Button
                className={cn(
                  "bg-primary rounded-lg",
                  inputValue.length === 0 && "bg-primary/50"
                )}
                textClassName="text-white py-1 px-2"
                onPress={handleSubmitComment}
                disabled={inputValue.length === 0}
              >
                Gửi
              </Button>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const Skeleton = ({ width, height, radius = 4, delay = 0 }) => {
  return (
    <MotiView
      transition={{
        type: "timing",
        duration: 2000,
        delay,
      }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      style={{
        width,
        height,
        borderRadius: radius,
        backgroundColor: "#DFDFDF",
      }}
      from={{
        opacity: 0.3,
      }}
      {...skeletonCommonProps}
    />
  );
};

const ModalViewPictureSkeleton = () => {
  return (
    <View>
      {/* Header */}
      <View className="flex p-4 bg-white flex-row items-center gap-2">
        <TouchableOpacity>
          <Entypo name="chevron-left" size={30} className="text-primary" />
        </TouchableOpacity>

        {/* Avatar skeleton */}
        <Skeleton width={48} height={48} radius={24} />

        <View>
          {/* Username skeleton */}
          <Skeleton width={150} height={18} delay={300} />
          {/* Date skeleton */}
          <View className="mt-2">
            <Skeleton width={180} height={14} delay={600} />
          </View>
        </View>
      </View>

      <ScrollView overScrollMode="never">
        <View className="flex w-full h-full min-h-screen bg-white">
          <View className="flex">
            {/* Main image skeleton */}
            <View
              style={{
                width: width,
                height: width * 0.6,
              }}
              className="flex flex-1 bg-black/10 h-auto items-center w-full justify-center"
            >
              <Skeleton width={width} height={width * 0.6} delay={200} />
            </View>

            {/* Image title and description */}
            <View className="mx-4 flex-1">
              <View className="mt-2">
                <View className="flex flex-row gap-1">
                  <Skeleton width={width * 0.7} height={18} delay={400} />
                </View>
                <View className="flex flex-row gap-1 mt-2">
                  <Skeleton width={width * 0.9} height={16} delay={500} />
                </View>
              </View>
              <View className="mt-2">
                <Skeleton width={180} height={14} delay={600} />
              </View>
            </View>

            {/* Comments section */}
            <View className="flex m-4 space-y-4">
              {/* Comment 1 */}
              <View className="flex w-[90%] flex-1 flex-row gap-2 justify-start">
                <Skeleton width={48} height={48} radius={24} delay={700} />
                <View className="flex justify-start flex-1">
                  <Skeleton width={150} height={18} delay={800} />
                  <View className="mt-2">
                    <Skeleton width={width * 0.7} height={16} delay={900} />
                  </View>
                  <View className="mt-1">
                    <Skeleton width={80} height={12} delay={1000} />
                  </View>
                </View>
              </View>

              {/* Comment 2 */}
              <View className="flex w-[90%] flex-1 flex-row gap-2 justify-start">
                <Skeleton width={48} height={48} radius={24} delay={1100} />
                <View className="flex justify-start flex-1">
                  <Skeleton width={150} height={18} delay={1200} />
                  <View className="mt-2">
                    <Skeleton width={width * 0.6} height={16} delay={1300} />
                  </View>
                  <View className="mt-1">
                    <Skeleton width={80} height={12} delay={1400} />
                  </View>
                </View>
              </View>

              {/* Comment 3 */}
              <View className="flex w-[90%] flex-1 flex-row gap-2 justify-start">
                <Skeleton width={48} height={48} radius={24} delay={1500} />
                <View className="flex justify-start flex-1">
                  <Skeleton width={150} height={18} delay={1600} />
                  <View className="mt-2">
                    <Skeleton width={width * 0.8} height={16} delay={1700} />
                  </View>
                  <View className="mt-1">
                    <Skeleton width={80} height={12} delay={1800} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Comment input area */}
      <View className="bg-white border-t-[1px] border-gray-500">
        <View className="m-2 flex flex-row items-center justify-between">
          <Skeleton width={width * 0.75} height={40} radius={8} delay={1900} />
          <Skeleton width={60} height={40} radius={8} delay={2000} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ModalViewPicture;
