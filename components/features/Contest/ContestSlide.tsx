import React from 'react'
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { ContentType } from '.'
import { router } from 'expo-router'

const style = StyleSheet.create({
    shadow: {
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04, // equivalent to 10% opacity (#0000000A)
        shadowRadius: 10,
        // Shadow for Android
        elevation: 2, // Adjusted for Android to approximate the iOS shadow effect
        backgroundColor: '#fff', // Required for elevation to work on Android
        borderRadius: 24, // Optional: adds rounded corners if desired
    }
})

const ContestItem = ({ item }: { item: ContentType }) => {
    return (
        <TouchableOpacity onPress={() => {
            router.push(`/contest/${item?.id}`)
        }} style={style.shadow} >
            <View className='w-60 rounded-3xl overflow-hidden'>
                <Image source={item.image} className='w-full h-44' resizeMode='cover' />
                <View className='p-4'>
                    <Text className='text-sm font-normal'>{item.address}</Text>
                    <Text className='text-base font-medium mt-2 break-all'>{item.desc}</Text>
                    <Text className='text-sm font-normal mt-5 text-[#7E7E7E]'>{item.joiner} người tham gia</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const ContestSlide = ({ item }: { item: ContentType[] }) => {
    return (
        <FlatList
            data={item}
            renderItem={({ item }) => <ContestItem item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 20, overflow: "visible", paddingRight: 16, paddingVertical: 16 }}
        />
    )
}

export default ContestSlide