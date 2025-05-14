import { Topic } from "./topic.type";

export type TypeNews = {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  isActive: boolean;
  topic_id: Topic;
  updated_at: Date;
  created_at: Date;
};
