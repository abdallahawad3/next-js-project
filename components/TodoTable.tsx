import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import type { ITodo } from "@/interface";
import TodosActions from "./TodosActions";

interface IProps {
  todos: ITodo[];
}

const TodoTable = ({ todos }: IProps) => {
  return (
    <Table className="container">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">{todo.id}</TableCell>
            <TableCell>{todo.title.slice(0, 10)}</TableCell>
            <TableCell>
              {todo.completed ? (
                <Badge variant={"default"}>completed</Badge>
              ) : (
                <Badge variant={"secondary"}>uncompleted</Badge>
              )}
            </TableCell>
            <TableCell>{todo.createdAt?.toDateString()}</TableCell>
            <TableCell className="flex items-center gap-5">
              <TodosActions id={todo.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TodoTable;
