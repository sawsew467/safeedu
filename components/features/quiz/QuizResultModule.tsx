import HeaderShown from "@/components/ui/HeaderShown";
import { useGetQuizResultQuery } from "@/services/quiz/quiz.api";
import { useGetMeQuery } from "@/services/user/user.api";
import { formatDate } from "@/utils/format-date";
import { skipToken } from "@reduxjs/toolkit/query";
import { useLocalSearchParams } from "expo-router";
import type React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import QuizResultSkeleton from "./quiz-result-skeleton";
import avatar from "@/components/ui/avatar";

// Sample data structure based on the provided JSON
interface QuizResultProps {
  data: {
    _id: string;
    score: number;
    startAt: string;
    completedAt: string;
    questions: Array<{
      _id: string;
      isCorrect: boolean;
      score: number;
      question_id: {
        question: string;
        answer: string[];
      };
    }>;
    quiz_id: {
      title: string;
      type: string;
    };
    user_id: string;
  };
  userInfo?: {
    name: string;
    avatar: string;
    role: string;
  };
}

const QuizResult = () => {
  const { quizID } = useLocalSearchParams();

  const { data, isFetching, refetch } = useGetQuizResultQuery(
    quizID ? { id: quizID } : skipToken,
    {
      selectFromResult: ({ data, isFetching, isError }) => ({
        data: data?.data as QuizResultProps["data"],
        isFetching,
      }),
    }
  );

  console.log("quizID :>> ", quizID);

  const { userInfo } = useGetMeQuery(undefined, {
    selectFromResult: ({ data }) => ({
      userInfo: data?.data,
      isFetching,
    }),
  });
  // Calculate time spent
  const startTime = new Date(data?.startAt);
  const endTime = new Date(data?.completedAt);
  const timeSpent = Math.floor(
    (endTime.getTime() - startTime.getTime()) / 1000
  );

  // Format date for display

  function formatDurationToHHMMSS(startISO: string, endISO: string): string {
    const start = new Date(startISO);
    const end = new Date(endISO);

    const durationMs = end.getTime() - start.getTime();
    const totalSeconds = Math.floor(durationMs / 1000);

    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  console.log("data", data);

  // Count correct answers
  const correctAnswers = data?.questions?.filter((q) => q?.isCorrect)?.length;
  const totalQuestions = data?.questions?.length;
  console.log("data :>> ", data);
  console.log("userInfo :>> ", userInfo);

  const onRefresh = () => {
    refetch();
  };

  if (isFetching) return <QuizResultSkeleton />;

  return (
    <HeaderShown
      title={data?.quiz_id?.title ?? "Kết quả cuộc thi"}
      isBack
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.sectionTitle}>Thông tin người làm</Text>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: userInfo?.avatar ?? "/plachodler.svg" }}
                style={styles.avatar}
              />
              <View style={styles.userTextInfo}>
                <Text style={styles.userName}>
                  {userInfo?.first_name} {userInfo?.last_name}
                </Text>
                <Text style={styles.userRole}>
                  Tên đăng nhập: {userInfo?.username}
                </Text>
              </View>
            </View>
          </View>

          {/* Score */}
          <View style={styles.scoreContainer}>
            <Text style={styles.sectionTitle}>Điểm của bạn</Text>
            <View style={styles.scoreCircleContainer}>
              <View style={styles.scoreCircle}>
                <Text style={styles.scoreText}>{data?.score?.toFixed(1)}</Text>
              </View>
            </View>
          </View>

          {/* Summary */}
          <View style={styles.summaryContainer}>
            <Text style={styles.sectionTitle}>Tổng kết</Text>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Nộp bài vào lúc:</Text>
              <Text style={styles.summaryValue}>
                {formatDate(data?.completedAt, "HH:mm:ss DD/MM/yyyy")}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Thời gian làm bài:</Text>
              <Text style={styles.summaryValue}>
                {formatDurationToHHMMSS(data?.startAt, data?.completedAt)}
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{totalQuestions}</Text>
                <Text style={styles.statLabel}>Tổng số câu</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{correctAnswers}</Text>
                <Text style={styles.statLabel}>Câu trả lời đúng</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </HeaderShown>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6ab04c",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },
  userInfoContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userTextInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
  userRole: {
    fontSize: 12,
    color: "#666",
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 15,
  },
  scoreCircleContainer: {
    marginVertical: 10,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 8,
    borderColor: "#6ab04c",
  },
  scoreText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6ab04c",
  },
  summaryContainer: {
    marginBottom: 10,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    marginBottom: 8,
    borderRadius: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

export default QuizResult;
