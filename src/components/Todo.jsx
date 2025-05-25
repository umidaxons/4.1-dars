import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, getTodos } from "../request";
import { setLoading, setData } from "../lib/redux-toolkit/slices/todo-slice";
import { toast } from "sonner";

export default function Todo({ id, title, priority = "low", completed }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [delLoading, setDelLoading] = useState(false);

  const priorityStyles = {
    low: "text-green-600",
    medium: "text-yellow-600",
    high: "text-red-600",
  };

  async function handleDelete() {
    if (!token) {
      toast.error("Avval tizimga kiring");
      return;
    }

    setDelLoading(true);
    try {
      await deleteTodo(token, id);
      toast.success("Todo o'chirildi");

      dispatch(setLoading(true));
      const todos = await getTodos(token);
      dispatch(setData(todos));
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDelLoading(false);
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="border rounded p-4 flex justify-between items-center shadow-sm hover:shadow-md transition">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className={`uppercase font-medium ${priorityStyles[priority]}`}>
          Muhimlik: {priority}
        </p>
        <p>Holati: {completed ? "Bajarildi" : "Bajarilmadi"}</p>
      </div>

      <button
        onClick={handleDelete}
        disabled={delLoading}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {delLoading ? "O'chirilmoqda..." : "O'chirish"}
      </button>
    </div>
  );
}
