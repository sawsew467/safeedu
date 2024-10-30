import { Image, StyleSheet, Text, View, Button, TouchableOpacity, Alert, FlatList, TouchableWithoutFeedback } from "react-native";

import image from "@/assets/images/news_image/sample_image.png";
import logo from "@/assets/images/news_image/news_logo.png";
import news_image1 from "@/assets/images/news_image/News_image1.png";
import news_image2 from "@/assets/images/news_image/News_image2.png";
import news_image3 from "@/assets/images/news_image/News_image3.png";
import { Slider } from "@/components/features/News/NewSection/Slider/Slider";


export function NewSection() {
    const DATA = [
        {
            id: "1",
            image: news_image1,
            description: "Nguy Cơ Từ Ma Túy Đối Với Gia Đình Và Xã Hội",
            date: "29/10/2023",
        },
        {
            id: "2",
            image: news_image2,
            description: "Hiểu Về Ma Túy: Những Loại Phổ Biến Và Tác Hại Của Chúng",
            date: "29/10/2023",
        },
        {
            id: "3",
            image: news_image3,
            description: "Nhiều thông tin bổ ích tại nhà triển lãm “Tác hại của ma túy”",
            date: "29/10/2023",
        }
    ]
    return (
        <View className="px-3 pt-2 pb-8">
            <Text className="w-full font-bold text-xl absolute top-3 p-2">Tin mới</Text>
            <View className="flex flex-row justify-center items-center absolute z-10 top-9 left-[50%] translate-x-[-104px] translate-y-[-70px]">
                <Image
                    source={logo}
                    className="w-[208px] h-[140px]"
                    resizeMode="cover"
                />
            </View>
            <Slider data={DATA} />
            <View className="">
                <Text className="font-bold text-xl">Gợi ý</Text>
                <FlatList
                    overScrollMode="never"
                    data={DATA}
                    contentContainerStyle={{ marginTop: 20, gap: 8 }}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) =>
                        <TouchableOpacity>
                            <View className="flex flex-row gap-3">
                                <Image source={item.image} className="w-[100px] h-[100px] rounded-lg" resizeMode="cover" />
                                <View className="flex-1 top-4">
                                    <Text className="text-sm font-bold">{item.description}</Text>
                                    <Text className="text-xs font-bold text-[#8F9F96]">{item.date}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        </View >
    )
}