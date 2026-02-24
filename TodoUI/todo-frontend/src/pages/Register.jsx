import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/todoApi";
import AuthLayout from "../layout/AuthLayout";
import { useToast } from "../components/ToastProvider";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await registerUser({ username: username.trim(), password });
      showToast("Registration successful. Please login.", "success");
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed";
      setError(msg);
      showToast(msg, "error");
    }
  };

  return (
    <AuthLayout>
      <h2 className="authTitle">Create Account</h2>
      <p className="authHint">Register to manage your personal todo list.</p>

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
          Register
        </button>
      </form>

      <div className="authFooter">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </AuthLayout>
  );
}