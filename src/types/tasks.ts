import { Status } from "./status";

export interface Tasks {
  id: number;
  name: string;
  category: string;
  status?: Status;
}
