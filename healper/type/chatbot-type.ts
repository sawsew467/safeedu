export type TypeChat = {
  content: string;
  role: "user" | "assistant";
  id_message: string | undefined;
};
