"use client";
import Skeleton from "@/components/ui/skeleton";
import { Stack } from "expo-router";
import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import androidSettings from "@/components/ui/SafeViewAndroid";

const ProfileSkeleton = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <View className="flex bg-white p-4 flex-row items-center justify-start gap-2">
              <View className="flex flex-row items-center">
                <Skeleton
                  width={48}
                  height={48}
                  radius={50}
                  style={styles.avatar}
                />
                <View className="ml-4">
                  <Skeleton
                    width={180}
                    height={24}
                    style={styles.nameSkeleton}
                    delay={100}
                  />
                  <Skeleton
                    width={120}
                    height={16}
                    style={styles.usernameSkeleton}
                    delay={200}
                  />
                </View>
              </View>
            </View>
          ),

          headerTitle: () => <View className="hidden" />,
        }}
      />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <Skeleton
                width={100}
                height={100}
                radius={50}
                style={styles.avatar}
              />
            </View>

            {/* Name and Username */}
            <Skeleton
              width={180}
              height={24}
              style={styles.nameSkeleton}
              delay={100}
            />
            <Skeleton
              width={120}
              height={16}
              style={styles.usernameSkeleton}
              delay={200}
            />

            {/* Badge */}
            <View style={styles.badgeContainer}>
              <Skeleton
                width={150}
                height={30}
                radius={15}
                style={styles.badgeSkeleton}
                delay={300}
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Skeleton
                width="45%"
                height={40}
                radius={5}
                style={styles.buttonSkeleton}
                delay={400}
              />
              <Skeleton
                width="45%"
                height={40}
                radius={5}
                style={styles.buttonSkeleton}
                delay={450}
              />
            </View>
          </View>

          {/* Personal Info Card */}
          <View style={styles.infoCard}>
            <Skeleton
              width={180}
              height={24}
              style={styles.cardTitleSkeleton}
              delay={500}
            />

            {/* Info Items */}
            {[0, 1, 2].map((index) => (
              <View key={index} style={styles.infoItem}>
                <Skeleton
                  width={20}
                  height={20}
                  radius={10}
                  delay={550 + index * 50}
                />
                <View style={styles.infoContent}>
                  <Skeleton
                    width={100}
                    height={16}
                    style={styles.infoLabelSkeleton}
                    delay={600 + index * 50}
                  />
                  <Skeleton
                    width={150}
                    height={16}
                    style={styles.infoValueSkeleton}
                    delay={650 + index * 50}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Average Score Card */}
          <View style={styles.scoreCard}>
            <Skeleton
              width={180}
              height={24}
              style={styles.cardTitleSkeleton}
              delay={800}
            />
            <Skeleton
              width={250}
              height={16}
              style={styles.cardSubtitleSkeleton}
              delay={850}
            />

            {/* Score */}
            <View style={styles.scoreContainer}>
              <Skeleton
                width={80}
                height={40}
                style={styles.scoreSkeleton}
                delay={900}
              />
            </View>

            {/* Progress Bar */}
            <Skeleton
              width="100%"
              height={8}
              radius={4}
              style={styles.progressSkeleton}
              delay={950}
            />
          </View>

          {/* Results Analysis Card */}
          <View style={styles.analysisCard}>
            <Skeleton
              width={180}
              height={24}
              style={styles.cardTitleSkeleton}
              delay={1000}
            />
            <Skeleton
              width={250}
              height={16}
              style={styles.cardSubtitleSkeleton}
              delay={1050}
            />

            <Skeleton
              width={150}
              height={20}
              style={styles.sectionTitleSkeleton}
              delay={1100}
            />

            {/* Categories */}
            <View style={styles.categoriesContainer}>
              {[0, 1, 2, 3].map((index) => (
                <Skeleton
                  key={index}
                  width="48%"
                  height={80}
                  radius={8}
                  style={styles.categorySkeleton}
                  delay={1150 + index * 50}
                />
              ))}
            </View>
          </View>

          {/* Quiz History Card */}
          <View style={styles.historyCard}>
            <Skeleton
              width={180}
              height={24}
              style={styles.cardTitleSkeleton}
              delay={1350}
            />
            <Skeleton
              width={250}
              height={16}
              style={styles.cardSubtitleSkeleton}
              delay={1400}
            />

            {/* Quiz Items */}
            {[0, 1, 2, 3].map((index) => (
              <View key={index} style={styles.quizItemSkeleton}>
                <View style={styles.quizItemHeader}>
                  <View>
                    <Skeleton
                      width={150}
                      height={20}
                      style={styles.quizTitleSkeleton}
                      delay={1450 + index * 100}
                    />
                    <Skeleton
                      width={120}
                      height={16}
                      style={styles.quizTypeSkeleton}
                      delay={1500 + index * 100}
                    />
                  </View>
                  <Skeleton
                    width={60}
                    height={30}
                    radius={15}
                    style={styles.quizScoreSkeleton}
                    delay={1550 + index * 100}
                  />
                </View>
                <Skeleton
                  width="100%"
                  height={8}
                  radius={4}
                  style={styles.quizProgressSkeleton}
                  delay={1600 + index * 100}
                />
                <Skeleton
                  width={120}
                  height={12}
                  style={styles.quizDateSkeleton}
                  delay={1650 + index * 100}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  avatar: {
    borderRadius: 50,
  },
  nameSkeleton: {
    marginBottom: 8,
  },
  usernameSkeleton: {
    marginBottom: 15,
  },
  badgeContainer: {
    marginBottom: 15,
  },
  badgeSkeleton: {
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonSkeleton: {
    borderRadius: 5,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitleSkeleton: {
    marginBottom: 15,
  },
  cardSubtitleSkeleton: {
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabelSkeleton: {
    marginBottom: 5,
  },
  infoValueSkeleton: {},
  scoreCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  scoreSkeleton: {
    marginBottom: 10,
  },
  progressSkeleton: {
    borderRadius: 4,
  },
  analysisCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitleSkeleton: {
    marginTop: 10,
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categorySkeleton: {
    borderRadius: 8,
    marginBottom: 10,
  },
  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  quizItemSkeleton: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  quizItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  quizTitleSkeleton: {
    marginBottom: 5,
  },
  quizTypeSkeleton: {
    marginBottom: 10,
  },
  quizScoreSkeleton: {
    borderRadius: 15,
  },
  quizProgressSkeleton: {
    marginBottom: 8,
    borderRadius: 4,
  },
  quizDateSkeleton: {
    alignSelf: "flex-start",
  },
});

export default ProfileSkeleton;
