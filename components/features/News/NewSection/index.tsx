import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList, StyleProp, ImageStyle } from "react-native";

import { Slider } from "@/components/features/News/NewSection/Slider/Slider";
import { DataType } from "@/components/features/News";
import { DATA } from "@/healper/data/news";

import logo from "@/assets/images/news_image/news_logo.png";
import { router } from "expo-router";

export function NewSection({ data }: { data: DataType[] }) {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.newsText}>Tin mới</Text>
            <View style={styles.logoContainer}>
                <Image
                    source={logo}
                    style={styles.logoImage as StyleProp<ImageStyle>}
                    resizeMode="cover"
                />
            </View>
            <Slider data={DATA} />
            <View>
                <Text style={styles.suggestionText}>Gợi ý</Text>
                <FlatList
                    overScrollMode="never"
                    contentContainerStyle={styles.flatListContainer}
                    scrollEnabled={false}
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => {
                            router.push(`/news/${item?.id}`)
                        }}>
                            <View style={styles.listItem}>
                                <Image source={item.image} style={styles.listImage as StyleProp<ImageStyle>} resizeMode="cover" />
                                <View style={styles.listTextContainer}>
                                    <Text style={styles.listTitle}>{item?.title}</Text>
                                    <Text style={styles.listDate}>{item?.date}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 32,
    },
    newsText: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 20,
        position: 'absolute',
        top: 12,
        padding: 8,
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        top: 36,
        left: '50%',
        transform: [{ translateX: -104 }, { translateY: -70 }],
    },
    logoImage: {
        width: 208,
        height: 140,
    },
    suggestionText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    flatListContainer: {
        marginTop: 20,
        gap: 8,
    },
    listItem: {
        flexDirection: 'row',
        gap: 12,
    },
    listImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    listTextContainer: {
        flex: 1,
        marginTop: 16,
    },
    listTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    listDate: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#8F9F96',
    },
});
