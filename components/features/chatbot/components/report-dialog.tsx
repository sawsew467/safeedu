import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Dialog from "react-native-dialog";
import RNPickerSelect from "react-native-picker-select";
const ReportDialog = ({
  visible,
  handleDialog,
  setSelectedOption,
  selectedOption,
}) => {
  const options = [
    { id: "1", label: "Nội dung không chính xác", value: "inaccurate" },
    { id: "2", label: "Vi phạm bản quyền", value: "copyright" },
    { id: "3", label: "Nội dung phản cảm", value: "offensive" },
    { id: "4", label: "Khác", value: "other" },
  ];
  return (
    <View>
      <Dialog.Container
        contentStyle={styles.dialog_container}
        visible={visible}
      >
        <Dialog.Title>Báo cáo vi phạm nội dung</Dialog.Title>
        <Dialog.Description>
          <View style={styles.container}>
            <Text style={styles.title}>Lí do vi phạm:</Text>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionContainer}
                onPress={() => setSelectedOption(option.value)}
              >
                {/* Radio Button */}
                <View style={styles.radioCircle}>
                  {selectedOption === option.value && (
                    <View style={styles.selectedRb} />
                  )}
                </View>
                <Text style={styles.optionLabel} className="font-pregular">
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
            {selectedOption && (
              <Text style={styles.selectedText} className="font-pmedium">
                Bạn đã chọn:{" "}
                {options.find((o) => o.value === selectedOption)?.label}
              </Text>
            )}
          </View>
        </Dialog.Description>
        <View className="font-pregular flex flex-row w-full justify-end">
          <Dialog.Button
            label="Hủy"
            color="red"
            className="font-pregular"
            onPress={() => handleDialog("cancel")}
          />
          <Dialog.Button
            label="Báo cáo"
            color="#75A815"
            onPress={() => handleDialog("send")}
          />
        </View>
      </Dialog.Container>
    </View>
  );
};
const styles = StyleSheet.create({
  dialog_container: {
    width: "90%",
    minWidth: "90%",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: "bold",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#777",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "blue",
  },
  optionLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default ReportDialog;
