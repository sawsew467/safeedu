import React, { useRef, ReactNode, useCallback } from "react";
import {
    View,
    Animated,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    Dimensions
} from "react-native";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import chevron_left_black from "@/assets/icons/chevron_left_black.png"
type AnimatedHeaderScreenProps = {
    children: ReactNode;
    title?: string;
    rightIcon?: {
        image: any;
        onPress: () => void;
    };
};

const colors = {
    background: "#fff",
    backgroundScrolled: "#6d6d6d4d",
    headerBorder: "#fff",
    borderColor: "#fff",
    text: "#000",
    tint: "#4A90E2",
};

const windowDimensions = Dimensions.get('window');

export default function AnimatedHeaderScreen({
    title,
    children,
    rightIcon,
}: AnimatedHeaderScreenProps) {
    const scrollY = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();

    const handleClickLeft = () => {
        router.back()
    }

    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [0, 1000],
        outputRange: [colors.background, colors.backgroundScrolled],
        extrapolate: "clamp",
    });
    // const opacity = scrollY.interpolate({
    //     inputRange: [0, 50],
    //     outputRange: [1, 0.3],
    //     extrapolate: "clamp",
    // });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    const headerBorderWidth = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, StyleSheet.hairlineWidth],
        extrapolate: "clamp",
    });

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontWeight: "500"
                    },
                    headerTitle: title,
                    headerLeft: () => (
                        <Animated.View
                            style={{
                                opacity: 1,
                                marginLeft: 0,
                            }}
                        >
                            <TouchableOpacity onPress={handleClickLeft} style={styles.btnIconLeft}>
                                <Image source={chevron_left_black} style={styles.leftIcon}></Image>
                            </TouchableOpacity>
                        </Animated.View>
                    ),
                    headerRight: rightIcon
                        ? () => (
                            <Animated.View
                                style={{
                                    opacity: 1,
                                    marginRight: 0,
                                }}
                            >
                                <TouchableOpacity style={styles.btnIconRight} onPress={rightIcon?.onPress}>
                                    <Image source={rightIcon?.image} style={styles.leftIcon} />
                                </TouchableOpacity>
                            </Animated.View>
                        )
                        : undefined,
                    headerBackground: () => (
                        <Animated.View
                            style={[
                                StyleSheet.absoluteFill,
                                styles.headerBackground,
                                {
                                    backgroundColor: headerBackgroundColor,
                                    // opacity: opacity,
                                    borderBottomColor: colors.borderColor,
                                    borderBottomWidth: headerBorderWidth,
                                },
                            ]}
                        />
                    ),
                }}


            />
            <SafeAreaView style={headerSafeArea.AndroidSafeArea}>
                <ScrollView
                    overScrollMode="never"
                    bounces={false}
                    style={styles.scrollView}
                    contentContainerStyle={[
                        styles.scrollViewContent,
                        { paddingBottom: insets.bottom },
                    ]}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <View style={styles.content}>{children}</View>
                </ScrollView>
            </SafeAreaView>

        </>
    );
}

const headerSafeArea = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight - (windowDimensions.width * 0.15) : 0
    }
});

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    btnIconLeft: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: 54,
        height: 54,
        borderRadius: 999
    },
    btnIconRight: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 54,
        height: 54,
        borderRadius: 999
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
    },
    headerBackground: {
        borderBottomWidth: 0,
    },
    leftIcon: {
        width: 24,
        height: 24
    },
    rightIcon: {
        marginRight: 16,
    },
});