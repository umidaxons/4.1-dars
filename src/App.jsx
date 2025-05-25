import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "./request";
import {
  setData,
  setLoading,
  setError,
} from "./lib/redux-toolkit/slices/todo-slice";
import {/index.js
  openAddModal,
  openLoginModal,
} from "./lib/redux-toolkit/slices/modal-slice";
import Todo from "./components/Todo";
import AddModal from "./components/AddModal";
import LoginModal from "./components/LoginModal";
import { toast } from "sonner";

export default function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.todo);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) return;
    dispatch(setLoading(true));
    getTodos(token)
      .then((todos) => dispatch(setData(todos)))
      .catch((e) => {
        dispatch(setError(e.message));
        toast.error(e.message);
      })
      .finally(() => dispatch(setLoading(false)));
  }, [token]);

  function handleNewClick() {
    if (token) {
      dispatch(openAddModal());
    } else {
      dispatch(openLoginModal());
    }
  }

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-xl font-bold">Todo App</h1>
        <button
          onClick={handleNewClick}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          +NEW
        </button>
      </header>

      <main className="p-4">
        {loading && <p>Yuklanmoqda...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && data.length === 0 && <p>Todo yo'q</p>}
        <div className="space-y-3">
          {data.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </div>
      </main>

      <AddModal />
      <LoginModal />
    </>
  );
}
