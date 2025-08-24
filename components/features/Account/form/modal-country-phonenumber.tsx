import { countries } from "@/settings/constants";
import { cn } from "@/utils/cn";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  Modal,
  Pressable,
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";

interface ModalPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect?: (value: { value: string; code: string }) => void;
  selectedValue?: string | null | number;
}
const ModalCountryPhonenumber: React.FC<ModalPickerProps> = ({
  visible,
  onClose,
  onSelect,
  selectedValue,
}) => {
  const safeSelectedValue = selectedValue !== null ? String(selectedValue) : "";
  const handleSlelect = (value: string) => {
    if (onSelect) {
      onSelect({
        value,
        code: countries.find((country) => country.value === value)?.code || "",
      });
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View className="flex-1 h-screen bg-slate-900/70 justify-end">
        <View className="bg-white max-h-[80%] p-5 rounded-t-3xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-pbold">Chọn mã quốc gia</Text>
            <Pressable onPress={onClose} className="px-4 py-2">
              <Text className="text-primary font-pmedium">Xong</Text>
            </Pressable>
          </View>

          <ScrollView className="max-h-[300px]">
            {Platform.OS === "ios" ? (
              <Picker
                selectedValue={safeSelectedValue}
                onValueChange={handleSlelect}
              >
                {countries.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            ) : (
              <View>
                {countries.map((option) => (
                  <TouchableOpacity
                    key={option.code}
                    className={cn(
                      "py-3 flex flex-row items-center gap-4 justify-center border-b-[1px] border-[#EEEEEE]",
                      safeSelectedValue === option.value && "bg-[#E8F4F9]"
                    )}
                    onPress={() => handleSlelect(option.value)}
                  >
                    <Image
                      source={{
                        uri: `https://flagcdn.com/w40/${option?.code?.toLowerCase()}.png`,
                      }}
                      resizeMode="contain"
                      className="w-4 h-3"
                    />
                    <Text className="text-base text-center text-[#333333]">
                      {option.label} ({option.value})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCountryPhonenumber;
