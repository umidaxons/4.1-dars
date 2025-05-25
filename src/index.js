const baseURL = import.meta.env.VITE_BASE_URL;

// Login API
export async function loginUser({ username, password }) {
  const res = await fetch(baseURL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login muvaffaqiyatsiz");
  return res.json();
}

// Todos olish
export async function getTodos(token) {
  const res = await fetch(baseURL + "/todos", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Todos olishda xato");
  const result = await res.json();
  return result.data;
}

// Todo qo'shish
export async function addTodo(token, todo) {
  const res = await fetch(baseURL + "/todos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!res.ok) throw new Error("Todo qo'shishda xato");
  return res.json();
}

// Todo o'chirish
export async function deleteTodo(token, id) {
  const res = await fetch(baseURL + "/todos/" + id, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Todo o'chirishda xato");
  return id;
}
