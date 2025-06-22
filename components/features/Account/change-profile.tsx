"use client";

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Controller, useForm } from "react-hook-form";

import * as Linking from "expo-linking";

import FormButton from "@/components/ui/form-button";
import { DateTimePicker } from "@/components/ui/datetime-input";
import FormTextInput from "./form/form-text-input";
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
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/services/user/user.api";
import { useUploadImageMutation } from "@/services/upload/api.upload";
import { useRouter } from "expo-router";
import { Building2, School } from "lucide-react-native";

import background from "@/assets/images/account/background.png";
import { baseApi } from "@/store/baseQuery";
import { useAppDispatch } from "@/hooks/redux";

type FormData = {
  avatar: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  phone_number?: string;
  email?: string;
  provinceId: string;
  organizationId: string;
};

type OrganizationOptions = {
  label: string;
  value: string;
  province_id?: string;
};

const ProfileFormScreen = () => {
  const [openModalDob, setOpenModalDOb] = useState(false);
  const [typeModalProvinceVisible, setTypeModalProvinceVisible] =
    useState(false);
  const [typeModalOrgVisible, setTypeModalOrgVisible] = useState(false);
  const [organizationsByProvince, setOrganizationsByProvince] = useState([]);

  const router = useRouter();

  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateProfileMutation();
  const [uploadImage, { isLoading: isUploadLoading }] =
    useUploadImageMutation();

  const dispatch = useAppDispatch();

  const { profile, role } = useGetMeQuery(undefined, {
    selectFromResult: ({ data }) => ({
      profile: data?.data,
      role: data?.data?.role,
    }),
  });

  const { provinces }: { provinces: Array<{ label: string; value: string }> } =
    useGetProvincesQuery(
      {},
      {
        selectFromResult: ({ data }) => {
          return {
            provinces: data?.data
              ? data?.data?.items?.map((province: Province) => ({
                  label: province.name,
                  value: province._id,
                }))
              : [],
          };
        },
      }
    );
  const { organizations } = useGetOrganizationsQuery(undefined, {
    skip: !provinces,
    selectFromResult: ({ data }) => {
      return {
        organizations: data?.data
          ? data?.data?.items?.map((org: Organization) => ({
              label: org.name,
              value: org._id,
              province_id: org?.province_id?._id,
            }))
          : [],
      };
    },
  });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      date_of_birth: null,
      phone_number: "",
      email: "",
      provinceId: "",
      organizationId: "",
    },
  });

  const selectedProvince = watch("provinceId");

  React.useEffect(() => {
    if (provinces && organizations) {
      const filteredOrganizations = organizations?.filter(
        (org: OrganizationOptions) => org?.province_id === selectedProvince
      );
      setOrganizationsByProvince(filteredOrganizations);
    }
  }, [provinces.length, organizations.length, selectedProvince]);

  React.useEffect(() => {
    if (profile) {
      const {
        first_name,
        last_name,
        date_of_birth,
        phone_number,
        organizationId,
        email,
        avatar,
      } = profile;
      reset({
        avatar,
        first_name,
        last_name,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
        phone_number,
        email,
        provinceId: organizationId?.province_id,
        organizationId: organizationId?._id,
      });
    }
  }, [profile]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateProfile(data).unwrap();
      dispatch(baseApi.util.invalidateTags(["citizens", "students"]));
      alert("Cập nhật hồ sơ thành công!");
    } catch (error) {
      alert("Đã xảy ra lỗi khi cập nhật hồ sơ!");
    } finally {
    }
  };

  const handleExit = () => {
    router.replace("/account");
  };

  const handleUploadAvatar = async (onChange: (value: string) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status === "granted") {
        return;
      }
      Alert.alert(
        "Yêu cầu quyền truy cập thư viện ảnh",
        "SafeEdu cần quyền truy cập thư viện ảnh để bạn có thể chọn và cập nhật ảnh đại diện cá nhân của mình. Quyền này chỉ được sử dụng cho mục đích thay đổi ảnh đại diện.",
        [
          {
            text: "Đã hiểu",
            onPress: async () => {
              await ImagePicker.requestMediaLibraryPermissionsAsync();
              Alert.alert(
                "Mở cài đặt",
                "Vui lòng cấp quyền truy cập ảnh trong phần Cài đặt của thiết bị.",
                [
                  { text: "Hủy", style: "cancel" },
                  {
                    text: "Cho phép",
                    onPress: () => {
                      ImagePicker.requestMediaLibraryPermissionsAsync();
                    },
                  },
                ]
              );
            },
          },
        ]
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets[0]) {
        const asset: any = result.assets[0];
        if (asset.uri === undefined) {
          alert("Vui lòng chọn ảnh khác");
        }
        let localUri = asset.uri;
        let filename = localUri.split("/").pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append("file", {
          uri: localUri,
          name: filename,
          type,
        } as any);

        const res = await uploadImage(formData).unwrap();
        onChange(res?.data?.data);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert(JSON.stringify(error));
    }
  };

  return (
    <HeaderShown
      title="Thay đổi hồ sơ của bạn"
      style={styles.container}
      backgroundImage={() => (
        <ImageBackground source={background} className="w-full h-full" />
      )}
    >
      <View style={styles.scrollContainer}>
        <Controller
          control={control}
          name={"avatar"}
          render={({ field: { onChange, value } }) => (
            <View className="flex items-center my-4">
              <TouchableOpacity
                className="w-32 h-32 rounded-full border-2 border-white bg-white items-center justify-center overflow-hidden"
                onPress={() => handleUploadAvatar(onChange)}
              >
                {isUploadLoading ? (
                  <ActivityIndicator size="large" color="##75A815" />
                ) : (
                  <Image source={{ uri: value }} className="w-full h-full" />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
        <FormTextInput
          control={control}
          name="first_name"
          label="Họ "
          icon="person-outline"
          placeholder="Nhập họ và tên đệm của bạn"
          rules={{
            required: "Họ và tên đệm không được để trống",
          }}
          error={errors.first_name?.message}
          helperText="Nhập họ và tên đệm của bạn"
          autoCapitalize="words"
        />
        <FormTextInput
          control={control}
          name="last_name"
          label="Tên"
          icon="person-outline"
          placeholder="Nhập tên của bạn"
          rules={{
            required: "Tên không được để trống",
          }}
          error={errors.last_name?.message}
          helperText="Nhập tên của bạn"
          autoCapitalize="words"
        />

        <View className="mb-4">
          <View className="flex flex-row gap-2 mb-2">
            <Ionicons name="calendar-outline" size={20} color="#fff" />
            <Text className="font-semibold text-base text-white">
              Ngày sinh
            </Text>
          </View>
          <Controller
            control={control}
            name={"date_of_birth"}
            render={({ field: { onChange, value } }) => (
              <View>
                <TouchableOpacity
                  style={[
                    styles.dropdownButton,
                    errors.date_of_birth?.message
                      ? styles.dropdownButtonError
                      : null,
                  ]}
                  onPress={() => setOpenModalDOb(true)}
                >
                  <Text
                    style={[
                      value ? styles.selectedText : styles.placeholderText,
                    ]}
                  >
                    {value
                      ? formatDate(value.toISOString(), "DD/MM/yyyy")
                      : "Chọn ngày sinh"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={"#666"} />
                </TouchableOpacity>
                <DateTimePicker
                  selectedValue={value ?? new Date()}
                  visible={openModalDob}
                  onSelect={(value) => onChange(value)}
                  onClose={() => setOpenModalDOb(false)}
                  title="Chọn ngày sinh"
                />
              </View>
            )}
          />

          {errors.date_of_birth?.message ? (
            <Text style={styles.errorText}>
              {errors.date_of_birth?.message}
            </Text>
          ) : (
            <Text style={styles.helperText}>{"Ngày sinh của bạn"}</Text>
          )}
        </View>

        <FormPhoneInput
          control={control}
          name="phone_number"
          label="Số điện thoại"
          rules={{
            pattern: {
              value: /^[0-9]{9,10}$/,
              message: "Số điện thoại không hợp lệ",
            },
          }}
          error={errors.phone_number?.message}
          helperText="Số điện thoại hiện tại của bạn"
        />

        <FormTextInput
          control={control}
          name="email"
          label="Email"
          icon="mail-outline"
          placeholder="example@email.com"
          keyboardType="email-address"
          rules={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          }}
          error={errors.email?.message}
          helperText="Email liên hệ của bạn"
        />

        <View>
          {role === "Student" && (
            <>
              <View className="flex flex-row gap-2 mb-2">
                <Building2 size={20} color="#fff" />
                <Text className="font-semibold text-base text-white">
                  Tỉnh/Thành phố
                </Text>
              </View>

              <Controller
                control={control}
                name={"provinceId"}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.dropdownButton,
                        errors.provinceId?.message
                          ? styles.dropdownButtonError
                          : null,
                      ]}
                      onPress={() => setTypeModalProvinceVisible(true)}
                    >
                      <Text
                        style={[
                          value ? styles.selectedText : styles.placeholderText,
                        ]}
                      >
                        {value
                          ? provinces?.find(
                              (province) => province.value === value
                            )?.label
                          : "Chọn tỉnh/thành phố"}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color={"#666"} />
                    </TouchableOpacity>
                    <ModalPicker
                      visible={typeModalProvinceVisible}
                      onClose={() => {
                        setTypeModalProvinceVisible(false);
                      }}
                      title="Chọn tỉnh/thành phố"
                      options={provinces}
                      selectedValue={value}
                      onSelect={(value) => {
                        onChange(value);
                      }}
                    />
                  </View>
                )}
              />
              {errors?.provinceId?.message ? (
                <Text className="text-red-500 text-xs mt-2">
                  {errors?.provinceId?.message}
                </Text>
              ) : (
                <Text style={styles.helperText}>
                  {"Tỉnh/Thành phố của bạn"}
                </Text>
              )}
              <View className="flex flex-row gap-2 mb-2 mt-2">
                <School size={20} color="#fff" />
                <Text className="font-semibold text-base text-white mt-5">
                  Trường
                </Text>
              </View>
              <Controller
                control={control}
                name="organizationId"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TouchableOpacity
                      style={[
                        styles.dropdownButton,
                        errors.organizationId?.message
                          ? styles.dropdownButtonError
                          : null,
                      ]}
                      onPress={() => setTypeModalOrgVisible(true)}
                    >
                      <Text
                        style={[
                          value ? styles.selectedText : styles.placeholderText,
                        ]}
                      >
                        {organizationsByProvince?.some(
                          (org) => org.value === value
                        )
                          ? organizationsByProvince?.find(
                              (org) => org.value === value
                            )?.label
                          : "Chọn trường"}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color={"#fff"} />
                    </TouchableOpacity>
                    <ModalPicker
                      visible={typeModalOrgVisible}
                      onClose={() => {
                        setTypeModalOrgVisible(false);
                      }}
                      title="Chọn trường"
                      options={organizationsByProvince}
                      selectedValue={value}
                      onSelect={(value) => {
                        onChange(value);
                      }}
                    />
                  </View>
                )}
              />

              {errors.organizationId?.message ? (
                <Text className="text-red-500 text-xs mt-2">
                  {errors.organizationId?.message}
                </Text>
              ) : (
                <Text style={styles.helperText}>{"Trường học của bạn"}</Text>
              )}
              <View />
            </>
          )}

          <View style={styles.buttonContainer}>
            <FormButton
              title="Thoát"
              onPress={handleExit}
              variant="secondary"
              isLoading={isUpdateLoading}
            />
            <FormButton
              title="Cập nhật hồ sơ"
              onPress={handleSubmit(onSubmit)}
              isLoading={isUpdateLoading}
            />
          </View>
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
    justifyContent: "space-between",
    marginTop: 20,
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

export default ProfileFormScreen;
