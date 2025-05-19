"use client";
import { View, Text, TextInput, StyleSheet } from "react-native";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

interface FormTextInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  rules?: object;
  error?: string;
  helperText?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

function FormTextInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon,
  rules = {},
  error,
  helperText,
  keyboardType = "default",
  autoCapitalize = "none",
}: FormTextInputProps<T>) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {icon && <Ionicons name={icon} size={20} color="#fff" />}
        <Text className="font-psemibold text-base text-white ml-2">
          {label}
        </Text>
      </View>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
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
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#FF3B30",
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

export default FormTextInput;
