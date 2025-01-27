export interface ITodo {
  id: string;
  title: string;
  body: string | undefined;
  completed: boolean | undefined;
  createdAt: Date | undefined;
}
