import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { getTodos } from "../request";
import Loading from "./Loading";
import Todo from "./Todo";
import { setData, setLoading, setError } from "../lib/redux-toolkit/slices/todo-slice";

export default function Todos() {
  const { data, filter, loading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTodos() {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const todos = await getTodos(filter);
        dispatch(setData(todos));
      } catch (err) {
        toast.error(err.message);
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchTodos();
  }, [JSON.stringify(filter), dispatch]);

  if (loading) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <p>Ma'lumot mavjud emas</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 pb-10 pt-[116px] flex flex-col gap-5">
      {data.map(({ id, title, priority, completed }) => (
        <Todo
          key={id}
          id={id}
          title={title}
          priority={priority}
          completed={completed}
        />
      ))}
    </div>
  );
}
