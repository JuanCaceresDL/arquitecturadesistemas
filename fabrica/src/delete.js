import { TodoForm } from "./TodoForm";
import { useRouteMatch, useHistory } from "react-router-dom";
import { getTodo, updateTodo, deleteTodo } from "./api";

export const Delete = () => {
    const match = useRouteMatch()
    const history = useHistory()
  
    const deletet = async (data) => {
      await deleteTodo(data, match.params.id)
      history.push("/")
    }
  
    return (
        <button onClick={deletet}>borrar</button>
    );
  };
  