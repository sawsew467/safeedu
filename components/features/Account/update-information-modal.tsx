import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { setNotifycaUpdateProfile } from "../auth/slices";
import { useAppDispatch } from "@/hooks/redux";
import { Ionicons } from "@expo/vector-icons";

const UpdateInformationModal = ({
  isVisible,
  setIsVisible,
  handleUpdateProfile,
}) => {
  const dispatch = useAppDispatch();

  const [isAgreed, setIsAgreed] = React.useState(false);

  const handleCancel = () => {
    if (isAgreed) {
      dispatch(setNotifycaUpdateProfile(false));
      setIsVisible(false);
    } else setIsVisible(false);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent
      onRequestClose={() => setIsVisible(false)}
    >
      <View className="relative flex-1 bg-slate-600/30 justify-center px-4">
        <View className="absolute top-0 bottom-0 left-0 right-0 z-0">
          <View className="bg-slate-600/30 w-full h-full"></View>
        </View>
        <View className="bg-white p-5 rounded-xl max-h-[80%]">
          <Text className="text-lg font-pmedium text-center">
            Bạn có muốn cập nhật thêm thông tin để có thể xem được những thông
            tin của trường không?
          </Text>
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
              Không hiện lại thông báo này
            </Text>
          </TouchableOpacity>
          <View
            className="flex flex-row justify-center mt-4"
            style={{ gap: 10 }}
          >
            <TouchableOpacity
              onPress={handleCancel}
              className="py-4 px-6 rounded-lg bg-gray-200"
            >
              <Text className="text-base font-pregular">Không</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpdateProfile}
              className="py-4 px-6 bg-primary rounded-lg"
            >
              <Text className="text-base font-psemibold text-white">
                Cập nhật
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateInformationModal;
