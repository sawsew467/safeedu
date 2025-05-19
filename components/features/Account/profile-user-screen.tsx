"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { KeyRound, UserPen } from "lucide-react-native";

import background from "@/assets/images/account/background.png";

import { useNavigation } from "@react-navigation/native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import QuizHistoryCard from "./quiz-history-card";
import ResultAnalysisCard from "./result-analyst-card";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetMeQuery,
  useGetStudentByUsernameQuery,
} from "@/services/user/user.api";
import ProfileSkeleton from "./profile-skeleton";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileUserScreen = () => {
  const router = useRouter();
  const { username } = useLocalSearchParams();

  const { data, isFetching, isError, refetch } = useGetStudentByUsernameQuery(
    username ? { username } : skipToken,
    {
      selectFromResult: ({ data, isFetching, isError }) => {
        return {
          data: data?.data,
          isFetching,
          isError,
        };
      },
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

  const insets = useSafeAreaInsets();
  console.log("insets :>> ", insets);
  if (isError && !isFetching) {
    return (
      <SafeAreaView style={styles.container} className="bg-none relative">
        <View className="absolute top-0 bottom-0 left-0 right-0 z-0">
          <Image source={background} className="w-full h-full" />
        </View>
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
        >
          <View className="flex items-center justify-center w-full h-[80vh]">
            <Text className="font-pbold text-white text-2xl">
              Học sinh không tồn tại
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (isFetching || !data) {
    return (
      <>
        <View className="relative w-full h-full">
          <View className="absolute top-0 bottom-0 left-0 right-0 z-0">
            <Image source={background} className="w-full h-full" />
          </View>
          <ProfileSkeleton />
        </View>
      </>
    );
  }

  const averageScore = calculateAverageScore(data?.quizResults);
  const categories = categorizeResults(data?.quizResults);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View className="flex bg-white p-4 flex-row items-center justify-start gap-2">
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <Entypo
                  name="chevron-left"
                  size={30}
                  className="text-primary"
                />
              </TouchableOpacity>
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: data?.avatar }}
                  className="w-12 h-12 rounded-full"
                />
                <View className="ml-4">
                  <Text className="font-pmedium">
                    {data?.first_name} {data?.last_name}{" "}
                  </Text>
                  <Text className="font-psemibold underline text-gray-500">
                    @{data?.username}
                  </Text>
                </View>
              </View>
            </View>
          ),

          headerTitle: () => <View className="hidden" />,
        }}
      />
      <SafeAreaView
        style={styles.container}
        className="bg-none h-full relative"
      >
        <View className="absolute top-0 bottom-0 left-0 right-0 z-0">
          <Image source={background} className="w-full h-full" />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {
                refetch();
              }}
            />
          }
          className="z-10 bg-none "
          contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.top * 3 }}
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

            {data?.organizationId?.name && (
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Ionicons name="school-outline" size={14} color="#666" />
                  <Text style={styles.badgeText}>
                    {data?.organizationId?.name}
                  </Text>
                </View>
              </View>
            )}
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
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

export default ProfileUserScreen;
