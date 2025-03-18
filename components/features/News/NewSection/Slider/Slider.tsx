import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";

import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { TypeNews } from "@/healper/type/news.type";
import Panigation from "./Panigation";
import { Skeleton } from "moti/skeleton";
import SliderItem from "@/components/features/News/NewSection/Slider/SliderItem";
import { skeletonCommonProps } from "@/healper/type/type-common-skeleton";
const { width } = Dimensions.get("screen");

export function Slider({
  isFetching,
  data,
}: {
  isFetching: boolean;
  data: TypeNews[];
}) {
  const flatListRef = useRef<View>(null);
  const scrollX = useSharedValue(0);
  const [slides, setSlides] = useState([]);
  const [panigationIndex, setPanigation] = useState(0);
  useEffect(() => {
    setSlides(data);
  }, [data]);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      const width = e.layoutMeasurement.width;
      scrollX.value = e.contentOffset.x % (width * data?.length);
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0]?.index !== undefined &&
      viewableItems[0]?.index !== null
    ) {
      setPanigation(viewableItems[0]?.index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged,
    },
  ]);

  return (
    <View ref={flatListRef} style={styles.sliderContainer}>
      <Animated.FlatList
        overScrollMode="never"
        contentContainerStyle={{ gap: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={isFetching ? [{}] : slides}
        onScroll={onScrollHandler}
        keyExtractor={(item, index) => {
          return `${item._id} + ${index}`;
        }}
        renderItem={({ item, index }) => (
          <Skeleton
            show={isFetching}
            width={width - 32}
            height={178}
            radius={30}
            {...skeletonCommonProps}
          >
            {!isFetching && (
              <SliderItem
                item={item}
                index={index % data?.length}
                scrollX={scrollX}
              />
            )}
          </Skeleton>
        )}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <Panigation
        items={data}
        panigationIndex={panigationIndex}
        scrollX={scrollX}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  sliderContainer: {
    display: "flex",
    marginTop: 83,
  },
});
