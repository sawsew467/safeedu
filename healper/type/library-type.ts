import { ImageSourcePropType } from "react-native";

export type LibraryDataType = {
  id: string;
  title: string;
  content: Array<{
    id: string;
    content: string;
    image: ImageSourcePropType;
    imageDescription: string;
  }>;
  image: ImageSourcePropType;
};
