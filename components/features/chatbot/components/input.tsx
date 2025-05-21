import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import file_upload from "@/assets/icons/file_upload.png";
import mic from "@/assets/icons/mic.png";
import delete_icon from "@/assets/icons/delete_icon.png";
import submit from "@/assets/icons/submit.png";
// import * as ImagePicker from "expo-image-picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import stylesAndroid from "@/components/ui/SafeViewAndroid";

type TypeInput = {
  handleSubmit: (content: string) => void;
};
function Input({ handleSubmit }: TypeInput) {
  const [value, setTestValue] = React.useState<string>("");
  const handleChange = (e: string) => {
    setTestValue(e);
  };

  const handleDeleteImage = (index: number) => {
    const newFiles = files.toSpliced(index, 1);
    setFile(newFiles);
  };
  const handleLoading = (index: number) => {
    const newFiles = files.toSpliced(index, 1, {
      isLoading: false,
      uri: files[index]?.uri,
    });
    setFile(newFiles);
  };
  const handleClick = () => {
    setTestValue("");
    handleSubmit(value.trim());
  };

  const [files, setFile] = useState([]);

  const [error, setError] = useState(null);

  // const pickImage = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (status !== "granted") {
  //     Alert.alert(
  //       "Permission Denied",
  //       `Sorry, we need camera
  //              roll permission to upload images.`
  //     );
  //   } else {
  //     const result = await ImagePicker.launchImageLibraryAsync();

  //     if (!result.canceled) {
  //       setFile([...files, { isLoading: true, uri: result.assets[0].uri }]);

  //       setError(null);
  //     }
  //   }
  // };

  return (
    <View>
      <View style={styles.container_input}>
        <View style={[files.length !== 0 && styles.container_input_image]}>
          {files.length !== 0 && (
            <FlatList
              horizontal
              contentContainerStyle={styles.file_container}
              data={files}
              keyExtractor={(file) => file?.uri}
              renderItem={({ item, index }) => (
                <View key={item?.uri} style={styles.imageContainer}>
                  {item?.isLoading && (
                    <View style={styles.container_loading_image}>
                      <ActivityIndicator
                        style={styles.loading_image}
                        size="large"
                        color="##75A815"
                      />
                    </View>
                  )}
                  <>
                    <Image
                      source={{ uri: item?.uri }}
                      style={styles.image}
                      onLoad={() => handleLoading(index)}
                    />
                    <TouchableOpacity
                      onPress={() => handleDeleteImage(index)}
                      style={styles.btn_delete_image}
                    >
                      <Image source={delete_icon} style={styles.delete_image} />
                    </TouchableOpacity>
                  </>
                </View>
              )}
            />
          )}
          <View
            style={[
              styles.input,
              files.length !== 0 ? styles.has_image : styles.not_has_image,
            ]}
          >
            <View style={styles.control_input}>
              {/* <TouchableOpacity
                disabled={files.some((file) => file.isLoading)}
                style={styles.btn_upload}
                onPress={pickImage}
              >
                <MaterialIcons name="upload-file" size={28} color="#7E7E7EE5" />
              </TouchableOpacity> */}
              <View style={styles.conteiner_text_input}>
                <TextInput
                  multiline={true}
                  onChangeText={handleChange}
                  value={value}
                  placeholder="Nhập câu hỏi..."
                  style={styles.text_input}
                />
              </View>
              {/* <TouchableOpacity style={styles.mic}>
                <Fontisto name="mic" size={24} color="#757575" />
              </TouchableOpacity> */}
              <TouchableOpacity
                disabled={value.trim() === ""}
                onPress={handleClick}
              >
                <FontAwesome6
                  name="circle-arrow-up"
                  size={30}
                  color={value.trim() === "" ? "#7E7E7EE5" : "#2d2d2de3"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Text style={styles.comment} className="font-pregular">
          Trợ lý AI có thể nhầm lẫn, hãy cẩn thận nhé!
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner_text_input: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    flex: 1,
  },
  container_loading_image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    zIndex: 999,
  },
  loading_image: {},
  file_container: {
    paddingHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    flexGrow: 0,
    overflow: "scroll",
    paddingBottom: 8,
  },
  delete_image: {
    width: 25,
    height: 25,
  },
  btn_delete_image: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 25,
    height: 25,
    zIndex: 99,
  },
  not_has_image: {
    borderRadius: 999,
  },
  has_image: {
    borderRadius: 0,
    borderWidth: 0,
    borderTopWidth: 1,
  },
  container_input_image: {
    display: "flex",
    borderWidth: 1,
    gap: 10,
    paddingTop: 8,
    borderRadius: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  imageContainer: {
    position: "relative",
    width: 80,
    backgroundColor: "#0000004d",
    borderRadius: 16,
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  submit: {
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 999,
  },
  mic: {
    width: 20,
  },
  text_input: {},
  btn_upload: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28,
  },
  control_input: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    gap: 12,
    alignItems: "center",
    paddingLeft: 20,
  },
  container_input: {
    display: "flex",
    gap: 0,
    minHeight: 80,
    paddingHorizontal: 16,
    zIndex: 99,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#959494CC",
    minHeight: 40,
    maxHeight: 80,
    width: "100%",
    paddingRight: 8,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  comment: {
    textAlign: "center",
    color: "#161717",
    marginTop: 4,
    fontSize: 14,
  },
});

export default Input;
