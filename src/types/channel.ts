import { User } from "./user";

export type Channel = {
  id: string;
  description: string;
  interlocutors: User[];
  type: "private" | "group";
};
