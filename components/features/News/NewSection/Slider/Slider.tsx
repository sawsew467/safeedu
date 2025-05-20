import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  ViewToken,
  useWindowDimensions,
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

export function Slider({
  isFetching,
  data,
}: {
  isFetching: boolean;
  data: TypeNews[];
}) {
  const { width } = useWindowDimensions();

  const flatListRef = useRef<View>(null);
  const scrollX = useSharedValue(0);
  const [slides, setSlides] = useState([]);
  const [panigationIndex, setPanigation] = useState(0);
  useEffect(() => {
    setSlides(data);
  }, [data]);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
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
        snapToInterval={width - 24}
        decelerationRate={0.8}
        data={isFetching ? [{}] : slides}
        onScroll={onScrollHandler}
        keyExtractor={(item, index) => {
          return `${item._id} + ${index}`;
        }}
        renderItem={({ item, index }) => (
          <Skeleton
            show={isFetching}
            width={width - 32}
            height={200}
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
