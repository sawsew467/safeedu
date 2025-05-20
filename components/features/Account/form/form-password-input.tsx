"use client";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

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

function FormPasswordInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon,
  rules = {},
  error,
  helperText,
}: FormTextInputProps<T>) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {/* {icon && <Ionicons name={icon} size={20} color="#fff" />} */}
        <Text className="font-psemibold text-base text-white ml-2">
          {label}
        </Text>
      </View>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative">
            <View style={[styles.input, error ? styles.inputError : null]}>
              <TextInput
                placeholder={placeholder}
                placeholderTextColor="#C4C4C4"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={!passwordVisible}
                className=" text-black pl-0 pb-0 pr-10 text-[16px]"
              />
            </View>
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-3"
            >
              <Ionicons
                name={passwordVisible ? "eye" : "eye-off"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
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
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
  },
  input: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#d2362e",
  },
  errorText: {
    color: "#d2362e",
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    color: "#c0c0c0",
    fontSize: 14,
    marginTop: 4,
  },
});

export default FormPasswordInput;
