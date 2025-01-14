import React from "react";
import { StyleSheet, View } from "react-native";

import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import SliderItem from "@/components/features/News/NewSection/Slider/SliderItem";

import { DataType } from "@/components/features/News";

export function Slider({ data }: { data: DataType[] }) {
    const scrollX = useSharedValue(0);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    });

    return (
        <View style={styles.sliderContainer}>
            <Animated.FlatList
                overScrollMode="never"
                contentContainerStyle={{ gap: 8 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                data={data}
                onScroll={onScrollHandler}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => <SliderItem item={item} index={index} scrollX={scrollX} />}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    sliderContainer: {
        height: 218,
        marginTop: 76,
    }
})

