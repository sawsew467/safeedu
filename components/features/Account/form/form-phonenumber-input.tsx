"use client";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  useForm,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import ModalCountryPhonenumber from "./modal-country-phonenumber";
import { useState } from "react";

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
  control: phoneNumberControl,
  name,
  label,
  placeholder = "Nhập số điện thoại...",
  rules = {},
  error,
  helperText,
}: FormPhoneInputProps<T>) {
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  const { control, setValue } = useForm<{
    codePhoneNumber: {
      code: string;
      value: string;
    };
  }>({
    defaultValues: {
      codePhoneNumber: {
        code: "VN",
        value: "+84",
      },
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Ionicons name="call-outline" size={20} color="#fff" />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Controller
        control={phoneNumberControl}
        name={name}
        rules={rules}
        render={({
          field: {
            onChange: onChangePhoneNumber,
            onBlur: onBlurPhoneNumber,
            value: phoneNumberValue,
          },
        }) => (
          <Controller
            control={control}
            name="codePhoneNumber"
            render={({ field: { onChange, value } }) => (
              <View
                style={[
                  styles.inputContainer,
                  error ? styles.inputContainerError : null,
                ]}
              >
                <Pressable
                  style={styles.countryCode}
                  onPress={() => setTypeModalVisible(true)}
                >
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w40/${value?.code?.toLowerCase()}.png`,
                    }}
                    style={styles.flag}
                    resizeMode="contain"
                  />
                  <Text>{value.value}</Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </Pressable>
                <ModalCountryPhonenumber
                  visible={typeModalVisible}
                  onClose={() => {
                    setTypeModalVisible(false);
                  }}
                  selectedValue={value?.value}
                  onSelect={(newValue) => {
                    onChangePhoneNumber(
                      `${newValue?.value}${phoneNumberValue.replace(
                        value?.value,
                        ""
                      )}`
                    );
                    onChange(newValue);
                  }}
                />

                <TextInput
                  style={[
                    styles.input,
                    error ? styles.inputContainerError : null,
                  ]}
                  placeholder={placeholder}
                  placeholderTextColor="#c0c0c0"
                  value={phoneNumberValue.replace(value?.value, "")}
                  onChangeText={(phoneNumber) => {
                    if (isNaN(Number(phoneNumber))) return;
                    onChangePhoneNumber(`${value?.value}${phoneNumber}`);
                  }}
                  onBlur={onBlurPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            )}
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
    gap: 2,
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
