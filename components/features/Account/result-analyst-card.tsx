import { View, Text, StyleSheet } from "react-native";

const ResultAnalysisCard = ({ categories }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phân tích kết quả</Text>
      <Text style={styles.subtitle}>Biểu đồ thành tích học tập</Text>

      <View>
        <Text style={styles.sectionTitle}>Phân loại kết quả</Text>
        <View style={styles.categoriesContainer}>
          <View style={styles.categoryBox}>
            <Text style={styles.categoryLabel}>Xuất sắc (≥ 9)</Text>
            <Text style={styles.categoryValue}>{categories.excellent}</Text>
          </View>

          <View style={styles.categoryBox}>
            <Text style={styles.categoryLabel}>Khá (7-8.9)</Text>
            <Text style={styles.categoryValue}>{categories.good}</Text>
          </View>

          <View style={styles.categoryBox}>
            <Text style={styles.categoryLabel}>Trung bình (5-6.9)</Text>
            <Text style={styles.categoryValue}>{categories.average}</Text>
          </View>

          <View style={styles.categoryBox}>
            <Text style={styles.categoryLabel}>Yếu ({"< 5"})</Text>
            <Text style={styles.categoryValue}>{categories.poor}</Text>
          </View>
        </View>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryBox: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  categoryLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  categoryValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ResultAnalysisCard;
