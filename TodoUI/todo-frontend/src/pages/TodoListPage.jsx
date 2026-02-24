import { useEffect, useState } from "react";
import { deleteTodo, getTodos, updateTodo } from "../api/todoApi";
import { useToast } from "../components/ToastProvider";

function TodoRow({ todo, onToggle, onDelete, onSave }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const startEdit = () => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setEditing(true);
  };

  const save = () => {
    onSave(todo.id, { title: title.trim(), description: description.trim(), completed: todo.completed });
    setEditing(false);
  };

  return (
    <div className={`todoRow ${todo.completed ? "done" : ""}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)} />

      <div className="todoBody">
        {!editing ? (
          <>
            <div className="todoTitle">{todo.title}</div>
            {todo.description && <div className="todoDesc">{todo.description}</div>}
            <div className="todoMeta">
              {todo.createdAt ? `Created: ${new Date(todo.createdAt).toLocaleString()}` : ""}
            </div>
          </>
        ) : (
          <div className="editBox">
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea
              className="input"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="todoActions">
        {!editing ? (
          <>
            <button className="btn" onClick={startEdit} type="button">
              Edit
            </button>
            <button className="btn btnDanger" onClick={() => onDelete(todo.id)} type="button">
              Delete
            </button>
          </>
        ) : (
          <>
            <button className="btn btnPrimary" onClick={save} type="button">
              Save
            </button>
            <button className="btn" onClick={() => setEditing(false)} type="button">
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function TodoListPage({ filter }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await getTodos(filter);
      const cleaned = (res.data || []).map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        completed: t.completed,
        createdAt: t.createdAt,
      }));
      setTodos(cleaned);
    } catch (err) {
      showToast("Failed to load todos", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const onToggle = async (todo) => {
    try {
      await updateTodo(todo.id, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      });
      showToast("Todo updated ✅", "success");
      await load();
    } catch {
      showToast("Failed to update todo", "error");
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteTodo(id);
      showToast("Todo deleted ✅", "success");
      await load();
    } catch {
      showToast("Failed to delete todo", "error");
    }
  };

  const onSave = async (id, data) => {
    try {
      await updateTodo(id, data);
      showToast("Todo edited ✅", "success");
      await load();
    } catch {
      showToast("Failed to edit todo", "error");
    }
  };

  return (
    <div className="card">
      <div className="listHeader">
        <h2>Todos</h2>
        <div className="pill">Filter: {filter === "all" ? "All" : filter === "true" ? "Completed" : "Active"}</div>
      </div>

      {loading ? (
        <div className="muted">Loading...</div>
      ) : todos.length === 0 ? (
        <div className="muted">No todos found for this filter.</div>
      ) : (
        <div className="list">
          {todos.map((t) => (
            <TodoRow key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} onSave={onSave} />
          ))}
        </div>
      )}
    </div>
  );
}