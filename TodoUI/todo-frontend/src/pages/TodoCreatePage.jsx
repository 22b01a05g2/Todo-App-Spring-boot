import { useState } from "react";
import { createTodo } from "../api/todoApi";
import { useToast } from "../components/ToastProvider";

export default function TodoCreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { showToast } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createTodo({ title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
      showToast("Todo created successfully ✅", "success");
    } catch (err) {
      const msg =
        err?.response?.data?.fields?.title ||
        err?.response?.data?.message ||
        "Failed to create todo";
      showToast(msg, "error");
    }
  };

  return (
    <div className="card">
      <h2>Create Todo</h2>
      <p className="muted">Add a new task to your list.</p>

      <form onSubmit={submit} className="form">
        <label className="label">
          Title <span className="req">*</span>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label className="label">
          Description
          <textarea
            className="input"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button className="btn btnPrimary" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
