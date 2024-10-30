import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import React from 'react'

type Props = {
    item: {
        image: any,
        description: string,
    };
    index: number;
    scrollX: Animated.SharedValue<number>
}

const { width } = Dimensions.get('screen');


const SliderItem = ({ item, index, scrollX }: Props) => {
    const rnAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [-width * 0.125, 0, width * 0.125],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.85, 1, 0.85],
                        Extrapolation.CLAMP
                    ),
                }
            ],
        };
    });

    return (
        <TouchableOpacity>
            <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
                <Image source={item.image} className="w-full h-full rounded-[30px]" resizeMode="cover" />
                {/* <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.backgroundOverlay} /> */}
                <View className="absolute w-[100%] bottom-5 left-2 px-10">
                    <Text className="text-[#FFFFFF] text-lg font-bold">{item.description}</Text>
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
        // top: 76,
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    backgroundOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        bottom: 0,
        borderRadius: 30,
    }
})