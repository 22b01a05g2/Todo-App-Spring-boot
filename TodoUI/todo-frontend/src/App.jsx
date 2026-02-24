import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { clearToken } from "./auth/auth";

import AppLayout from "./layout/AppLayout";
import TodoCreatePage from "./pages/TodoCreatePage";
import TodoListPage from "./pages/TodoListPage";

export default function App() {
  const [filter, setFilter] = useState("all"); // all | true | false
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <AppLayout onLogout={logout} filter={filter} setFilter={setFilter}>
      <Routes>
        <Route path="/" element={<Navigate to="/create" replace />} />
        <Route path="/create" element={<TodoCreatePage />} />
        <Route path="/todos" element={<TodoListPage filter={filter} />} />
      </Routes>
    </AppLayout>
  );
}