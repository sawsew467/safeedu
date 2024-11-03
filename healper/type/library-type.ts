import { ImageSourcePropType } from "react-native";

export type LibraryDataType = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  subtitle: Array<{
    id: string;
    title: string;
    content: Array<string>;
    image: Array<ImageSourcePropType>;
    imageDescription: Array<string>;
  }>;
};
