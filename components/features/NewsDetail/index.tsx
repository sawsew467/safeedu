import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { DATA } from '@/healper/data/news';
import newsID from '@/app/news/[newsID]';
import SafeViewAndroid from '@/components/ui/SafeViewAndroid';
import HeaderShown from '@/components/ui/HeaderShown';
import { DataType } from '@/healper/type/news-type';
import GameResult from '@/components/features/GameTestTheoryModule/GameResult';


const NewsDetail = () => {
    const { newsID } = useLocalSearchParams();

    const detailNews = React.useMemo(() => {
        return DATA.find((item: DataType) => item?.id === newsID);
    }, [newsID]);

    return (
        <HeaderShown title='Thông Tin Chi Tiết'
            HeaderComponent={() =>
                <View style={styles.backgroundContainer}>
                    <Image style={styles.background} source={require("@/assets/images/news_image/newsDetail_background.jpg")} />
                </View>
            }>

            <View style={styles.newsContainer}>
                <View style={styles.whiteBoard}>
                    <View style={styles.newsDetailContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{detailNews?.title}</Text>
                        </View>
                        <Text style={styles.newsDate}>{detailNews?.date}</Text>
                        <Text style={styles.content}>{detailNews?.content}</Text>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={detailNews?.image} />
                        </View>
                        <Text style={styles.caption}>{detailNews?.caption}</Text>
                        <Text style={styles.content}>{detailNews?.content}</Text>
                    </View>
                </View>
            </View>

        </HeaderShown>
    )
}

export default NewsDetail

const styles = StyleSheet.create({
    safeArea: {
        width: "100%",
        height: "100%",
        position: "relative",
    },
    backgroundContainer: {
        width: "100%",
        height: "30%",
        position: "absolute",
        zIndex: 0,
    },
    background: {
        width: "100%",
        height: "100%",
    },
    newsContainer: {
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 2,
        paddingTop: 60,
        paddingBottom: 12,
        paddingHorizontal: 15,
    },
    whiteBoard: {
        width: "100%",
        height: "100%",
        paddingTop: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingBottom: 100,
    },
    newsDetailContainer: {
        width: "100%",
        paddingHorizontal: 15,
    },
    titleContainer: {

    },
    title: {
        fontWeight: "700",
        fontSize: 29,
        lineHeight: 38,
    },
    newsDate: {
        fontWeight: "700",
        fontSize: 12,
        lineHeight: 19.2,
        color: "#75A815",
        paddingVertical: 15,
    },
    content: {
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 25.6,
        color: "#000000",
        paddingBottom: 15,
    },
    imageContainer: {
        width: "100%",
        height: 230,
        resizeMode: "cover",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    caption: {
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 22.4,
        color: "#8C8C8A",
        paddingVertical: 15,
        alignSelf: "center",
    }
})