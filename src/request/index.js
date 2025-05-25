const baseURL = import.meta.env.VITE_BASE_URL || "https://json-api.uz/api/project/fn37";

export async function addTodo(todo) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token topilmadi, iltimos login qiling");
  }

  const req = await fetch(baseURL + "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });

  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Abdulloh xato qildi");
  }
}
