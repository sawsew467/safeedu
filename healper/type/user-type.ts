import { Organization } from "./Organization";

export type Student = {
  first_name: string;
  last_name: string;
  full_name: string;
  username: string;
  phone_number: string;
  organizationId: Organization[];
  avatar: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "Other";
  current_refresh_token: string;
  achievements: Array<any>;
  registration_competition: Array<any>;
  _id: string;
  id: string;
  isActive: boolean;
  deleted_at: string;
  deleted_by: string;
  created_by: string;
  update_by: string;
};

export type Citizens = {
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number: string;
  organizationId: Organization;
  username: string;
  avatar: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "Other";
  current_refresh_token: string;
  achievements: Array<any>;
  registration_competition: Array<any>;
  _id: string;
  id: string;
  isActive: boolean;
  deleted_at: string;
  deleted_by: string;
  created_by: string;
  update_by: string;
};
