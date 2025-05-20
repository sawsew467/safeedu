"use client";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Toast from "react-native-toast-message";
import UploadImage from "@/components/ui/uploadImage";
import { useAddNewPictureMutation } from "@/services/competitions/competitions.api";

// Assuming you have a similar API hook for React Native

const formSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống" }),
  description: z.string().min(1, { message: "Mô tả không được để trống" }),
  picture: z.string().min(1, { message: "Ảnh bìa không được để trống" }),
});

type FormData = z.infer<typeof formSchema>;

const UploadMyPicture = ({
  isVisible,
  setVisible,
  quiz_id,
}: {
  isVisible: boolean;
  quiz_id: string;
  setVisible: (visible: boolean) => void;
}) => {
  const [uploadPicture, { isLoading }] = useAddNewPictureMutation();

  const handleClose = () => {
    setVisible(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      picture: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    Toast.show({
      type: "info",
      text1: "Đang thêm tranh",
      position: "bottom",
    });

    try {
      await uploadPicture({ ...values, quiz_id }).unwrap();
      Toast.show({
        type: "success",
        text1: "Thêm tranh thành công",
        position: "bottom",
      });
      handleClose();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Thêm tranh thất bại",
        position: "bottom",
      });
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Thêm tranh vẽ</Text>

          <ScrollView style={styles.formContainer}>
            <View style={styles.formField}>
              <Text style={styles.label}>Tên bức tranh</Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập tiêu đề"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              )}
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Mô tả</Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Nhập mô tả"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={3}
                  />
                )}
              />
              {errors.description && (
                <Text style={styles.errorText}>
                  {errors.description.message}
                </Text>
              )}
            </View>

            <View style={styles.formField}>
              <Text style={styles.label}>Tranh vẽ</Text>
              <Controller
                control={control}
                name="picture"
                render={({ field: { onChange, value } }) => (
                  <UploadImage
                    value={value}
                    onChange={onChange}
                    maxHeight={150}
                  />
                )}
              />
              {errors.picture && (
                <Text style={styles.errorText}>{errors.picture.message}</Text>
              )}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonSubmit]}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Nộp tranh</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxHeight: "80%",
  },
  formField: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 100,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#ef4444",
  },
  buttonSubmit: {
    backgroundColor: "#75A815",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default UploadMyPicture;
