import { Topic } from "./topic.type";

export type TypeLibrary = {
  _id: string;
  category_name: string;
  description: string;
  image: string;
  author: string;
  isActive: boolean;
  topic_id: string;
  updated_at: Date;
  view: number;
  created_at: Date;
};
