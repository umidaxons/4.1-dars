import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../request";
import { loginStart, loginSuccess, loginFailure } from "../lib/redux-toolkit/slices/auth-slice";
import { closeLoginModal } from "../lib/redux-toolkit/slices/modal-slice";
import { toast } from "sonner";

export default function LoginModal() {
  const dispatch = useDispatch();
  const { loginOpen } = useSelector(state => state.modal);
  const { loading } = useSelector(state => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!loginOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const data = await loginUser({ username, password });
      localStorage.setItem("token", data.token);
      dispatch(loginSuccess({ token: data.token, user: data.user }));
      toast.success("Muvaffaqiyatli ro'yxatdan o'tildi");
      dispatch(closeLoginModal());
      setUsername("");
      setPassword("");
    } catch (e) {
      dispatch(loginFailure(e.message));
      toast.error("Ro'yxatdan o'tishda xatolik");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-md shadow-md max-w-md w-full"
      >
        <h2 className="text-xl font-semibold mb-4">Tizimga kirish</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => dispatch(closeLoginModal())}
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Yuklanmoqda..." : "Kirish"}
          </button>
        </div>
      </form>
    </div>
  );
}
