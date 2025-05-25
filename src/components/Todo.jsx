import { useDispatch, useSelector } from "react-redux";
import { deleteTodo as deleteTodoAPI } from "../request";
import { deleteTodo as deleteTodoAction, setLoading } from "../lib/redux-toolkit/slices/todo-slice";
import { toast } from "sonner";

export default function Todo({ id, title, completed, priority }) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  async function handleDelete() {
    if (!token) return toast.error("Avval tizimga kiring");
    dispatch(setLoading(true));
    try {
      await deleteTodoAPI(token, id);
      dispatch(deleteTodoAction(id));
      toast.success("Todo o'chirildi");
    } catch (e) {
      toast.error("Xatolik yuz berdi");
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="border rounded p-3 shadow flex justify-between items-center max-w-xl mx-auto">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">Priority: {priority}</p>
      </div>
      <div>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800"
        >
          O'chirish
        </button>
      </div>
    </div>
  );
}
