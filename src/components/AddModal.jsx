import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo as addTodoAPI } from "../request";
import {
  addTodo as addTodoAction,
  setLoading,
} from "../lib/redux-toolkit/slices/todo-slice";
import { closeAddModal } from "../lib/redux-toolkit/slices/modal-slice";
import { toast } from "sonner";

export default function AddModal() {
  const dispatch = useDispatch();
  const { addTodoOpen } = useSelector((state) => state.modal);
  const { token } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");

  if (!addTodoOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Iltimos, sarlavha kiriting");
      return;
    }
    dispatch(setLoading(true));
    try {
      const newTodo = { title, priority };
      const res = await addTodoAPI(token, newTodo);
      dispatch(addTodoAction(res.data)); // API dan kelayotgan yangi todo obyekti
      toast.success("Yangi todo qo'shildi");
      dispatch(closeAddModal());
      setTitle("");
      setPriority("low");
    } catch (e) {
      toast.error("Xatolik yuz berdi");
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Yangi Todo qo'shish</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Sarlavha"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="low">Past</option>
            <option value="medium">O‘rta</option>
            <option value="high">Yuqori</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => dispatch(closeAddModal())}
              className="px-4 py-2 border rounded"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Qo'shish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
