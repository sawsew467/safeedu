import SliderItem from "@/components/features/News/NewSection/Slider/SliderItem";
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';


export function Slider({ data }) {
    const scrollX = useSharedValue(0);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        }
    });

    return (
        <View className="h-[240px] mt-[76px]">
            <Animated.FlatList
                overScrollMode="never"
                data={data}
                contentContainerStyle={{ gap: 8 }}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={onScrollHandler}
                renderItem={({ item, index }) => <SliderItem item={item} index={index} scrollX={scrollX} />}
            />
        </View>
    )
}

