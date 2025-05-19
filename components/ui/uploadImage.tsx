"use client";

import { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useUploadImageMutation } from "@/services/upload/api.upload";

interface UploadImageProps {
  value: string;
  onChange: (value: string) => void;
  maxHeight?: number;
}

const UploadImage = ({
  value,
  onChange,
  maxHeight = 200,
}: UploadImageProps) => {
  const [uploadImage, { isLoading }] = useUploadImageMutation();

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Cần quyền truy cập thư viện ảnh để tiếp tục!");
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });
      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        // Check if the image is a valid file
        if (!asset.uri) {
          alert("Không tìm thấy ảnh");
          return;
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
      alert("Có lỗi xảy ra khi chọn ảnh");
    }
  };

  return (
    <View style={styles.container}>
      {value ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: value }}
            style={[styles.image, { maxHeight }]}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onChange("")}
          >
            <Ionicons name="close-circle" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.uploadButton, { height: maxHeight }]}
          onPress={pickImage}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.uploadText}>Đang tải...</Text>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={24} color="#666" />
              <Text style={styles.uploadText}>Tải ảnh lên</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    minHeight: 150,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 12,
  },
  uploadButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  uploadText: {
    marginTop: 8,
    color: "#666",
  },
});

export default UploadImage;
function alert(arg0: string) {
  throw new Error("Function not implemented.");
}
