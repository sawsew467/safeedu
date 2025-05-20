import { cn } from "@/utils/cn";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";
import {
  Modal,
  View,
  Pressable,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";

type PickerOption = {
  value: string;
  label: string;
};

interface ModalPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect?: (value: string) => void;
  selectedValue?: string | null | number;
  options: PickerOption[];
  title: string;
}

export const ModalPicker: React.FC<ModalPickerProps> = ({
  visible,
  onClose,
  onSelect,
  selectedValue,
  options,
  title,
}) => {
  //    useEffect(() => {
  //         if (visible && options.length > 0 && !selectedValue) {
  //             onSelect(options[0].value);
  //         }
  //     }, [visible, options, selectedValue]);

  const safeSelectedValue = selectedValue !== null ? String(selectedValue) : "";
  const handleSlelect = (value: string) => {
    if (onSelect) {
      onSelect(value);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-slate-900/70 justify-end">
        <View className="bg-white max-h-[80%] p-5 rounded-t-3xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">{title}</Text>
            <Pressable onPress={onClose} className="px-4 py-2">
              <Text className="text-primary font-medium">Xong</Text>
            </Pressable>
          </View>

          <ScrollView className="max-h-[300px]">
            {Platform.OS === "ios" ? (
              <Picker
                selectedValue={safeSelectedValue}
                onValueChange={handleSlelect}
              >
                {options.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            ) : (
              <View>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    className={cn(
                      "py-3 border-b-[1px] border-[#EEEEEE]",
                      safeSelectedValue === option.value && "bg-[#E8F4F9]"
                    )}
                    onPress={() => handleSlelect(option.value)}
                  >
                    <Text className="text-base text-center text-[#333333]">
                      {option.label}
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
