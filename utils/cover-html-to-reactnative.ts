import { Dimensions } from "react-native";

const convertPercentageToPixel = (
  percentage: string,
  containerWidth: number
): string => {
  const percentValue = parseFloat(percentage.replace("%", ""));
  const pixelValue = (percentValue / 100) * containerWidth;
  return `${Math.round(pixelValue)}px`;
};

const coverHTMLToReactNative = (data: string) => {
  const width = Dimensions.get("window").width;
  let newHTMLString = data.replace(/style="([^"]*)"/g, (match, style) => {
    let newStyle = style;

    const widthMatch = style.match(/width:\s*([0-9\.]+)%/);

    if (widthMatch) {
      const newWidth = convertPercentageToPixel(widthMatch[1], width);
      newStyle = `width: ${newWidth}; margin: 0`;
    }

    return `style="${newStyle}"`;
  });
  newHTMLString = newHTMLString.replace(/<br\s*\/?>/g, "\n");
  return newHTMLString;
};

export { coverHTMLToReactNative };
