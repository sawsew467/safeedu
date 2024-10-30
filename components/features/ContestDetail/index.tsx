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
import contestID from "@/app/contest/[contestID]";

type ItemProps = {
    title: {
        title: string,
        slug: string
    };
    index: number;
    id: string;
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
        fontFamily: "Poppins-SemiBold",
        color: "#00000075",
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
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
        fontFamily: "pbold"
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
    safeAreaView: {
        ...GlobalStyles.AndroidSafeArea,
        paddingTop: 0,
    },
    headerContainer: {
        overflow: 'hidden',
        borderBottomLeftRadius: 24,
        height: 64,
        position: 'absolute',
        top: 35,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'white',

    },
    headerContent: {
        display: "flex",
        marginLeft: 10,
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignContent: "center"
    },
    backButtonContainer: {
        width: 28,
        height: 28,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    headerTitle: {
        fontWeight: '500',
        fontSize: 20,
        width: '100%',
    },
    imageContainer: {
        height: 400,
    },
    imageDarkOverlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 2,
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        backgroundColor: 'black',
        position: 'absolute',
        right: 0,
        left: 0,
    },
    contentContainer: {
        marginTop: 96,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 16,
        zIndex: 3,
    },
    contentTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 28,
        marginTop: 20,
    },
    locationIcon: {
        width: 28,
        height: 28,
    },
    locationText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        width: '100%',
    },
    flatListContainer: {
        paddingTop: 16,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    flatListHeaderContainer: {
        paddingHorizontal: 16,
    },
    flatListHeaderContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginBottom: 20,
        flexDirection: 'row',
        gap: 12,
    },
    bookIcon: {
        width: 24,
        height: 28,
    },
    flatListHeaderTitle: {
        fontSize: 20,
        fontWeight: '500',
    },
    expandButtonContainer: {
        marginTop: 8,
    },
    expandButtonContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: "100%",
    },
    expandButtonIcon: {
        width: 8,
        height: 8,
    },
});

const ListItem = ({ title, index, id }: ItemProps) => {
    const handleClickBtn = () => {
        router.push(`contest/${id}/drawPicture`)
    }
    return (
        <TouchableOpacity style={{ paddingHorizontal: 16 }} onPress={handleClickBtn}>
            <View style={styles.item}>
                <Text style={styles.itemText}>{`${index + 1}. ${title?.title}`}</Text>
                <Image source={chrven_right} style={{ width: 24, height: 24 }} />
            </View>
        </TouchableOpacity>
    )
};

function Contest() {
    const { contestID }: { contestID: string } = useLocalSearchParams();
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
        outputRange: [-60, 20],
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
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView
                overScrollMode="never"
                bounces={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: false
                })}
                style={{ position: 'relative' }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                <View style={styles.headerContainer}>
                    <TouchableWithoutFeedback onPress={handleClickBtn}>
                        <View style={styles.headerContent}>
                            <View style={styles.backButtonContainer}>
                                <Image source={chevron_left} style={{ width: 28, height: 28 }} />
                            </View>
                            <Text style={styles.headerTitle}>Cuộc thi</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.imageContainer}>
                    <View style={styles.imageDarkOverlay}></View>
                    <Image source={detailContest?.image} resizeMode="cover" style={styles.backgroundImage} />
                    <View style={styles.contentContainer}>
                        <Text style={styles.contentTitle}>{detailContest?.desc}</Text>
                        <View style={styles.locationContainer}>
                            <Image source={location} style={styles.locationIcon} />
                            <Text style={styles.locationText}>{detailContest?.address}</Text>
                        </View>
                    </View>
                </View>
                <Animated.View style={[{
                    height: '100%',
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    position: 'relative',
                    zIndex: 5,
                }, {
                    top: stickyTopViewContent
                }]}>
                    <FlatList
                        scrollEnabled={false}
                        style={styles.flatListContainer}
                        data={detailContest.parts}
                        renderItem={({ item, index }: { item: { title: string, slug: string }, index: number }) => <ListItem title={item} index={index} id={contestID} />}
                        keyExtractor={(item: { title: string, slug: string }) => item.slug}
                        ListHeaderComponent={() => (
                            <View style={styles.flatListHeaderContainer}>
                                <View style={styles.flatListHeaderContent}>
                                    <Image source={book} style={styles.bookIcon} />
                                    <Text style={styles.flatListHeaderTitle}>Thể lệ cuộc thi</Text>
                                </View>
                                <View>
                                    <Text style={styles.text} numberOfLines={isExpanded ? undefined : 3}>
                                        {"    "}Cuộc thi về phòng chống ma túy tại Đà Nẵng có những hoạt động đáng chú ý nhằm nâng cao nhận thức trong cộng đồng, đặc biệt là học sinh. Một trong những cuộc thi tiêu biểu là Cuộc thi sáng tác phim ngắn về phòng, chống tệ nạn ma túy trong học đường. Cuộc thi này thu hút sự tham gia nhiệt tình của các trường học trên địa bàn Đà Nẵng, khuyến khích học sinh sử dụng phim ngắn để truyền tải thông điệp mạnh mẽ về tác hại của ma túy. Các phim dự thi được đánh giá cao về chất lượng nội dung và kỹ thuật sản xuất.
                                    </Text>
                                    <TouchableOpacity onPress={toggleExpanded} style={styles.expandButtonContainer}>
                                        <View style={styles.expandButtonContent}>
                                            <Text style={styles.readMoreText}>
                                                {isExpanded ? 'Lược bớt' : 'Xem thêm'}
                                            </Text>
                                            <View style={styles.expandButtonIcon} >
                                                <Image source={isExpanded ? chrven_top : chrven_bottom} />
                                            </View>
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
                    <View style={{ overflow: 'hidden', borderBottomLeftRadius: 24 }}>
                        <View style={styles.headerContent}>
                            <View style={styles.backButtonContainer}>
                                <Image source={chevron_left} style={{ width: 28, height: 28 }} />
                            </View>
                            <Text style={styles.headerTitle}>Cuộc thi</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </SafeAreaView >
    );
}

export default Contest;