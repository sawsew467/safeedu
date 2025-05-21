import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Link, router } from "expo-router";
import { Competitions } from "@/healper/type/Contest";
import { formatDate } from "@/utils/format-date";
import { skeletonCommonProps } from "@/healper/type/type-common-skeleton";
import { Skeleton } from "moti/skeleton";

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: 24,
  },
});

const ContestItem = ({ item }: { item: Competitions }) => {
  return (
    <TouchableOpacity onPress={() => router.push(`/contest/${item?.slug}`)}>
      <View className="flex w-60 h-72 flex-col" style={style.shadow}>
        <View className="rounded-3xl rounded-b-none overflow-hidden">
          <Image
            source={{ uri: item?.image_url }}
            className="w-full h-44"
            resizeMode="cover"
          />
        </View>
        <View className="p-4">
          <Text className="text-sm font-pnormal" numberOfLines={1}>
            {formatDate(item?.endDate, "DD MMMM YYYY")}
          </Text>
          <Text
            className="text-base font-medium break-all h-12"
            numberOfLines={2}
          >
            {item?.title}
          </Text>
          {/* <Text
            numberOfLines={1}
            className="text-sm font-normal text-[#7E7E7E]"
          >
            {item?.number_join} người tham gia
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ContestSlide = ({
  item,
  isFetching,
}: {
  item: Competitions[];
  isFetching: boolean;
}) => {
  return (
    <FlatList
      overScrollMode="never"
      bounces={false}
      data={isFetching ? Array.from({ length: 5 }) : item}
      renderItem={({ item }) => (
        <Skeleton
          show={isFetching}
          width={240}
          height={290}
          radius={24}
          {...skeletonCommonProps}
        >
          <ContestItem item={item as Competitions} />
        </Skeleton>
      )}
      keyExtractor={(item: Competitions) => item?.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 20,
        overflow: "visible",
        paddingRight: 16,
        paddingVertical: 16,
      }}
    />
  );
};

export default ContestSlide;
