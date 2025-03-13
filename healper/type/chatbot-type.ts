export type TypeChat = {
  content: string;
  role: "user" | "chatbot";
  id_message: string | undefined;
};
