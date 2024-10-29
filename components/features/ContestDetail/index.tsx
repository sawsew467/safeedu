import { Image, FlatList, SafeAreaView, ScrollView, View, StyleSheet, Animated, Platform, TouchableWithoutFeedback, TouchableOpacity, Text, TouchableHighlight } from "react-native";
import GlobalStyles from '@/components/ui/SafeViewAndroid';
import bg_1 from "@/assets/images/contest/bg_1.png"
import React from "react";
import ContestComponent from "@/components/features/Contest/ContestComponent";
import location from "@/assets/icons/location.png"
import { ContentType, DataType } from "../Contest";
import { DATA } from "@/healper/data/contest";
import chevron_left from "@/assets/icons/chevron_left.png"
import { router, useLocalSearchParams, usePathname } from "expo-router";
import book from "@/assets/icons/book.png";
import chrven_bottom from "@/assets/icons/chevron_bottom.png"
import chrven_top from "@/assets/icons/chevron_top.png"
import chrven_right from "@/assets/icons/chevron_right.png"

type ItemProps = {
    title: string;
    index: number;
};

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
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    readMoreText: {
        fontSize: 16,
        fontWeight: '500',
        color: "#00000075",
        marginTop: 5,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        width: "100%",
        height: 56,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.08, // tương đương với #00000014 (8% opacity)
        shadowRadius: 12,
        elevation: 4, // Dùng cho Android để có hiệu ứng shadow
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    animatedHeader: {
        height: 80,
        width: "100%",
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        position: 'absolute',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 0,
        top: 0, // -150 -> 0
        left: 0,
        right: 0,
        opacity: 1,
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
                    height: 3,
                },
            },
        }),
    },
});



const ListItem = ({ title, index }: ItemProps) => (
    <TouchableHighlight style={{ paddingHorizontal: 16 }}>
        <View style={styles.item}>
            <Text style={styles.itemText}>{`${index + 1}. ${title}`}</Text>
            <Image source={chrven_right} className="size-6" />
        </View>
    </TouchableHighlight>
);

function Contest() {
    const { contestID } = useLocalSearchParams();
    const [isExpanded, setIsExpanded] = React.useState(false);

    const detailContest = React.useMemo(() => {
        return DATA.find((item: DataType) => {
            return (item.content.some((content: ContentType) => content?.id === contestID))
        }).content.find((content) => content.id === contestID)
    }, [contestID])

    const scrollY = new Animated.Value(0)
    const stickyOpacity = scrollY.interpolate({
        outputRange: [0, 1],
        inputRange: [0, 160],
        extrapolate: 'clamp'
    })
    const stickyTop = scrollY.interpolate({
        outputRange: [-60, 0],
        inputRange: [0, 160],
        extrapolate: 'clamp'
    })
    const stickyTopViewContent = scrollY.interpolate({
        outputRange: [-80, -180],
        inputRange: [0, 160],
        extrapolate: 'clamp'
    })

    const handleClickBtn = () => {
        router.back();
    }

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <SafeAreaView style={GlobalStyles.AndroidSafeArea} className="pt-0  relative">
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
                <View className="overflow-hidden rounded-[0_0_0_24px] h-16 absolute top-0 left-0 right-0 z-10">
                    <TouchableWithoutFeedback onPress={handleClickBtn}>
                        <View className="bg-white h-16 w-full flex flex-row items-center justify-start">
                            <View className="size-7 p-2 flex flex-row items-end justify-end">
                                <Image source={chevron_left} style={{ width: 28, height: 28 }} />
                            </View>
                            <Text className="font-medium text-xl w-full">Cuộc thi</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View className="h-[400px]">
                    <View className="w-full h-full absolute inset-0 bg-black/30 z-[2]"></View>
                    <Image source={detailContest?.image} resizeMode="cover" className="flex h-full justify-center bg-black absolute right-0 left-0 w-full" />
                    <View className="mt-24 flex flex-col justify-center px-4 z-[3]">
                        <Text className="text-3xl font-bold text-white mt-5">{detailContest?.desc}</Text>
                        <View className="flex flex-row items-center h-7 mt-5">
                            <Image source={location} className="size-7" />
                            <Text className="text-lg  font-medium text-white w-full">{detailContest?.address}</Text>
                        </View>
                    </View>
                </View>
                <Animated.View className="h-full rounded-[24px_24px_0_0] relative z-[5]"
                    style={[{
                        top: stickyTopViewContent
                    }]}>

                    <FlatList className="pt-4 bg-white rounded-[24px_24px_0_0]" data={detailContest.parts}
                        renderItem={({ item, index }: { item: string, index: number }) => <ListItem title={item} index={index} />}
                        keyExtractor={(item: string) => item}
                        ListHeaderComponent={() => (
                            <View className="px-4">
                                <View className="rounded-[24px_24px_0_0] mb-5 flex flex-row gap-3">
                                    <Image source={book} className="w-6 h-7" />
                                    <Text className="text-xl font-medium">Thể lệ cuộc thi</Text>
                                </View>
                                <View>
                                    <Text className="font-normal text-base word-beak indent-8" numberOfLines={isExpanded ? undefined : 3}>
                                        {"    "}Cuộc thi về phòng chống ma túy tại Đà Nẵng có những hoạt động đáng chú ý nhằm nâng cao nhận thức trong cộng đồng, đặc biệt là học sinh. Một trong những cuộc thi tiêu biểu là Cuộc thi sáng tác phim ngắn về phòng, chống tệ nạn ma túy trong học đường. Cuộc thi này thu hút sự tham gia nhiệt tình của các trường học trên địa bàn Đà Nẵng, khuyến khích học sinh sử dụng phim ngắn để truyền tải thông điệp mạnh mẽ về tác hại của ma túy. Các phim dự thi được đánh giá cao về chất lượng nội dung và kỹ thuật sản xuất.
                                    </Text>
                                    <TouchableOpacity onPress={toggleExpanded} className="mt-2">
                                        <View className="flex flex-row items-center  justify-center gap-2">
                                            <Text style={styles.readMoreText}>
                                                {isExpanded ? 'Lược bớt' : 'Xem thêm'}
                                            </Text>
                                            <Image source={isExpanded ? chrven_top : chrven_bottom} className="size-2" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>)}
                        contentContainerStyle={{ gap: 20, paddingVertical: 16, overflow: "hidden" }}
                    />
                </Animated.View>
            </ScrollView>
            <Animated.View style={[styles.animatedHeader, {
                top: stickyTop,
                opacity: stickyOpacity
            }]}
            >
                <TouchableWithoutFeedback onPress={handleClickBtn}>
                    <View className="overflow-hidden rounded-[0_0_0_24px]">
                        <View className="bg-white h-16 flex flex-row items-center justify-start">
                            <View className="size-7 p-2 flex flex-row items-end justify-end ">
                                <Image source={chevron_left} style={{ width: 28, height: 28 }} />
                            </View>
                            <Text className="font-medium text-xl w-full">Cuộc thi</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </SafeAreaView >
    );
}





export default Contest;
