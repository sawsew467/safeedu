"use client";

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { Controller, useForm } from "react-hook-form";

import background from "@/assets/images/account/background.png";

import FormButton from "@/components/ui/form-button";
import { DateTimePicker } from "@/components/ui/datetime-input";
import FormTextInput from "./form/form-text-input";
import FormDropdown from "./form/form-dropdown";
import FormPhoneInput from "./form/form-phonenumber-input";
import HeaderShown from "@/components/ui/HeaderShown";
import { formatDate } from "@/utils/format-date";
import { Ionicons } from "@expo/vector-icons";
import { ModalPicker } from "@/components/ui/modal-picker";
import * as ImagePicker from "expo-image-picker";

import { Province, Organization } from "@/healper/type/Organization";

import {
  useGetProvincesQuery,
  useGetOrganizationsQuery,
} from "@/services/auth/auth.api";
import {
  useChangePasswordMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/services/user/user.api";
import { useUploadImageMutation } from "@/services/upload/api.upload";
import uploadImage from "@/components/ui/uploadImage";
import { useRouter } from "expo-router";
import FormPasswordInput from "./form/form-password-input";
import { isLoading } from "expo-font";

type FormData = {
  old_password: string;
  password: string;
  confirm_password: string;
};

const ChangPasswordScreen = () => {
  const router = useRouter();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { confirm_password, ...passwordData } = data;
      await changePassword(passwordData).unwrap();
      alert("Thay đổi mật khẩu thành công!");
    } catch (error) {
      const { message, details } = error?.data;
      console.log("details :>> ", details);

      control.setError("old_password", {
        message: message || "Mật khẩu cũ không đúng",
      });
    } finally {
    }
  };

  const handleExit = () => {
    router.replace("/account");
  };

  return (
    <HeaderShown
      title="Thay đổi Mật khẩu của bạn"
      style={styles.container}
      HeaderComponent={() => (
        <View className="absolute top-0 bottom-0 left-0 right-0 z-0">
          <ImageBackground source={background} className="w-full h-full" />
        </View>
      )}
    >
      <View style={styles.scrollContainer}>
        <FormPasswordInput
          control={control}
          name="old_password"
          label="Mật khẩu cũ"
          icon="lock-closed-outline"
          placeholder="●●●●●●●"
          rules={{
            required: "Mật khẩu cũ không được để trống",
          }}
          error={errors.old_password?.message}
          helperText="Nhập lại mật khẩu cũ của bạn"
        />
        <FormPasswordInput
          control={control}
          name="password"
          label="Mật khẩu mới"
          icon="lock-closed-outline"
          placeholder="●●●●●●●"
          rules={{
            required: "Mật khẩu mới không được để trống",
            validate: {
              notSameAsOld: (value) =>
                value !== watch("old_password") ||
                "Mật khẩu mới không được giống mật khẩu cũ",
              hasUppercase: (value) =>
                /[A-Z]/.test(value) || "Mật khẩu phải có ít nhất 1 chữ in hoa",
              hasLowercase: (value) =>
                /[a-z]/.test(value) || "Mật khẩu phải có ít nhất 1 chữ thường",
              hasSpecialChar: (value) =>
                /[^A-Za-z0-9]/.test(value) ||
                "Mật khẩu phải có ít nhất 1 ký tự đặc biệt",
            },
          }}
          error={errors.password?.message}
          helperText="Nhập lại mật khẩu mới của bạn"
        />
        <FormPasswordInput
          control={control}
          name="confirm_password"
          label="Xác nhận Mật khẩu mới"
          icon="lock-closed-outline"
          placeholder="●●●●●●●"
          rules={{
            required: "Xác nhận mật khẩu mới không được để trống",
            validate: (value) =>
              value === watch("password") ||
              "Mật khẩu xác nhận phải giống mật khẩu mới",
          }}
          error={errors.confirm_password?.message}
          helperText="Xác nhận Mật khẩu mới của bạn"
        />
        <View style={styles.buttonContainer}>
          <FormButton
            title="Hủy"
            variant="secondary"
            onPress={handleExit}
            isLoading={isLoading}
          />
          <FormButton
            title="Lưu"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
      </View>
    </HeaderShown>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 16,
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
  selectedText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
});

export default ChangPasswordScreen;
