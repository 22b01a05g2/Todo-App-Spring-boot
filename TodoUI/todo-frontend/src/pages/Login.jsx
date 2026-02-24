import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/todoApi";
import { setToken } from "../auth/auth";
import AuthLayout from "../layout/AuthLayout";
import { useToast } from "../components/ToastProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await loginUser({ username: username.trim(), password });
      setToken(res.data.token);
      showToast("Login successful!", "success");
      navigate("/create"); // ✅ after login show create page
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
      showToast(msg, "error");
    }
  };

  return (
    <AuthLayout>
      <h2 className="authTitle">Welcome Back</h2>
      <p className="authHint">Login to access your todos.</p>

      {error && <div className="error">{error}</div>}

      <form onSubmit={submit} className="form">
        <label className="label">
          Username
          <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>

        <label className="label">
          Password
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button className="btn btnPrimary full" type="submit">
          Login
        </button>
      </form>

      <div className="authFooter">
        New user? <Link to="/register">Register</Link>
      </div>
    </AuthLayout>
  );
}