import React from "react";
import { StyleSheet, Text, View, Keyboard, Image, TouchableOpacity, TextInput, Dimensions } from "react-native";
import file_upload from "@/assets/icons/file_upload.png"
import mic from "@/assets/icons/mic.png"
import submit from "@/assets/icons/submit.png"
type TypeInput = {
  setValue: (value: string) => void,
  handleSubmit: () => void
}
function Input({ setValue, handleSubmit }: TypeInput) {
  const value = React.useRef('');
  const handleChange = (e: string) => {
    value.current = e;
  }
  const handleClick = () => {
    setValue(value.current);
    handleSubmit();
  }

  return <View style={styles.container_input}>
    <View style={styles.input}>
      <View style={styles.control_input}>
        <TouchableOpacity style={styles.btn_upload}>
          <Image source={file_upload} style={{ width: 28, height: 28 }} />
        </TouchableOpacity>
        <TextInput
          blurOnSubmit={false}
          multiline={true}
          onChangeText={handleChange}
          placeholder="Nhập câu hỏi..." style={styles.text_input} />
        <TouchableOpacity style={styles.mic}>
          <Image source={mic} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.submit} onPress={handleClick} >
          <Image source={submit} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
    <Text style={styles.comment} className="font-pregular">Trợ lý AI có thể nhầm lẫn, hãy cẩn thận nhé!</Text>
  </View>;
}

const styles = StyleSheet.create({
  submit: {
    padding: 10,
    borderRadius: 999,
    backgroundColor: "#7E7E7EE5"
  },
  mic: {
    width: 20
  },
  text_input: {
    height: "100%",
    flex: 1,
  },
  btn_upload: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28
  },
  control_input: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    gap: 12,
    alignItems: "center",
    paddingLeft: 20
  },
  container_input: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 16,
    zIndex: 99
  },
  input: {
    borderWidth: 1,
    borderColor: "#959494CC",
    height: 60,
    width: "100%",
    borderRadius: 999,
    paddingRight: 8,
    display: "flex",
    flexDirection: "row",
    gap: 10
  },
  comment: {
    textAlign: "center",
    color: "#161717",
    marginTop: 10,
    fontSize: 14
  }
})

export default Input;
