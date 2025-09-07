export type Notification = {
  id: number;
  content: string;
  type: "ticket" | "message" | "validation" | "document";
  createdAt: string;
};
