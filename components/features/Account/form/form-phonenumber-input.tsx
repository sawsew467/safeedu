"use client";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

interface FormPhoneInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  rules?: object;
  error?: string;
  helperText?: string;
}

function FormPhoneInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Nhập số điện thoại...",
  rules = {},
  error,
  helperText,
}: FormPhoneInputProps<T>) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Ionicons name="call-outline" size={20} color="#fff" />
        <Text style={styles.label}>{label}</Text>
      </View>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              styles.inputContainer,
              error ? styles.inputContainerError : null,
            ]}
          >
            <View style={styles.countryCode}>
              <Image
                source={{ uri: "https://flagcdn.com/w40/vn.png" }}
                style={styles.flag}
                resizeMode="contain"
              />
              <Ionicons name="chevron-down" size={16} color="#666" />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={placeholder}
              keyboardType="phone-pad"
            />
          </View>
        )}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
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
    color: "#fff",
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: "row",
    height: 50,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  inputContainerError: {
    borderColor: "#FF3B30",
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: "#CCCCCC",
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 4,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    color: "#c0c0c0",
    fontSize: 14,
    marginTop: 4,
  },
});

export default FormPhoneInput;
