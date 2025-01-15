import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList, StyleProp, ImageStyle } from "react-native";

import { Slider } from "@/components/features/News/NewSection/Slider/Slider";
import { DATA } from "@/healper/data/news";

import nav_background from "@/assets/images/background_nav_home.png";
import logo from "@/assets/images/news_image/news_logo.png";
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { router } from "expo-router";
import { DataType } from "@/healper/type/news-type";
import { Button } from "@/components/ui/Button";

const buttons = [
    {
        id: 1,
        icon: () => <Ionicons name="extension-puzzle-outline" size={24} color="#75A815" />,
        text: "Trò chơi",
        route: "game",
        bgColor: "bg-white",
    },
    {
        id: 2,
        icon: () => <Feather name="book" size={24} color="#75A815" />,
        text: "Thư viện",
        route: "library",
        bgColor: "bg-white",
    },
];

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
            <View className="flex-1 items-center justify-center mt-4">
                <Image source={nav_background} resizeMode="contain" className="w-[110%] absolute" />
                <View className="flex flex-row justify-center items-center">
                    {buttons.map((button) => (
                        <Button onPress={() => { router.push(button.route) }}
                            key={button.id}
                            className={`flex-1 h-[120%] mx-1.5 ${button.bgColor} rounded-2xl`}
                        >
                            <View className="flex flex-col justify-center items-center">
                                {button.icon()}
                                <Text className="text-[#75A815]">{button.text}</Text>
                            </View>
                        </Button>
                    ))}
                </View>
            </View>
            <View className="mt-10">
                <View className="flex flex-row items-center mb-3">
                    <Text style={styles.suggestionText}>Tin mới</Text>
                    <View className="w-7 h-8 ml-2">
                        <Image
                            className="w-full h-full"
                            source={require("assets/icons/emoji_fire_.png")}
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View className="bg-white pt-3">
                    <View className="flex flex-row justify-between">
                        <TouchableOpacity className="items-center">
                            <Text className="text-[#75A815] font-semibold text-base">Bạo lực học đường</Text>
                            <View className="w-[105%] h-[2px] bg-[#75A815] mt-[6px]" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className="text-black font-semibold text-base">Phân biệt giới tính</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className="text-black font-semibold text-base">Ma tuý</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        overScrollMode='never'
                        bounces={false}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => {
                                router.push(`/news/${item?.id}`)
                            }}>
                                <View className="w-[150px] h-[200px] border border-[#75A81557] rounded-2xl p-2 m-1">
                                    <Image source={item.image} className="w-full h-[100px] rounded-lg" resizeMode="cover" />
                                    <View className="mt-2">
                                        <Text className="text-black font-semibold text-sm">{item?.title}</Text>
                                        <Text className="text-gray-400 text-xs mt-1">{item?.date}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
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
