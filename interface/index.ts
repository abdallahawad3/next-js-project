export interface ITodo {
  id: string;
  title: string;
  body: string | null;
  completed: boolean | null;
  createdAt: Date | null;
}
