import React, { useRef, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from "react-native";
import { router, useRouter } from "expo-router"; // Import the router for navigation
import SafeViewAndroid from "@/components/ui/SafeViewAndroid";

const UserTypeScreen = () => {

    const handleNavigationToSignUp = () => {
        router.push("/sign-up");
    };

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <ImageBackground
                source={require('../../assets/images/phone-verification-background.png')} // Thay đổi đường dẫn tới hình ảnh nền của bạn
                className="absolute top-0 bottom-0 left-0 right-0"
                resizeMode="cover"

            />
            <View className="flex-1 px-3 mt-14">
                <View className="gap-1">
                    <Text className="text-white text-4xl font-bold">Bạn là ai?</Text>
                    <Text className="text-white text-base font-normal">Hãy chọn vai trò phù hợp nhất</Text>
                </View>
                <View className="mt-7">
                    <View className="flex flex-row gap-3">
                        <TouchableOpacity className="flex-1 bg-white/90 rounded-3xl flex flex-col justify-center items-center">
                            <Text className="m-4 font-semibold text-2xl text-[#6C7278]">Học sinh</Text>
                            <Image
                                source={require('../../assets/images/login/user-type-screen/student_avatar.png')}
                                className="w-[101px] h-[124px]"
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 bg-white/90 rounded-3xl flex flex-col justify-center items-center">
                            <Text className="m-4 font-semibold text-2xl text-[#6C7278]">Người dân</Text>
                            <Image
                                source={require('../../assets/images/login/user-type-screen/citizen_avatar.png')}
                                className="w-[101px] h-[124px]"
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={require('../../assets/images/login/user-type-screen/user_type_logo.png')}
                        className="absolute w-[132px] h-[132px] right-0 -top-[132px]"
                    />
                    <TouchableOpacity
                        className="mt-10 max-w-full items-center justify-center bg-primary py-3 rounded-3xl shadow-md shadow-black/20"
                        onPress={handleNavigationToSignUp}
                    >
                        <Text className="text-white text-lg font-normal">Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

})

export default UserTypeScreen;
