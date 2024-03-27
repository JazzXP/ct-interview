import { v4 as uuid } from "uuid";

export interface Task {
  id: string;
  title: string;
  description: string;
  complete: boolean;
}

export const createTask = (title: string, description: string) => ({
  id: uuid(),
  title,
  description,
  complete: false,
});
