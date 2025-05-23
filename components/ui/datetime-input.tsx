import { cn } from "@/utils/cn";
import { useEffect, useState, useRef } from "react";
import {
  Modal,
  View,
  Pressable,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

type PickerOption = {
  value: string;
  label: string;
};

interface DateTimePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect?: (value: Date) => void;
  selectedValue?: Date;
  title: string;
}

const months = [
  { value: "0", label: "Tháng 1" },
  { value: "1", label: "Tháng 2" },
  { value: "2", label: "Tháng 3" },
  { value: "3", label: "Tháng 4" },
  { value: "4", label: "Tháng 5" },
  { value: "5", label: "Tháng 6" },
  { value: "6", label: "Tháng 7" },
  { value: "7", label: "Tháng 8" },
  { value: "8", label: "Tháng 9" },
  { value: "9", label: "Tháng 10" },
  { value: "10", label: "Tháng 11" },
  { value: "11", label: "Tháng 12" },
];

const days = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

const generateYears = (startYear = 1900) => {
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 10; // Include some future years
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => ({
    value: (startYear + i).toString(),
    label: (startYear + i).toString(),
  }));
};

const years = generateYears();
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;
const SCROLL_VIEW_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  visible,
  onClose,
  onSelect,
  selectedValue = new Date(),
  title,
}) => {
  const [selectedDate, setSelectedDate] = useState(selectedValue || new Date());
  const monthScrollRef = useRef<ScrollView>(null);
  const dayScrollRef = useRef<ScrollView>(null);
  const yearScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!selectedValue) {
      setSelectedDate(new Date());
    }
  }, [selectedValue]);

  console.log("selectedValue", selectedValue);

  useEffect(() => {
    let timer;
    if (visible) {
      const curentSelectDate = selectedValue || new Date();

      setSelectedDate(curentSelectDate);

      // Scroll to the selected values when modal opens
      scrollToSelectedValues(curentSelectDate);
    }
    return () => {
      clearTimeout(timer);
      monthScrollRef.current?.scrollTo({ y: 0, animated: false });
      dayScrollRef.current?.scrollTo({ y: 0, animated: false });
      yearScrollRef.current?.scrollTo({ y: 0, animated: false });
    };
  }, [visible]);

  const scrollToSelectedValues = (date: Date) => {
    const selectedMonth = date.getMonth();
    const selectedDay = date.getDate() - 1; // 0-based index
    const selectedYear = years.findIndex(
      (y) => y.value === date.getFullYear().toString()
    );

    monthScrollRef.current?.scrollTo({
      y: selectedMonth * ITEM_HEIGHT,
      animated: true,
    });

    dayScrollRef.current?.scrollTo({
      y: selectedDay * ITEM_HEIGHT,
      animated: true,
    });

    yearScrollRef.current?.scrollTo({
      y: selectedYear * ITEM_HEIGHT,
      animated: true,
    });
  };

  const handleScroll = (
    scrollView: "month" | "day" | "year",
    event: { nativeEvent: { contentOffset: { y: number } } }
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);

    const newDate = new Date(selectedDate);

    if (scrollView === "month" && index >= 0 && index < months.length) {
      newDate.setMonth(parseInt(months[index].value));

      // Adjust day if the new month doesn't have enough days
      const maxDays = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0
      ).getDate();

      if (newDate.getDate() > maxDays) {
        newDate.setDate(maxDays);
      }
    } else if (scrollView === "day" && index >= 0 && index < days.length) {
      const day = parseInt(days[index].value);
      const maxDays = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0
      ).getDate();

      newDate.setDate(Math.min(day, maxDays));
    } else if (scrollView === "year" && index >= 0 && index < years.length) {
      newDate.setFullYear(parseInt(years[index].value));
    }

    setSelectedDate(newDate);
  };

  const handleScrollEnd = (
    scrollView: "month" | "day" | "year",
    event: { nativeEvent: { contentOffset: { y: number } } }
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);

    // Snap to the closest item
    if (scrollView === "month" && monthScrollRef.current) {
      monthScrollRef.current.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: true,
      });
    } else if (scrollView === "day" && dayScrollRef.current) {
      dayScrollRef.current.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: true,
      });
    } else if (scrollView === "year" && yearScrollRef.current) {
      yearScrollRef.current.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: true,
      });
    }
  };

  const handleConfirm = () => {
    if (onSelect) {
      onSelect(selectedDate);
    }
    onClose();
  };

  const renderPickerItems = (
    items: PickerOption[],
    scrollViewRef: React.RefObject<ScrollView>,
    scrollViewType: "month" | "day" | "year"
  ) => {
    return (
      <View style={styles.pickerColumn}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="normal"
          contentContainerStyle={{
            paddingVertical: ITEM_HEIGHT,
          }}
          onScroll={(e) => handleScroll(scrollViewType, e)}
          onMomentumScrollEnd={(e) => handleScrollEnd(scrollViewType, e)}
          scrollEventThrottle={16}
          style={{ height: SCROLL_VIEW_HEIGHT }}
        >
          {items.map((item) => (
            <View key={item.value} style={styles.pickerItem}>
              <Text style={styles.pickerItemText} className="font-pmedium">
                {item.label}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.pickerWrapper}>
            {renderPickerItems(days, dayScrollRef, "day")}
            {renderPickerItems(months, monthScrollRef, "month")}
            {renderPickerItems(years, yearScrollRef, "year")}

            {/* Highlight selected row */}
            <View style={styles.selectionHighlight} />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={styles.button}>
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    maxWidth: 350,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  pickerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    position: "relative",
  },
  pickerColumn: {
    flex: 1,
    alignItems: "center",
  },
  pickerItem: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerItemText: {
    fontSize: 16,
  },
  selectionHighlight: {
    position: "absolute",
    top: "33.33%",
    left: 0,
    right: 0,
    height: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "transparent",
    pointerEvents: "none",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#75A815", // Facebook blue
  },
});
