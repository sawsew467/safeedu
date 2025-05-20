export interface Organization {
  province_id?: Province;
  _id: string;
  isActive?: boolean;
  name: string;
  province?: string;
  id: string;
  password: string;
  email: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}
export type Province = {
  isActive: boolean;
  name: string;
  _id: string;
};
