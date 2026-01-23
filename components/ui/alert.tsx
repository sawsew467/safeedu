import { cn } from "@/utils/cn";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BackHandler,
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// Import frog image
const frogImage = require("@/assets/images/frog.png");

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

export interface AlertOptions {
  title?: string;
  message?: string;
  buttons?: AlertButton[];
  cancelable?: boolean;
  onDismiss?: () => void;
  shouldShowImage?: boolean;
}

interface AlertConfig extends AlertOptions {
  visible: boolean;
}

interface AlertContextType {
  alert: (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: Omit<AlertOptions, "title" | "message" | "buttons">
  ) => void;
  dismiss: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AlertConfig>({
    visible: false,
    title: "",
    message: "",
    buttons: [],
    cancelable: true,
    shouldShowImage: true,
  });

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  const dismiss = useCallback(() => {
    opacity.value = withTiming(0, { duration: 200 });
    scale.value = withTiming(0.9, { duration: 200 });

    setTimeout(() => {
      setConfig((prev) => ({ ...prev, visible: false }));
      config.onDismiss?.();
    }, 200);
  }, [config.onDismiss]);

  const alert = useCallback(
    (
      title: string,
      message?: string,
      buttons?: AlertButton[],
      options?: Omit<AlertOptions, "title" | "message" | "buttons">
    ) => {
      const defaultButtons: AlertButton[] = [
        {
          text: "OK",
          style: "default",
          onPress: () => dismiss(),
        },
      ];

      setConfig({
        visible: true,
        title,
        message,
        buttons: buttons || defaultButtons,
        cancelable: options?.cancelable ?? true,
        onDismiss: options?.onDismiss,
        shouldShowImage: options?.shouldShowImage ?? true,
      });

      // Animate in
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1, {
        damping: 50,
      });
    },
    [dismiss]
  );

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const alertStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleBackPress = useCallback(() => {
    if (config.visible && config.cancelable) {
      dismiss();
      return true;
    }
    return false;
  }, [config.visible, config.cancelable, dismiss]);

  useEffect(() => {
    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );
      return () => backHandler.remove();
    }
  }, [handleBackPress]);

  const handleButtonPress = (button: AlertButton) => {
    button.onPress?.();
    dismiss();
  };

  const handleOverlayPress = () => {
    if (config.cancelable) {
      dismiss();
    }
  };

  return (
    <AlertContext.Provider value={{ alert, dismiss }}>
      {children}

      <Modal
        transparent
        visible={config.visible}
        animationType="none"
        statusBarTranslucent
        onRequestClose={handleOverlayPress}
      >
        <Animated.View
          style={[
            overlayStyle,
            {
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleOverlayPress}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          <Animated.View
            style={[
              alertStyle,
              {
                width: "100%",
                maxWidth: 340,
              },
            ]}
          >
            <View className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              {/* Frog Image */}
              {config.shouldShowImage && (
                <View className="items-center justify-center pt-8 pb-4">
                  <Image
                    source={frogImage}
                    className="w-28 h-28"
                    resizeMode="contain"
                  />
                </View>
              )}

              {/* Content */}
              <View
                className={cn("px-6", config.shouldShowImage ? "pb-6" : "py-6")}
              >
                {/* Title */}
                {config.title && (
                  <Text className="font-pbold text-[22px] leading-[32px] text-gray-900 text-center mb-3">
                    {config.title}
                  </Text>
                )}

                {/* Message */}
                {config.message && (
                  <Text className="font-pregular text-[15px] text-center text-gray-600 leading-[22px]">
                    {config.message}
                  </Text>
                )}
              </View>

              {/* Buttons */}
              {config.buttons && config.buttons.length > 0 && (
                <View
                  className={cn(
                    "border-t border-gray-100",
                    config.buttons.length === 2 ? "flex-row" : "flex-col"
                  )}
                >
                  {config.buttons.map((button, index) => {
                    const isDestructive = button.style === "destructive";
                    const isCancel = button.style === "cancel";
                    const isLast = index === config.buttons!.length - 1;

                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleButtonPress(button)}
                        className={cn(
                          "py-4 px-4 items-center justify-center",
                          config.buttons!.length === 2 && "flex-1",
                          config.buttons!.length === 2 &&
                            index === 0 &&
                            "border-r border-gray-100",
                          config.buttons!.length > 2 &&
                            !isLast &&
                            "border-b border-gray-100"
                        )}
                        activeOpacity={0.7}
                      >
                        <Text
                          className={cn(
                            "text-[16px] font-psemibold",
                            isDestructive && "text-red-600",
                            isCancel && "text-gray-500",
                            !isDestructive && !isCancel && "text-primary"
                          )}
                        >
                          {button.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
}

export class Alert {
  private static contextRef: AlertContextType | null = null;

  static setContext(context: AlertContextType) {
    Alert.contextRef = context;
  }

  static alert(
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: Omit<AlertOptions, "title" | "message" | "buttons">
  ) {
    if (!Alert.contextRef) {
      console.warn(
        "Alert context not initialized. Did you forget to wrap your app with AlertProvider?"
      );
      return;
    }
    Alert.contextRef.alert(title, message, buttons, options);
  }

  static dismiss() {
    if (!Alert.contextRef) {
      console.warn("Alert context not initialized.");
      return;
    }
    Alert.contextRef.dismiss();
  }
}

// Component to initialize static context
export function AlertInitializer() {
  const alertContext = useAlert();

  useEffect(() => {
    Alert.setContext(alertContext);
  }, [alertContext]);

  return null;
}
