import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
} from "react-native";
import { useForm, Controller, set } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import FormButton from "../../ui/form-button";
import {
  useForgotPassWordMutation,
  useVerifyCodeMutation,
} from "@/services/auth/auth.api";
import HeaderShown from "@/components/ui/HeaderShown";

type FormData = {
  code: string;
};

const VerifyCodeModule = () => {
  const router = useRouter();
  const [timer, setTimer] = useState(60);
  const navigation = useNavigation();
  const route = useRoute();
  const email = (route.params as { email: string })?.email || "";

  const [verifyCode, { isLoading: isVerifying }] = useVerifyCodeMutation();
  const [sendVerificationCode, { isLoading: isSendVerificationOtp }] =
    useForgotPassWordMutation();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      code: "",
    },
  });

  const code = watch("code");
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Timer for resend code
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const onSubmit = async (data: FormData) => {
    try {
      await verifyCode({ email, otp: data.code }).unwrap();
      router.replace(`/reset-password?otp=${encodeURIComponent(data.code)}`);
    } catch (error) {
      const { error: message } = error?.data || {};
      console.log("object :>> ", error);
      if (message) {
        control.setError("code", { message });
        setValue("code", ""); // Clear the code input
        inputRefs.current[0]?.focus();
      } else {
        control.setError("code", {
          message: "Đã xảy ra lỗi khi xác minh mã",
        });
      }
    }
  };

  const handleResendCode = async () => {
    if (timer > 0) return;

    try {
      await sendVerificationCode({ email }).unwrap();
      setTimer(60);
    } catch (error) {
      console.error("Error resending code:", error);
    }
  };

  const handleUseAnotherEmail = () => {
    navigation.goBack();
  };

  return (
    <HeaderShown title="Xác thực OTP" style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Nhập mã xác minh đã gửi đến email của bạn
          </Text>

          <Text style={styles.label}>Mã xác minh</Text>
          <Controller
            control={control}
            name="code"
            rules={{
              required: "Vui lòng nhập mã xác minh",
              minLength: {
                value: 6,
                message: "Mã xác minh phải có 6 chữ số",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.codeContainer}>
                <View style={styles.codeInputGroup}>
                  {[0, 1, 2].map((index) => (
                    <TextInput
                      key={`first-${index}`}
                      style={styles.codeInput}
                      maxLength={1}
                      keyboardType="numeric"
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      onChange={({ nativeEvent }) => {
                        if (nativeEvent.text === "" && index > 0) {
                          inputRefs.current[index - 1]?.focus();
                        }
                      }}
                      onChangeText={(text) => {
                        const newCode = value.split("");
                        newCode[index] = text;
                        onChange(newCode.join(""));

                        if (text && index < 5) {
                          inputRefs.current[index + 1]?.focus();
                        }
                      }}
                      value={value[index] || ""}
                    />
                  ))}
                </View>

                <Text style={styles.separator}>—</Text>

                <View style={styles.codeInputGroup}>
                  {[3, 4, 5].map((index) => (
                    <TextInput
                      key={`second-${index}`}
                      style={styles.codeInput}
                      maxLength={1}
                      keyboardType="numeric"
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      onChangeText={(text) => {
                        const newCode = value.split("");
                        newCode[index] = text;
                        onChange(newCode.join(""));

                        if (text && index < 5) {
                          inputRefs.current[index + 1]?.focus();
                        }
                      }}
                      onChange={({ nativeEvent }) => {
                        if (nativeEvent.text === "" && index > 0) {
                          inputRefs.current[index - 1]?.focus();
                        }
                      }}
                      value={value[index] || ""}
                    />
                  ))}
                </View>
              </View>
            )}
          />

          {errors.code && (
            <Text style={styles.errorText}>{errors.code.message}</Text>
          )}

          <Text style={styles.noteText}>
            Kiểm tra hộp thư để lấy mã 6 chữ số.
          </Text>

          <FormButton
            title="Xác minh mã"
            onPress={handleSubmit(onSubmit)}
            isLoading={isVerifying}
            disabled={code?.length !== 6}
          />

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleResendCode}
              disabled={timer > 0 || isSendVerificationOtp}
              style={styles.resendButton}
            >
              <Text
                style={[styles.resendText, timer > 0 && styles.disabledText]}
              >
                {isSendVerificationOtp
                  ? "...Đang gửi mã"
                  : timer > 0
                  ? `Không nhận được mã? Gửi lại (${timer}s)`
                  : "Không nhận được mã? Gửi lại"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleUseAnotherEmail}
              style={styles.anotherEmailButton}
            >
              <Text style={styles.anotherEmailText}>Dùng email khác</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </HeaderShown>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBF6",
  },
  content: {
    flex: 1,
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  codeInputGroup: {
    flexDirection: "row",
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
  },
  separator: {
    fontSize: 24,
    marginHorizontal: 5,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  noteText: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
    marginBottom: 20,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  resendButton: {
    marginBottom: 15,
  },
  resendText: {
    fontSize: 16,
    color: "#333",
  },
  disabledText: {
    color: "#999",
  },
  anotherEmailButton: {
    padding: 5,
  },
  anotherEmailText: {
    fontSize: 16,
    color: "#8BC34A",
    fontWeight: "600",
  },
});

export default VerifyCodeModule;
