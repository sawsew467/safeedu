"use client";

import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { KeyRound, UserPen, UserRound } from "lucide-react-native";

import background from "@/assets/images/account/background.png";

import { Ionicons } from "@expo/vector-icons";
import QuizHistoryCard from "./quiz-history-card";
import ResultAnalysisCard from "./result-analyst-card";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetMeQuery,
  useGetStudentByUsernameQuery,
} from "@/services/user/user.api";
import ProfileSkeleton from "./profile-skeleton";
import { useFocusEffect, useRouter } from "expo-router";
import LogOut from "./logout";

const ProfileScreen = () => {
  const router = useRouter();
  const {
    profile,
    isError: isGetProfileError,
    isFetching: isFetchingProfile,
  } = useGetMeQuery(undefined, {
    selectFromResult: ({ data, isError, isFetching }) => ({
      profile: data?.data,
      isError,
      isFetching,
    }),
    refetchOnFocus: true, // khi quay lại app từ nền
    refetchOnMountOrArgChange: true, // khi component mount lại
  });

  const {
    data,
    isFetching: isFetchingProfileDetail,
    isError: isGetProfileDetailError,
    refetch,
  } = useGetStudentByUsernameQuery(
    profile?.username ? { username: profile?.username } : skipToken,
    {
      selectFromResult: ({ data, isFetching, isError }) => {
        return {
          data: data?.data,
          isFetching,
          isError,
        };
      },
      refetchOnFocus: true, // khi quay lại app từ nền
      refetchOnMountOrArgChange: true, // khi component mount lại
    }
  );

  const formatDate = (dateString, format = "DD tháng MM YYYY") => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const day = date?.getDate();
    const month = date?.getMonth() + 1;
    const year = date?.getFullYear();

    if (format === "DD/MM/YYYY HH:mm") {
      const hours = date?.getHours()?.toString()?.padStart(2, "0");
      const minutes = date?.getMinutes()?.toString()?.padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return `${day} tháng ${month} ${year}`;
  };

  const isError = isGetProfileError || isGetProfileDetailError;
  const isFetching = isFetchingProfile || isFetchingProfileDetail;

  console.log("is :>> ", isFetching);

  // Tính điểm trung bình
  const calculateAverageScore = (results) => {
    if (!results || results?.length === 0) return 0;

    const totalScore = results.reduce(
      (acc, result) => acc + (result?.score || 0),
      0
    );
    return totalScore / results?.length;
  };

  // Phân loại kết quả
  const categorizeResults = (results) => {
    if (!results) return { excellent: 0, good: 0, average: 0, poor: 0 };

    return {
      excellent: results?.filter((r) => r?.score >= 9)?.length,
      good: results?.filter((r) => r?.score >= 7 && r?.score < 9)?.length,
      average: results?.filter((r) => r?.score >= 5 && r?.score < 7)?.length,
      poor: results?.filter((r) => r?.score < 5)?.length,
    };
  };

  const handleChangeProfile = () => {
    router.push("/account/change-profile");
  };
  const handleSignIn = () => {
    router.push("/sign-in");
  };
  const handleSignUp = () => {
    router.push("/user-type-screen");
  };
  const handleChangePassword = () => {
    router.push("/account/change-password");
  };

  if (isError && !isFetching) {
    return (
      <SafeAreaView
        style={styles.container}
        className="bg-none h-full relative"
      >
        <View className="absolute top-0 bottom-0 left-0 right-0 z-0">
          <ImageBackground source={background} className="w-full h-full" />
        </View>
        <View className="flex-1 flex items-center justify-center">
          <View className="h-auto flex items-center mb-4">
            <Image
              source={require("@/assets/images/safeedu.png")}
              className="h-64 w-56"
            />
            {/* <UserRound size={100} strokeWidth={1} color="white" /> */}
            <Text className="text-gray-200 text-xl font-pmedium mb-2 mt-4">
              Vui lòng đăng nhập để tiếp tục
            </Text>
          </View>
          <View className="flex flex-row justify-center items-center w-full gap-4 mb-2 px-8">
            <TouchableOpacity
              onPress={handleSignIn}
              className="w-1/2 flex-row h-[60px] bg-white rounded-2xl py-2 flex items-center justify-center border-2 border-primary"
            >
              <Text className="text-primary font-pmedium">Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignUp}
              className="w-1/2 flex-row h-[60px] bg-primary rounded-2xl py-2 flex items-center justify-center"
            >
              <Text className="text-white font-pmedium">Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const averageScore = calculateAverageScore(data?.quizResults);
  const categories = categorizeResults(data?.quizResults);

  return (
    <SafeAreaView style={styles.container} className="bg-none relative">
      <View className="absolute top-0 bottom-0 left-0 right-0 z-0">
        <ImageBackground source={background} className="w-full h-full" />
      </View>
      {isFetching ? (
        <ProfileSkeleton />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {
                refetch();
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          className="z-10 bg-none  px-1"
        >
          <View className="z-10 flex justify-center items-center mt-10">
            <View className="mb-4 border-4 border-white rounded-full w-[100px] h-[100px] overflow-hidden">
              {data?.avatar ? (
                <Image
                  source={{ uri: data?.avatar ?? "/placehodler.svg" }}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {data?.first_name?.charAt(0)}
                    {data?.last_name?.charAt(0)}
                  </Text>
                </View>
              )}
            </View>

            <Text className="font-pbold text-xl text-center text-white">
              {data?.first_name} {data?.last_name}
            </Text>
            <Text className="font-pmedium text-sm text-gray-300 mb-2">
              @{data?.username}
            </Text>
            <Text className="font-plight text-lg text-gray-100 mb-4">
              {formatDate(data?.date_of_birth, "DD/MM/YYYY")}
            </Text>

            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Ionicons name="school-outline" size={14} color="#666" />
                <Text style={styles.badgeText}>
                  {data?.organizationId?.name}
                </Text>
              </View>
            </View>

            <View className="flex flex-row justify-center w-full  gap-4 mb-2">
              <TouchableOpacity
                onPress={handleChangeProfile}
                className="flex-1 flex-row gap-2 h-[60px] bg-primary rounded-2xl py-2 flex items-center m-0 justify-center"
              >
                <UserPen color="white" size={22} className="mb-2 mr-2" />
                <Text className="text-white font-pbold mr-2 mb-2">
                  Thay đổi hồ sơ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleChangePassword}
                className="flex-1 flex-row gap-2 h-[60px] bg-primary rounded-2xl py-2 flex items-center m-0 justify-center"
              >
                <KeyRound color="white" size={22} className="mb-2 mr-2" />
                <Text className="text-white font-pbold mr-2 mb-2">
                  Đổi mật khẩu
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.cardTitle}>Điểm trung bình</Text>
            <Text style={styles.cardSubtitle}>
              Tổng hợp từ tất cả các bài kiểm tra
            </Text>

            <View style={styles.averageScoreContainer}>
              <Text style={styles.averageScore}>
                {averageScore?.toFixed(1)}
              </Text>
              <Text style={styles.maxScore}>/10</Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${averageScore * 10}%`,
                    backgroundColor:
                      averageScore >= 8
                        ? "#4CAF50"
                        : averageScore >= 5
                        ? "#F59E0B"
                        : "#EF4444",
                  },
                ]}
              />
            </View>
          </View>

          <ResultAnalysisCard categories={categories} />

          <QuizHistoryCard
            quizResults={data?.quizResults}
            formatDate={formatDate}
          />
          <LogOut />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileSection: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#90CAF9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userHandle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  badgeContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  badgeText: {
    fontSize: 14,
    marginLeft: 5,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  infoCard: {
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoContent: {
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    color: "#666",
  },
  scoreCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  averageScoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    marginVertical: 10,
  },
  averageScore: {
    fontSize: 28,
    fontWeight: "bold",
  },
  maxScore: {
    fontSize: 16,
    color: "#666",
    marginLeft: 2,
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
});

export default ProfileScreen;
