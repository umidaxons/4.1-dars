import { useState } from "react";
import { toast } from "sonner";

export default function LoginModal({ open, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://json-api.uz/api/project/fn37/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // Tokenni localStorage ga saqlash
        localStorage.setItem("token", data.token);
        toast.success("Ro'yhat topildi");
        onLoginSuccess();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Ro'yhat topilmadi");
      }
    } catch (error) {
      toast.error("Server bilan aloqa yo'q");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Kirish..." : "Kirish"}
          </button>
        </form>
        <button
          onClick={() => {
            onClose();
            window.location.href = "/register";
          }}
          className="mt-4 text-blue-600 underline"
          disabled={loading}
        >
          Ro'yhatdan o'tish
        </button>
        <button
          onClick={onClose}
          className="mt-2 text-gray-500 hover:text-gray-800"
          disabled={loading}
        >
          Bekor qilish
        </button>
      </div>
    </div>
  );
}
