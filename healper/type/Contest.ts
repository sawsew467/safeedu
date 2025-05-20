import { Citizens, Student } from "./user-type";

export type TypeDetailDrawData = {
  id: string;
  title: string;
  image: any;
  author: string;
  dobAuthor: string;
  type: string;
  desc: string;
};
export type TypeLeaderBoard = {
  name: string;
  avatar: any;
  point: string;
};

export enum QuizzType {
  SingleChoice = "Phần thi lý thuyết",
  PaintingPropaganda = "Vẽ tranh cổ động",
  // SocialThinking = "Nghĩ luận xã hội",
  // Practical = "Phần thi thực hành",
}

export interface Quizz {
  _id: string;
  title: string;
  type: QuizzType;
  slug: string;
  isActive: boolean;
  status: string;
  competitionId: string[];
}

export interface Competitions {
  _id: string;
  isActive: boolean;
  deleted_at: string;
  deleted_by: string | null;
  created_by: string | null;
  update_by: string | null;
  title: string;
  number_join: number;
  description: string;
  startDate: string;
  endDate: string;
  image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  slug: string;
  id: string;
}

export type Picture = {
  _id: string;
  isActive: boolean;
  deleted_at: string | null;
  deleted_by: string | null;
  created_by: string | null;
  update_by: string | null;
  picture: string;
  name: string;
  description: string;
  user_id: Student | Citizens;
  quiz_id: Quizz;
  startedAt: string;
  completedAt: string;
  created_at: string;
  updatedAt: string;
  score?: number | null;
  feedback: string | null;
  quiz_result_id?: string;
  __v: number;
  id: string;
};

export type CommentType = {
  _id: string;
  isActive: boolean;
  deleted_at: string | null;
  deleted_by: string | null;
  created_by: string | null;
  update_by: string | null;
  content: string;
  user_id: Student | Citizens;
  quiz_result_id: string;
  quiz_id: Quizz;
  created_at: string;
  updated_at: string;
  __v: number;
  id: string;
  picture_id: string;
  picture: Picture;
  quiz_result: string;
  quiz: string;
};
