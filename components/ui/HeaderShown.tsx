import React, { useRef, ReactNode, forwardRef } from "react";
import {
  View,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ScrollViewProps,
  StatusBar,
  Text,
  SafeAreaView,
  Platform,
  RefreshControl,
  Dimensions,
} from "react-native";
import { router, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
interface AnimatedHeaderScreenProps extends ScrollViewProps {
  children: ReactNode;
  title?:
    | string
    | ((props?: { children?: string; tintColor?: string }) => React.ReactNode);
  isScroll?: boolean;
  isBack?: boolean;
  rightIcon?: {
    icon: any;
    onPress: () => void;
  };
  headerLeft?: () => ReactNode;
  shouldHaveHeader?: boolean;
  HeaderComponent?: () => ReactNode;
  FooterComponent?: () => ReactNode;
  backgroundImage?: () => ReactNode;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  ref: React.MutableRefObject<ScrollView | null>;
}

const colors = {
  background: "#fff",
  backgroundScrolled: "#6d6d6d5b",
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
      shouldHaveHeader = true,
      headerLeft,
      backgroundImage,
      isRefreshing = false,
      onRefresh = () => {},
      ...props
    },
    ref
  ) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();
    const [isOverTop, setIsOverTop] = React.useState(false);
    const statusBarHeight =
      Platform.OS === "android"
        ? StatusBar.currentHeight ?? insets.top
        : insets.top;
    const headerHeight = 56;

    const handleClickLeft = () => {
      router.replace("..");
    };

    // const opacity = scrollY.interpolate({
    //     inputRange: [0, 50],
    //     outputRange: [1, 0.3],
    //     extrapolate: "clamp",
    // });

    const handleScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    );

    const handleOverScroll = (event) => {
      const { contentOffset } = event.nativeEvent;

      const isAtTop = contentOffset.y <= -10;

      if (isAtTop) {
        setIsOverTop(true);
      } else {
        setIsOverTop(false);
      }
    };

    return (
      <>
        <SafeAreaView className="flex-1 relative h-full">
          {backgroundImage && (
            <View className="absolute top-0 bottom-0 left-0 right-0 z-0">
              {backgroundImage()}
            </View>
          )}
          <LinearGradient
            colors={["#000000a5", "#00000000"]}
            style={{
              paddingTop: 40,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="absolute top-0 left-0 right-0 z-50"
          />
          <Stack.Screen options={{ headerShown: false }} />
          <View
            className="flex flex-1 absolute top-0 left-0 right-0 bottom-0 "
            style={{
              flex: Platform.OS === "android" && 1,
            }}
          >
            <StatusBar barStyle="light-content" backgroundColor="transparent" />
            {shouldHaveHeader && (
              <View
                style={[
                  styles.container,
                  {
                    paddingTop:
                      Platform.OS === "android" ? statusBarHeight : insets.top,
                  },
                ]}
              >
                <View />
                <View style={[styles.headerContent, { height: headerHeight }]}>
                  {isBack && (
                    <View style={styles.leftContainer}>
                      {!headerLeft ? (
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
                            <Entypo
                              name="chevron-left"
                              size={24}
                              color="black"
                            />
                          </TouchableOpacity>
                        </Animated.View>
                      ) : (
                        headerLeft()
                      )}
                    </View>
                  )}

                  <View style={styles.centerContainer}>
                    <Text style={styles.headerTitle}>
                      {typeof title === "string" ? title : title ? title() : ""}
                    </Text>
                  </View>

                  <View style={styles.rightContainer}>
                    {rightIcon && (
                      <Animated.View
                        style={{
                          opacity: 1,
                          marginRight: 10,
                        }}
                      >
                        <TouchableOpacity
                          style={styles.btnIconRight}
                          onPress={rightIcon.onPress}
                        >
                          <rightIcon.icon />
                        </TouchableOpacity>
                      </Animated.View>
                    )}
                  </View>
                </View>
              </View>
            )}
            <View className="relative h-full flex-1">
              {HeaderComponent && <HeaderComponent />}
              {(isOverTop || isRefreshing) && (
                <View
                  style={{
                    position: "absolute",
                    width: Dimensions.get("window").width,
                    height: 60,
                    top:
                      Platform.OS === "android" ? statusBarHeight : insets.top,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Progress.CircleSnail
                    color={["#fff"]}
                    duration={700}
                    progress={0.5}
                  />
                </View>
              )}
              {isScroll ? (
                <ScrollView
                  ref={ref}
                  {...props}
                  refreshControl={
                    <RefreshControl
                      tintColor={"transparent"}
                      colors={["transparent"]}
                      style={{ backgroundColor: "transparent" }}
                      refreshing={isRefreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  style={[styles.scrollView]}
                  contentContainerStyle={[styles.scrollViewContent]}
                  onScroll={(event) => {
                    handleScroll(event);
                    handleOverScroll(event);
                  }}
                  scrollEventThrottle={16}
                >
                  <View style={styles.content}>{children}</View>
                </ScrollView>
              ) : (
                <View style={styles.content}>{children}</View>
              )}
              {FooterComponent && <FooterComponent />}
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
);

const styles = StyleSheet.create({
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1001,
  },
  container: {
    position: "relative",
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 0,
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    height: "100%",
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
    height: "100%",
  },
  headerBackground: {
    borderBottomWidth: 0,
    height: "100%",
    flex: 1,
  },
  rightIcon: {
    height: "100%",
  },
});

export default AnimatedHeaderScreen;
