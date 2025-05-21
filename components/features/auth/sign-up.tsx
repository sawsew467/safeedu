import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import SafeViewAndroid from "@/components/ui/SafeViewAndroid";
import background from "@/assets/images/phone-verification-background.png";
import {
  useCreateCitizenAccountMutation,
  useCreateStudentAccountMutation,
  useGetProvincesQuery,
  useGetOrganizationsQuery,
} from "@/services/auth/auth.api";
import { Province, Organization } from "@/healper/type/Organization";
import { ModalPicker } from "@/components/ui/modal-picker";
import { DateTimePicker } from "@/components/ui/datetime-input";
import { formatDate } from "@/utils/format-date";

type OrganizationOptions = {
  label: string;
  value: string;
  province_id?: string;
};

const SignUpModule = () => {
  const { userType } = useLocalSearchParams();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [selectProvince, setSelectProvince] = useState("");
  const [organizationsByProvince, setOrganizationsByProvince] = useState([]);
  const [typeModalProvinceVisible, setTypeModalProvinceVisible] =
    useState(false);
  const [typeModalOrgVisible, setTypeModalOrgVisible] = useState(false);
  const [typeModalDobVisible, setTypeModalDobVisible] = useState(false);
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    city: "",
    school: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    agreement: "",
  });

  const [signUnStudent, { isLoading: isLoadingStudent }] =
    useCreateStudentAccountMutation();

  const [signUnCitizen, { isLoading: isLoadingCitizen }] =
    useCreateCitizenAccountMutation();

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

  React.useEffect(() => {
    if (provinces && organizations) {
      const filteredOrganizations = organizations?.filter(
        (org: OrganizationOptions) => org?.province_id === selectProvince
      );

      setOrganizationsByProvince(filteredOrganizations);
    }
  }, [provinces.length, organizations.length, selectProvince]);

  const router = useRouter();
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleSignUp = async () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      dob: "",
      city: "",
      school: "",
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      agreement: "",
    };
    let hasError = false;

    // Required field validations
    if (!lastName) {
      newErrors.lastName = "Vui lòng nhập họ";
      hasError = true;
    }
    if (!firstName) {
      newErrors.firstName = "Vui lòng nhập tên";
      hasError = true;
    }
    if (!dob) {
      newErrors.dob = "Vui lòng chọn ngày sinh";
      hasError = true;
    } else if (dob > new Date()) {
      newErrors.dob = "Ngày sinh không hợp lệ";
      hasError = true;
    }
    if (userType === "student" && !selectProvince) {
      newErrors.city = "Vui lòng chọn thành phố";
      hasError = true;
    }
    if (userType === "student" && !selectedSchool) {
      newErrors.school = "Vui lòng chọn trường";
      hasError = true;
    }
    if (!userName) {
      newErrors.userName = "Vui lòng nhập tên đăng nhập";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      hasError = true;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      hasError = true;
    }
    if (!isAgreed) {
      newErrors.agreement = "Bạn phải đồng ý với điều khoản và điều kiện";
      hasError = true;
    }

    if (userName && !/^[a-zA-Z0-9_-]+$/.test(userName)) {
      newErrors.userName =
        "Tên đăng nhập chỉ được chứa chữ cái không dấu, số, dấu gạch dưới và dấu gạch ngang";
      hasError = true;
    }
    if (
      password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{1,}$/.test(
        password
      )
    ) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 1 chữ in hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt";
      hasError = true;
    }
    if (confirmPassword && confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
      hasError = true;
    }

    if (userType === "student" && !selectedSchool) {
      newErrors.school = "Vui lòng chọn trường";
    }

    setError(newErrors);

    if (!hasError) {
      try {
        switch (userType) {
          case "student":
            await signUnStudent({
              first_name: firstName,
              last_name: lastName,
              date_of_birth: dob.toISOString(),
              phone_number: phone ?? undefined,
              email: email ?? undefined,
              organizationId: selectedSchool,
              username: userName,
              password,
            }).unwrap();
            break;
          case "citizen":
            await signUnCitizen({
              first_name: firstName,
              last_name: lastName,
              date_of_birth: dob.toISOString(),
              phone_number: phone ?? undefined,
              email: email ?? undefined,
              username: userName,
              password,
            }).unwrap();
            break;
        }
        alert("Đăng ký thành công, vui lòng đăng nhập tài khoản của bạn!");
        router.push("/sign-in");
      } catch (error) {
        const message: string =
          (error as any)?.data?.error?.message || "Đã xảy ra lỗi!";
        Alert.alert(message);
      }
    }
  };

  const handleNavigationToSignIn = () => {
    router.push("/sign-in");
  };

  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <>
      <ImageBackground
        source={background}
        className="absolute top-0 bottom-0 left-0 right-0"
        resizeMode="cover"
      />
      <View className="px-4 pt-[90px]">
        <View className="bg-white w-full h-[100%] rounded-t-[40px] px-6 py-4">
          <Text className="text-center font-semibold text-2xl text-primary mb-5">
            {userType === "student"
              ? "Đăng ký Học sinh"
              : userType === "citizen"
              ? "Đăng ký Người dân"
              : null}
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="font-semibold text-base text-[#959595]">
              Họ <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              placeholder="Nguyễn"
              placeholderTextColor="#C4C4C4"
              value={lastName}
              onChangeText={setLastName}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.lastName ? (
              <Text className="text-red-500 text-xs mt-2">
                {error.lastName}
              </Text>
            ) : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Tên <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              placeholder="Văn A"
              placeholderTextColor="#C4C4C4"
              value={firstName}
              onChangeText={setFirstName}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.firstName ? (
              <Text className="text-red-500 text-xs mt-2">
                {error.firstName}
              </Text>
            ) : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Ngày sinh <Text className="text-red-500">*</Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                setTypeModalDobVisible(true);
              }}
              className="flex-row justify-between items-center"
            >
              <Text className="text-lg text-black pl-0 pb-0">
                {dob
                  ? formatDate(dob.toISOString(), "DD/MM/yyyy")
                  : "Chọn ngày sinh"}
              </Text>
              <Ionicons name="chevron-down" size={24} color="#888" />
            </TouchableOpacity>
            <DateTimePicker
              selectedValue={dob}
              visible={typeModalDobVisible}
              onSelect={(value) => setDob(value)}
              onClose={() => setTypeModalDobVisible(false)}
              title="Chọn ngày sinh"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.dob ? (
              <Text className="text-red-500 text-xs mt-2">{error.dob}</Text>
            ) : (
              <Text className="text-gray-500 text-xs mt-2">
                Vui lòng nhập ngày sinh để xác minh độ tuổi của bạn.
              </Text>
            )}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Số điện thoại
            </Text>
            <TextInput
              placeholder="0123456789"
              placeholderTextColor="#C4C4C4"
              value={phone}
              onChangeText={setPhone}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.phone ? (
              <Text className="text-red-500 text-xs mt-2">{error.phone}</Text>
            ) : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Email
            </Text>
            <TextInput
              placeholder="Nhập email"
              placeholderTextColor="#C4C4C4"
              value={email}
              onChangeText={setEmail}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.email ? (
              <Text className="text-red-500 text-xs mt-2">{error.email}</Text>
            ) : null}

            {userType === "student" && (
              <>
                <Text className="font-semibold text-base text-[#959595] mt-5">
                  Tỉnh/Thành phố <Text className="text-red-500">*</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTypeModalProvinceVisible(true);
                  }}
                  className="flex-row justify-between items-center"
                >
                  <Text className="text-lg text-black pl-0 pb-0">
                    {selectProvince
                      ? provinces?.find(
                          (province) => province.value === selectProvince
                        )?.label
                      : "Chọn tỉnh/thành phố"}
                  </Text>
                  <Ionicons name="chevron-down" size={24} color="#888" />
                </TouchableOpacity>
                <ModalPicker
                  visible={typeModalProvinceVisible}
                  onClose={() => {
                    setTypeModalProvinceVisible(false);
                  }}
                  title="Chọn tỉnh/thành phố"
                  options={provinces}
                  selectedValue={selectProvince}
                  onSelect={(value) => {
                    setSelectProvince(value);
                  }}
                />
                <View className="w-full h-[1.5px] bg-black mt-2" />
                {error.city ? (
                  <Text className="text-red-500 text-xs mt-2">
                    {error.city}
                  </Text>
                ) : (
                  <Text className="text-gray-500 text-xs mt-2">
                    Chọn tỉnh để hiển thị danh sách trường học.
                  </Text>
                )}

                <Text className="font-semibold text-base text-[#959595] mt-5">
                  Trường <Text className="text-red-500">*</Text>
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTypeModalOrgVisible(true);
                  }}
                  className="flex-row justify-between items-center"
                >
                  <Text className="text-lg text-black pl-0 pb-0">
                    {selectedSchool
                      ? organizationsByProvince?.find(
                          (org) => org.value === selectedSchool
                        )?.label
                      : "Chọn trường"}
                  </Text>
                  <Ionicons name="chevron-down" size={24} color="#888" />
                </TouchableOpacity>
                <ModalPicker
                  visible={typeModalOrgVisible}
                  onClose={() => {
                    setTypeModalOrgVisible(false);
                  }}
                  title="Chọn trường"
                  options={organizationsByProvince}
                  selectedValue={selectedSchool}
                  onSelect={(value) => {
                    setSelectedSchool(value);
                  }}
                />
                <View className="w-full h-[1.5px] bg-black mt-2" />
                {error.school ? (
                  <Text className="text-red-500 text-xs mt-2">
                    {error.school}
                  </Text>
                ) : (
                  <Text className="text-gray-500 text-xs mt-2">
                    Học sinh cần cung cấp thông tin về trường.
                  </Text>
                )}
              </>
            )}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Tên tài khoản <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              placeholder="vana"
              placeholderTextColor="#C4C4C4"
              value={userName}
              onChangeText={setUserName}
              className="text-lg text-black pl-0 pb-0"
            />
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.userName ? (
              <Text className="text-red-500 text-xs mt-2">
                {error.userName}
              </Text>
            ) : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Mật khẩu <Text className="text-red-500">*</Text>
            </Text>
            <View className="relative">
              <TextInput
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#C4C4C4"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                className="text-lg text-black pl-0 pb-0 pr-10"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Ionicons
                  name={passwordVisible ? "eye" : "eye-off"}
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.password ? (
              <Text className="text-red-500 text-xs mt-2">
                {error.password}
              </Text>
            ) : null}

            <Text className="font-semibold text-base text-[#959595] mt-5">
              Xác nhận mật khẩu <Text className="text-red-500">*</Text>
            </Text>
            <View className="relative">
              <TextInput
                placeholder="Xác nhận mật khẩu"
                placeholderTextColor="#C4C4C4"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                className="text-lg text-black pl-0 pb-0 pr-10"
              />
              <TouchableOpacity
                onPress={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Ionicons
                  name={confirmPasswordVisible ? "eye" : "eye-off"}
                  size={24}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            <View className="w-full h-[1.5px] bg-black mt-2" />
            {error.confirmPassword ? (
              <Text className="text-red-500 text-xs mt-2">
                {error.confirmPassword}
              </Text>
            ) : null}

            <TouchableOpacity
              className="flex-row items-center mb-5 mt-5"
              onPress={() => setIsAgreed(!isAgreed)}
              activeOpacity={0.8}
            >
              <View
                className={`w-5 h-5 mr-2 border rounded-sm ${
                  isAgreed ? "bg-primary border-primary" : "border-gray-400"
                }`}
              >
                {isAgreed && (
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color="white"
                    style={{ textAlign: "center" }}
                  />
                )}
              </View>
              <Text className="text-sm text-[#959595]">
                Tôi đồng ý với điều khoản & bảo mật
              </Text>
            </TouchableOpacity>
            {error.agreement ? (
              <Text className="text-red-500 text-xs mt-2">
                {error.agreement}
              </Text>
            ) : null}

            <TouchableOpacity
              className="mt-5 max-w-full items-center justify-center bg-primary py-3 rounded-3xl"
              onPress={handleSignUp}
              disabled={isLoadingStudent || isLoadingCitizen || !isAgreed}
            >
              <Text className="text-white text-lg font-normal">
                Hoàn tất đăng ký
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-5 mb-3 max-w-full items-center justify-center"
              onPress={handleNavigationToSignIn}
            >
              <Text className="text-primary text-lg font-normal underline">
                Quay lại đăng nhập
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default SignUpModule;
