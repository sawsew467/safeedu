import React from 'react'
import { View, Image, Text, FlatList } from 'react-native'
import fire from "@/assets/icons/fire.png";
import { ContentType, DataType } from '.';
import ContestSlide from './ContestSlide';

const ContestComponent = ({ data }: { data: DataType }) => {
    return (
        <View className="">
            <View className="rounded-[24px_24px_0_0] mb-5 flex flex-row gap-3">
                <Image source={fire} className="w-6 h-7" />
                <Text className="text-xl font-medium">{data?.title}</Text>
            </View>
            <ContestSlide item={data?.content} />
        </View>
    )
}

export default ContestComponent