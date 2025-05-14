import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import search from "@/assets/icons/search.png";
const SearchInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  const HandleInputSearch = (e) => {
    e.persist();
    setValue(e?.nativeEvent?.text);
  };
  return (
    <View
      style={style.search}
      className="w-full h-12 shadow-md bg-white rounded-full flex-row flex  px-4 py-1 items-center"
    >
      <Image source={search} className="w-6 aspect-square mr-2" />
      <TextInput
        onChange={HandleInputSearch}
        value={value}
        className="w-11/12 h-full text-sm font-normal"
        placeholder="Tìm kiếm"
      />
    </View>
  );
};
const style = StyleSheet.create({
  search: {
    backgroundColor: "#fff", // Add background color for better shadow visibility
    padding: 16, // Adjust padding or size as needed

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
});

export default SearchInput;
