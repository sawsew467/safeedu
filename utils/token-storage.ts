import * as Keychain from "react-native-keychain";

export const getToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  console.log("credentials", credentials);

  if (!credentials) {
    return null;
  }

  return credentials.password;
};

export const getRefreshToken = async () => {
  const credentials = await Keychain.getGenericPassword({
    service: "refresh_token",
  });

  if (!credentials) {
    return null;
  }

  return credentials.password;
};

export const saveTokenToStorage = async ({
  acessToken,
  refreshToken,
}: {
  acessToken: string;
  refreshToken: string;
}) => {
  await Keychain.setGenericPassword("access_token", acessToken);
  await Keychain.setGenericPassword("refresh_token", refreshToken, {
    service: "refresh_token",
  });
};

export const removeTokens = async () => {
  try {
    await Keychain.resetGenericPassword();
    await Keychain.resetGenericPassword({ service: "refresh_token" });
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
