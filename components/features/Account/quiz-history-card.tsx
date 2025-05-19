import { View, Text, StyleSheet } from "react-native";

const QuizHistoryCard = ({ quizResults, formatDate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử làm bài</Text>
      <Text style={styles.subtitle}>
        Kết quả các bài kiểm tra đã hoàn thành
      </Text>

      <View style={styles.resultsList}>
        {quizResults?.map((result, index) => (
          <View key={index} style={styles.resultItem}>
            <View style={styles.resultHeader}>
              <View>
                <Text style={styles.resultTitle}>{result.quiz_id.title}</Text>
                <Text style={styles.resultType}>{result.quiz_id.type}</Text>
              </View>

              <View
                style={[
                  styles.scoreBadge,
                  {
                    backgroundColor:
                      result.score >= 8
                        ? "#4CAF50"
                        : result.score >= 5
                        ? "#F59E0B"
                        : "#EF4444",
                  },
                ]}
              >
                <Text style={styles.scoreText}>
                  {result?.score?.toFixed(1) ?? 0}/10
                </Text>
              </View>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(result?.score ?? 0) * 10}%`,
                    backgroundColor:
                      result.score >= 8
                        ? "#4CAF50"
                        : result.score >= 5
                        ? "#F59E0B"
                        : "#EF4444",
                  },
                ]}
              />
            </View>

            <Text style={styles.completionDate}>
              Hoàn thành: {formatDate(result.completedAt, "DD/MM/YYYY HH:mm")}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  resultsList: {
    marginTop: 5,
  },
  resultItem: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  resultType: {
    fontSize: 14,
    color: "#666",
  },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  scoreText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  completionDate: {
    fontSize: 12,
    color: "#666",
  },
});

export default QuizHistoryCard;
