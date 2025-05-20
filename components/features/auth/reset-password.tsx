import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import FormTextInput from "./form-text-input";
import FormButton from "../../ui/form-button";
import { useResetPasswordMutation } from "@/services/auth/auth.api";
import HeaderShown from "@/components/ui/HeaderShown";
import { router } from "expo-router";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { otp } = route.params as { otp: string };

  const [resetPassword, { isLoading: isResetting }] =
    useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword({
        otp: otp,
        newPassword: data.password,
      }).unwrap();
      alert("Đặt lại mật khẩu thành công, vui lòng đăng nhập lại!");
      router.replace("/sign-in");
    } catch (error) {
      const message: string =
        (error as any)?.data?.error?.message || "Đã xảy ra lỗi!";
      Alert.alert(message);
      console.error("Error resetting password:", error);
    }
  };

  return (
    <HeaderShown title="Đặt lại mật khẩu" style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.subtitle}>
            Hãy tạo một mật khẩu mới cho tài khoản của bạn
          </Text>

          <FormTextInput
            control={control}
            name="password"
            label="Mật khẩu mới"
            secureTextEntry
            rules={{
              required: "Mật khẩu không được để trống",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,}$/,
                message:
                  "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt",
              },
            }}
            error={errors.password?.message}
          />

          <Text style={styles.passwordRequirement}>
            Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.
          </Text>

          <FormTextInput
            control={control}
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            secureTextEntry
            rules={{
              required: "Vui lòng xác nhận mật khẩu",
              validate: (value) =>
                value === password || "Mật khẩu xác nhận không khớp",
            }}
            error={errors.confirmPassword?.message}
          />

          <FormButton
            title="Đặt lại mật khẩu"
            onPress={handleSubmit(onSubmit)}
            isLoading={isResetting}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Đã nhớ mật khẩu? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login" as never)}
            >
              <Text style={styles.linkText}>Quay lại đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </HeaderShown>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBF6",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8BC34A",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 30,
  },
  passwordRequirement: {
    fontSize: 14,
    color: "#666666",
    marginTop: -10,
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#666666",
  },
  linkText: {
    fontSize: 16,
    color: "#8BC34A",
    fontWeight: "600",
  },
});

export default ResetPasswordScreen;
