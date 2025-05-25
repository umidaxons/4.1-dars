import Todo from "./Todo.jsx";
import Loading from "./Loading.jsx";
import { useSelector } from "react-redux";

export default function Todos() {
  const { data, loading, error } = useSelector(state => state.todo);
  const { token } = useSelector(state => state.auth);

  if (!token) return <p className="pt-[116px] text-center">Iltimos, avval tizimga kiring</p>;

  if (loading) return <Loading />;
  if (error) return <p className="pt-[116px] text-center text-red-600">{error}</p>;

  if (!data.length) return <p className="pt-[116px] text-center">Todo topilmadi</p>;

  return (
    <div className="flex flex-col gap-5 container mx-auto px-5 pb-10 pt-[116px]">
      {data.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
}
