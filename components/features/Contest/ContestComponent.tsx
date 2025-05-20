import React from "react";
import { View, Image, Text, FlatList } from "react-native";
import fire from "@/assets/icons/fire.png";
import { ContentType, DataType } from ".";
import ContestSlide from "./ContestSlide";
import { skeletonCommonProps } from "@/healper/type/type-common-skeleton";
import { Skeleton } from "moti/skeleton";

const ContestComponent = ({
  data = {},
  isFetching,
}: {
  data: DataType;
  isFetching: boolean;
}) => {
  return (
    data?.competitions?.length !== 0 && (
      <View>
        <View className="rounded-[24px_24px_0_0] mb-5 flex flex-row items-center gap-3">
          <Image source={fire} className="w-6 h-7" />
          <Text className="ml-3 text-xl font-pmedium">{data?.title}</Text>
        </View>
        <ContestSlide item={data?.competitions} isFetching={isFetching} />
      </View>
    )
  );
};

export default ContestComponent;
