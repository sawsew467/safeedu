import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import frog from "@/assets/images/frog.png";

import FormTextInput from "./form-text-input";
import FormButton from "../../ui/form-button";
import { useRouter } from "expo-router";
import HeaderShown from "@/components/ui/HeaderShown";
import { useForgotPassWordMutation } from "@/services/auth/auth.api";

type FormData = {
  email: string;
};

const ForgotPasswordScreen = () => {
  const router = useRouter();

  const [sendVerificationCode, { isLoading }] = useForgotPassWordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await sendVerificationCode({ email: data.email }).unwrap();
      router.push(`/verify-code?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      control.setError(
        "email",
        error?.data?.error?.message ?? "Đã xảy ra lỗi khi gửi mã xác minh"
      );
    }
  };

  return (
    <HeaderShown title="Quên mật khẩu" style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View className="flex items-center w-full">
          <Image source={frog} />
        </View>

        <Text style={styles.title}>Quên mật khẩu</Text>
        <Text style={styles.subtitle}>
          Nhập địa chỉ email của bạn, chúng tôi sẽ gửi mã xác minh để đặt lại
          mật khẩu
        </Text>

        <FormTextInput
          control={control}
          name="email"
          label="Email"
          placeholder="your.email@example.com"
          keyboardType="email-address"
          rules={{
            required: "Email không được để trống",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          }}
          error={errors.email?.message}
        />

        <Text style={styles.noteText}>
          Chúng tôi sẽ gửi mã xác minh qua email.
        </Text>

        <FormButton
          title="Gửi mã xác minh"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Nhớ lại mật khẩu? </Text>
          <TouchableOpacity onPress={() => router.replace("/sign-in")}>
            <Text style={styles.linkText}>Quay lại đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  noteText: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
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

export default ForgotPasswordScreen;
