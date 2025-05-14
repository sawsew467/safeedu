import React, { useRef, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Modal } from "react-native";
import { router, useRouter } from "expo-router";
import SafeViewAndroid from "@/components/ui/SafeViewAndroid";

const UserTypeScreen = () => {
    const [selectedUserType, setSelectedUserType] = useState<"student" | "citizen" | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleUserTypeSelect = (type: "student" | "citizen") => {
        setSelectedUserType(type);
    }

    const isSelected = (type: "student" | "citizen") => selectedUserType === type;

    const handleNavigationToSignUp = () => {
        if (selectedUserType) {
            router.push({ pathname: "/sign-up", params: { userType: selectedUserType } });
        } else {
            setIsModalVisible(true);
        }
    };

    const handleNavigationToSignIn = () => {
        router.push("/sign-in");
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <ImageBackground
                source={require('../../assets/images/phone-verification-background.png')}
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
                        <TouchableOpacity
                            onPress={() => handleUserTypeSelect("student")}
                            className={`flex-1 ${isSelected("student") ? "bg-primary/60" : "bg-white/90"} rounded-3xl flex flex-col justify-center items-center`}
                        >
                            <Text
                                className={`m-4 font-semibold text-2xl ${isSelected("student") ? "text-white" : "text-[#6C7278]"} `}
                            >
                                Học sinh
                            </Text>
                            <Image
                                source={require('../../assets/images/login/user-type-screen/student_avatar.png')}
                                className="w-[101px] h-[124px]"
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleUserTypeSelect("citizen")}
                            className={`flex-1 ${isSelected("citizen") ? "bg-primary/60" : "bg-white/90"} rounded-3xl flex flex-col justify-center items-center`}
                        >
                            <Text
                                className={`m-4 font-semibold text-2xl ${isSelected("citizen") ? "text-white" : "text-[#6C7278]"} `}
                            >
                                Người dân
                            </Text>
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
                    {/* <TouchableOpacity
                        className="mt-5 max-w-full items-center justify-center bg-white py-3 rounded-3xl shadow-md shadow-black/20"
                        onPress={handleNavigationToSignIn}
                    >
                        <Text className="text-primary text-lg font-normal">Quay lại đăng nhập</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        className="mt-5 mb-3 max-w-full items-center justify-center"
                        onPress={handleNavigationToSignIn}
                    >
                        <Text className="text-white text-lg font-normal underline">Quay lại đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="w-4/5 bg-white rounded-2xl p-6 shadow-md shadow-black/10">
                        <Text className="text-center text-xl font-semibold text-[#333333] mb-4">
                            Vui lòng chọn vai trò
                        </Text>
                        <Text className="text-center text-base text-[#6C7278] mb-6">
                            Bạn cần chọn vai trò để tiếp tục.
                        </Text>
                        <TouchableOpacity
                            className="items-center justify-center bg-primary py-3 rounded-3xl"
                            onPress={closeModal}
                        >
                            <Text className="text-white text-lg font-normal">Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

})

export default UserTypeScreen;
