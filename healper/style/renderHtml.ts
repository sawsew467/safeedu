import { StyleSheet } from "react-native";

export const styles_mardown = StyleSheet.create({
  p: {
    margin: 0,
    marginTop: 10,
    minHeight: 0,
  },
  br: {
    lineHeight: 0,
  },
  ["ql-bold"]: { fontWeight: "bold" }, // Chữ đậm
  ["ql-italic"]: { fontStyle: "italic" }, // Chữ nghiêng
  ["ql-underline"]: { textDecorationLine: "underline" }, // Gạch chân
  ["ql-strike"]: { textDecorationLine: "line-through" }, // Gạch ngang

  // Text Alignment (Căn chỉnh văn bản)
  ["ql-align-left"]: {
    display: "flex",
    justifyContent: "flex-start",
    marginRight: 10,
  },
  ["ql-align-center"]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  ["ql-align-right"]: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  ["ql-align-justify"]: { textAlign: "justify" },

  // Font Size (Cỡ chữ)
  ["ql-size-small"]: { fontSize: 12 },
  ["ql-size-normal"]: { fontSize: 16 },
  ["ql-size-large"]: { fontSize: 20 },
  ["ql-size-huge"]: { fontSize: 24 },

  // Font Family (Phông chữ)
  ["ql-font-serif"]: { fontFamily: "'Times New Roman', serif" },
  ["ql-font-monospace"]: { fontFamily: "'Courier New', monospace" },

  // Blockquote & Code Block (Trích dẫn & Khối mã)
  ["ql-blockquote"]: {
    borderLeftWidth: 4,
    borderLeftColor: "#ccc",
    paddingLeft: 10,
    color: "#666",
  },
  ["ql-code-block"]: {
    backgroundColor: "#f4f4f4",
    fontFamily: "'Courier New', monospace",
    padding: 10,
    borderRadius: 5,
  },

  // Links & Images (Liên kết & Hình ảnh)
  ["ql-link"]: { color: "blue", textDecorationLine: "underline" },
  ["ql-image"]: { maxWidth: "100%", height: "auto" },

  // Divider (Ngắt dòng)
  ["ql-divider"]: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginVertical: 10,
  },
});
