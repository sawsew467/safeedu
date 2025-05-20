import React, { useRef, ReactNode, forwardRef } from "react";
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
  Dimensions,
  ScrollViewProps,
  ScrollViewComponent,
} from "react-native";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { FooterComponent } from "react-native-screens/lib/typescript/components/ScreenFooter";
import { boolean, any } from "zod";
interface AnimatedHeaderScreenProps extends ScrollViewProps {
  children: ReactNode;
  title?:
    | string
    | ((props: { children: string; tintColor?: string }) => React.ReactNode);
  isScroll?: boolean;
  isBack?: boolean;
  rightIcon?: {
    icon: any;
    onPress: () => void;
  };
  headerLeft?: () => ReactNode;
  HeaderComponent?: () => ReactNode;
  FooterComponent?: () => ReactNode;
  ref: React.MutableRefObject<ScrollView | null>;
}

const colors = {
  background: "#fff",
  backgroundScrolled: "#6d6d6d4d",
  headerBorder: "#fff",
  borderColor: "#fff",
  text: "#000",
  tint: "#4A90E2",
};

const AnimatedHeaderScreen = forwardRef<ScrollView, AnimatedHeaderScreenProps>(
  (
    {
      title,
      children,
      rightIcon,
      HeaderComponent,
      FooterComponent,
      isScroll = true,
      isBack = true,
      headerLeft,
      ...props
    },
    ref
  ) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();

    const handleClickLeft = () => {
      router.replace("..");
    };

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
              fontWeight: "500",
            },
            headerTitle: title,
            headerLeft: isBack
              ? () => (
                  <Animated.View
                    style={{
                      opacity: 1,
                      marginLeft: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={handleClickLeft}
                      style={styles.btnIconLeft}
                    >
                      <Entypo name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>
                  </Animated.View>
                )
              : null,
            headerRight: rightIcon
              ? () => (
                  <Animated.View
                    style={{
                      opacity: 1,
                      marginRight: 10,
                    }}
                  >
                    <TouchableOpacity
                      style={styles.btnIconRight}
                      onPress={rightIcon?.onPress}
                    >
                      <rightIcon.icon />
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
          {HeaderComponent && <HeaderComponent />}
          {isScroll ? (
            <ScrollView
              ref={ref}
              {...props}
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
          ) : (
            <View style={styles.content}>{children}</View>
          )}
          {FooterComponent && <FooterComponent />}
        </SafeAreaView>
      </>
    );
  }
);

const headerSafeArea = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: 0,
  },
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
    borderRadius: 999,
  },
  btnIconRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    borderRadius: 999,
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
  rightIcon: {
    height: "100%",
  },
});

export default AnimatedHeaderScreen;
