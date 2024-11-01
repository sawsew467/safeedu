import { Image, FlatList, SafeAreaView, ScrollView, Text, View, StyleSheet, Animated, Platform, Dimensions, StatusBar, } from "react-native";
import GlobalStyles from '@/components/ui/SafeViewAndroid';
import bg_1 from "@/assets/images/contest/bg_1.png"
import SearchInput from "@/components/ui/SearchInput";
import React from "react";
import ContestComponent from "./ContestComponent";
import { DATA } from "@/healper/data/contest";
const styles = StyleSheet.create({
  scrollViewContent: {
    marginTop: 20,
    paddingBottom: 20,
  },
  animatedView: {
    height: 48,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 1,
  },
  animatedHeader: {
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: -150, // -150 -> 0
    left: 0,
    right: 0,
    opacity: 1,
    zIndex: 10,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 16,
        shadowOffset: {
          width: 4,
          height: 4,
        },
      },
    }),
  },
});

export type DataType = {
  id: string,
  title: string,
  content: ContentType[]
};
export type ContentType = {
  id: string
  image: any,
  address: string,
  desc: string,
  joiner: number
  parts: { title: string, slug: string }[]
}
const windowDimensions = Dimensions.get('window');

function Contest() {


  const scrollY = new Animated.Value(0)
  const [value, setValue] = React.useState("");
  const stickyOpacity = scrollY.interpolate({
    outputRange: [0, 1],
    inputRange: [0, 160],
    extrapolate: 'clamp'
  })
  const stickyTop = scrollY.interpolate({
    outputRange: [-200, 0],
    inputRange: [0, 160],
    extrapolate: 'clamp'
  })
  const stickyTopViewContent = scrollY.interpolate({
    outputRange: [-50, -100],
    inputRange: [0, 160],
    extrapolate: 'clamp'
  })
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea} className="bg-white">
      <ScrollView
        overScrollMode="never"
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false
        })}
        className="relative"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View className=" h-[400px] left-0 right-0">
          <Image source={bg_1} resizeMode="cover" className="flex h-[400px] justify-center absolute right-0 left-0 w-full" />
          <View className="mt-16 flex flex-col justify-center px-4 ">
            <SearchInput setValue={setValue} value={value} />
            <Text className="text-3xl font-bold text-white mt-10">Tham gia các cuộc thi về phòng chống ma tuý</Text>
            <Text className="text-lg font-medium text-white mt-5">Nâng cao nhận thức của học sinh, sinh viên về tác hại của ma tuý</Text>
          </View>
        </View>
        <Animated.View className="h-full overflow-hidden rounded-[24px_24px_0_0] relative"
          style={[{
            top: stickyTopViewContent
          }]}>
          <FlatList
            scrollEnabled={false}
            className="pt-4 px-4 bg-white rounded-[24px_24px_0_0]"
            data={DATA}
            renderItem={({ item }: { item: DataType }) => <ContestComponent data={item} />}
            keyExtractor={(item: DataType) => item.id}
            contentContainerStyle={{ gap: 32, paddingVertical: 16, overflow: "visible" }}
          />
        </Animated.View>
      </ScrollView>
      <Animated.View style={[styles.animatedHeader, {
        top: stickyTop,
        opacity: stickyOpacity
      }]}

      >
        <View className="p-4 pb-2 flex items-end justify-end h-full w-full bg-white">
          <SearchInput setValue={setValue} value={value} />
        </View>
      </Animated.View>
    </SafeAreaView >
  );
}



export default Contest;

