import { cn } from "@/utils/cn";
import { Picker } from "@react-native-picker/picker";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type PickerOption = {
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
  const safeSelectedValue = selectedValue !== null ? String(selectedValue) : "";
  const opacity = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } else {
      opacity.value = 0;
    }
  }, [visible, opacity]);

  const closeModal = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    opacity.value = withTiming(0, { duration: 200 });
  }, [opacity]);

  const handleSlelect = (value: string) => {
    if (onSelect) {
      onSelect(value);
    }
    closeModal();
  };
  const handleSlelectIOS = (value: string) => {
    if (onSelect) {
      onSelect(value);
    }
  };

  const handleClose = () => {
    if (!selectedValue && options.length > 0) {
      onSelect?.(options[0].value);
    }
    closeModal();
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    if (scrollY === 0) {
      onClose();
    }
  };

  const handleScrollEndDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const velocity = event.nativeEvent.velocity?.y || 0;
    const scrollY = event.nativeEvent.contentOffset.y;

    if (scrollY < contentHeight * 0.7) {
      closeModal();
    } else {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }

    if (velocity < -0.5) {
      closeModal();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
      presentationStyle="overFullScreen"
    >
      <Animated.View
        style={[
          overlayStyle,
          { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
      >
        <ScrollView
          ref={scrollViewRef}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          onScrollEndDrag={handleScrollEndDrag}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeModal}
            className="h-screen"
          />

          <View
            className="bg-white rounded-t-3xl p-5"
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setContentHeight(height);
            }}
          >
            <View className="items-center mb-4">
              <View className="w-10 h-1 bg-gray-300 rounded-full" />
            </View>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">{title}</Text>
              <Pressable onPress={handleClose} className="px-4 py-2">
                <Text className="text-primary font-pmedium">Done</Text>
              </Pressable>
            </View>

            <ScrollView className="max-h-[300px]" nestedScrollEnabled={true}>
              {Platform.OS === "ios" ? (
                <Picker
                  selectedValue={safeSelectedValue}
                  onValueChange={handleSlelectIOS}
                  itemStyle={{ color: "black" }}
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
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};
