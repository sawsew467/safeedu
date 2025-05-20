"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

interface Option {
  label: string;
  value: string;
}

interface FormDropdownProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  options: Option[];
  icon?: keyof typeof Ionicons.glyphMap;
  rules?: object;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  dependsOn?: {
    field: string;
    message: string;
  };
}

function FormDropdown<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Chọn một tùy chọn",
  options,
  icon,
  rules = {},
  error,
  helperText,
  disabled = false,
  dependsOn,
}: FormDropdownProps<T>) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {icon && <Ionicons name={icon} size={20} color="#666" />}
        <Text style={styles.label}>{label}</Text>
      </View>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={[
                styles.dropdownButton,
                error ? styles.dropdownButtonError : null,
                disabled ? styles.dropdownButtonDisabled : null,
              ]}
              onPress={() => !disabled && setModalVisible(true)}
              disabled={disabled}
            >
              <Text
                style={[
                  value ? styles.selectedText : styles.placeholderText,
                  disabled ? styles.disabledText : null,
                ]}
              >
                {value
                  ? options.find((option) => option.value === value)?.label
                  : placeholder}
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={disabled ? "#999" : "#666"}
              />
            </TouchableOpacity>

            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
            >
              <SafeAreaView>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{label}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.optionItem}
                        onPress={() => {
                          onChange(item.value);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.optionText}>{item.label}</Text>
                        {value === item.value && (
                          <Ionicons
                            name="checkmark"
                            size={20}
                            color="#4CAF50"
                          />
                        )}
                      </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                  />
                </View>
              </SafeAreaView>
            </Modal>
          </>
        )}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : dependsOn ? (
        <Text style={styles.helperText}>{dependsOn.message}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  dropdownButton: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  dropdownButtonError: {
    borderColor: "#FF3B30",
  },
  dropdownButtonDisabled: {
    backgroundColor: "#F5F5F5",
    borderColor: "#DDDDDD",
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  disabledText: {
    color: "#999",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },
});

export default FormDropdown;
