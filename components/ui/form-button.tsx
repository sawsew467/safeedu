import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface FormButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  disabled?: boolean;
}

const FormButton = ({
  title,
  onPress,
  variant = "primary",
  isLoading = false,
  disabled = false,
}: FormButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" ? styles.secondaryButton : styles.primaryButton,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "secondary" ? "#8BC34A" : "#FFFFFF"}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            variant === "secondary"
              ? styles.secondaryButtonText
              : styles.primaryButtonText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: "#8BC34A",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#8BC34A",
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
    borderColor: "#CCCCCC",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButtonText: {
    color: "#FFFFFF",
  },
  secondaryButtonText: {
    color: "#8BC34A",
  },
});

export default FormButton;
