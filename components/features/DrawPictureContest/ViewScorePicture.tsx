"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetMyPictureQuery } from "@/services/competitions/competitions.api";
import Avatar from "@/components/ui/avatar";
import Badge from "@/components/ui/badge";
import { formatDate } from "@/utils/format-date";
import { StarRating } from "./start-rating";
import Skeleton from "@/components/ui/skeleton";

const { width, height } = Dimensions.get("window");
const maxRating = 10;

interface DialogViewScoreProps {
  quiz_id: string;
  visible: boolean;
  onClose: () => void;
}

const DialogViewScore = ({
  quiz_id,
  visible,
  onClose,
}: DialogViewScoreProps) => {
  const { data, isLoading, error } = useGetMyPictureQuery(
    visible ? { id: quiz_id } : skipToken
  );

  console.log("quiz_id :>> ", quiz_id);

  const myPicture = data?.data;

  if (isLoading) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <DialogViewScoreSkeleton />
      </Modal>
    );
  }

  if (error || !myPicture) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Entypo name="chevron-left" size={30} color="#0ea5e9" />
            </TouchableOpacity>
            <Text style={styles.errorText}>Không thể tải thông tin</Text>
          </View>
        </View>
      </Modal>
    );
  }

  const getRatingColor = (score: number, max: number) => {
    const percentage = (score / max) * 100;

    if (percentage >= 80) return styles.ratingGreen;
    if (percentage >= 60) return styles.ratingLime;
    if (percentage >= 40) return styles.ratingYellow;
    if (percentage >= 20) return styles.ratingOrange;

    return styles.ratingRed;
  };

  const getRatingText = (score: number, max: number) => {
    const percentage = (score / max) * 100;

    if (percentage >= 80) return "Tuyệt vời";
    if (percentage >= 60) return "Tốt";
    if (percentage >= 40) return "Bình thường";
    if (percentage >= 20) return "Hãy cố gắng thêm";

    return "Hãy cố gắng thêm";
  };

  const ratingColor = getRatingColor(myPicture?.score ?? 0, maxRating);
  const ratingText = getRatingText(myPicture?.score ?? 0, maxRating);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Entypo name="chevron-left" size={30} color="#0ea5e9" />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Avatar
              source={{
                uri:
                  myPicture?.user_id?.avatar ||
                  "https://via.placeholder.com/48",
              }}
              fallback={
                myPicture?.user_id?.username?.substring(0, 2).toUpperCase() ||
                "UN"
              }
              size={48}
            />

            <View style={styles.userTextInfo}>
              <View style={styles.nameAndBadge}>
                <Text style={styles.userName}>
                  {myPicture?.user_id?.first_name}{" "}
                  {myPicture?.user_id?.last_name}
                </Text>
                {myPicture?.score !== undefined ? (
                  <Badge text="Đã chấm" style={styles.badgeCompleted} />
                ) : (
                  <Badge text="Đang được chấm" style={styles.badgePending} />
                )}
              </View>
              <Text style={styles.submissionTime}>
                {myPicture?.completedAt
                  ? `Được chấm vào: ${formatDate(myPicture?.completedAt)}`
                  : `Đã nộp vào: ${formatDate(myPicture?.startedAt)}`}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            {/* Main Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: myPicture?.picture || "https://via.placeholder.com/800",
                }}
                style={styles.mainImage}
                resizeMode="contain"
              />
            </View>

            {/* Score Section */}
            {myPicture?.score !== undefined && (
              <View style={styles.scoreSection}>
                <View style={styles.scoreHeader}>
                  <View style={styles.scoreDisplay}>
                    <Text style={styles.scoreValue}>
                      {myPicture?.score?.toFixed(1)}
                    </Text>
                    <Text style={styles.scoreMax}>/ {maxRating}</Text>
                  </View>
                  <Badge text={`Đánh giá: ${ratingText}`} style={ratingColor} />
                </View>

                <View style={styles.starRatingContainer}>
                  <StarRating
                    maxRating={maxRating}
                    rating={myPicture?.score ?? 0}
                  />
                </View>
              </View>
            )}

            {/* Feedback Section */}
            {myPicture?.feedback && (
              <View style={styles.feedbackSection}>
                <Text style={styles.feedbackTitle}>Đánh giá</Text>
                {myPicture?.feedback?.split("\n\n").map((paragraph, i) => (
                  <Text key={i} style={styles.feedbackParagraph}>
                    {paragraph}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const DialogViewScoreSkeleton = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          padding: 16,
          backgroundColor: "white",
          alignItems: "center",
          gap: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#e5e5e5",
        }}
      >
        <TouchableOpacity>
          <Entypo name="chevron-left" size={30} color="#0ea5e9" />
        </TouchableOpacity>

        {/* Avatar skeleton */}
        <Skeleton width={48} height={48} radius={24} />

        <View>
          {/* Username skeleton */}
          <Skeleton width={150} height={18} delay={300} />
          {/* Date skeleton */}
          <View style={{ marginTop: 8 }}>
            <Skeleton width={180} height={14} delay={600} />
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={{ flex: 1, width: "100%", minHeight: "100%" }}>
          <View style={{ flex: 1 }}>
            {/* Main image skeleton */}
            <View
              style={{
                width: width,
                height: width * 0.6,
                backgroundColor: "rgba(0,0,0,0.05)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Skeleton width={width} height={width * 0.6} delay={200} />
            </View>

            {/* Score section skeleton */}
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#e5e5e5",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Skeleton width={40} height={30} delay={400} />
                  <Skeleton
                    width={30}
                    height={20}
                    delay={450}
                    style={{ marginLeft: 4 }}
                  />
                </View>
                <Skeleton width={120} height={24} radius={12} delay={500} />
              </View>

              {/* Star rating skeleton */}
              <View style={{ marginTop: 16, flexDirection: "row" }}>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Skeleton
                    key={index}
                    width={24}
                    height={24}
                    radius={12}
                    delay={550 + index * 50}
                    style={{ marginRight: 4 }}
                  />
                ))}
              </View>
            </View>

            {/* Feedback section skeleton */}
            <View style={{ padding: 16 }}>
              <Skeleton width={100} height={24} delay={800} />

              <View style={{ marginTop: 16 }}>
                <Skeleton width="100%" height={16} delay={900} />
                <Skeleton
                  width="90%"
                  height={16}
                  delay={950}
                  style={{ marginTop: 8 }}
                />
                <Skeleton
                  width="95%"
                  height={16}
                  delay={1000}
                  style={{ marginTop: 8 }}
                />
              </View>

              <View style={{ marginTop: 24 }}>
                <Skeleton width="100%" height={16} delay={1050} />
                <Skeleton
                  width="85%"
                  height={16}
                  delay={1100}
                  style={{ marginTop: 8 }}
                />
                <Skeleton
                  width="90%"
                  height={16}
                  delay={1150}
                  style={{ marginTop: 8 }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: "#e5e5e5",
          alignItems: "flex-end",
        }}
      >
        <Skeleton width={80} height={36} radius={4} delay={1200} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    backgroundColor: "white",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  userTextInfo: {
    marginLeft: 12,
  },
  nameAndBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  submissionTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    minHeight: height - 180, // Adjust based on header and footer heights
  },
  imageContainer: {
    width: width,
    height: width * 0.6,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  scoreSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scoreMax: {
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
  },
  starRatingContainer: {
    marginTop: 16,
  },
  feedbackSection: {
    padding: 16,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  feedbackParagraph: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    alignItems: "flex-end",
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginLeft: 16,
  },
  badgeCompleted: {
    backgroundColor: "#22c55e",
    color: "white",
  },
  badgePending: {
    backgroundColor: "#eab308",
    color: "white",
  },
  ratingGreen: {
    backgroundColor: "#dcfce7",
    color: "#15803d",
    borderColor: "#bbf7d0",
  },
  ratingLime: {
    backgroundColor: "#ecfccb",
    color: "#4d7c0f",
    borderColor: "#d9f99d",
  },
  ratingYellow: {
    backgroundColor: "#fef9c3",
    color: "#a16207",
    borderColor: "#fef08a",
  },
  ratingOrange: {
    backgroundColor: "#ffedd5",
    color: "#c2410c",
    borderColor: "#fed7aa",
  },
  ratingRed: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderColor: "#fecaca",
  },
});

export default DialogViewScore;
