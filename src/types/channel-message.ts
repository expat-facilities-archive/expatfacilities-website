import { Channel } from "./channel";
import { User } from "./user";

export type ChannelMessage = {
  id: string;
  channel: Channel | string;
  sender: User;
  content: string;
  attachements: Attachement[];
  updatedAt: string;
  createdAt: string;
};

export type UnsentChannelMessage = {
  channelId: string;
  sender: User;
  content: string;
  attachements: Attachement[];
};

export type Attachement = {
  type: string;
  url: string;
};
