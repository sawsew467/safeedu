import { DataType } from '@/healper/type/news-type';
import { router } from 'expo-router';
import React from 'react'
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type SliderItemProps = {
    item: DataType;
    index: number;
    scrollX: Animated.SharedValue<number>
}

const { width } = Dimensions.get('screen');


const SliderItem = ({ item, index, scrollX }: SliderItemProps) => {
    const rnAnimatedStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.125, 0, width * 0.125],
            Extrapolation.CLAMP
        );

        const scale = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.85, 1, 0.85],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateX },
                { scale },
            ],
        } as ViewStyle;
    });

    return (
        <TouchableOpacity onPress={() => {
            router.push(`/news/${item?.id}`);
        }}>
            <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
                <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
                <View style={styles.overlay} />
                <View style={styles.titleContainerOverlay}>
                    <Text style={styles.titleOverlay}>{item.title}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}

export default SliderItem

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: width - 32,
        height: 178,
        paddingHorizontal: 16,
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        bottom: 0,
        borderRadius: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    backgroundOverlay: {
        position: 'absolute',
        width: '100%',
        height: '40%',
        bottom: 0,
        borderRadius: 30,
    },
    titleContainerOverlay: {
        position: "absolute",
        width: "100%",
        bottom: 20,
        left: 8,
        paddingHorizontal: 40,
    },
    titleOverlay: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 28,
    }
})