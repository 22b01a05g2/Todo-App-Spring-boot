import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar({ onLogout, filter, setFilter }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  const onViewClick = () => setOpen((v) => !v);

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // close dropdown on route change
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="nav">
      <div className="navInner">
        <div className="brand">
          <div className="logo">✓</div>
          <div>
            <div className="brandTitle">Todo App</div>
          </div>
        </div>

        <div className="navActions">
          <NavLink className={({ isActive }) => (isActive ? "btn btnPrimary" : "btn")} to="/create">
            Create Todo
          </NavLink>

          <div className="dropdown" ref={ref}>
            <button className="btn" onClick={onViewClick} type="button">
              View Todos ▾
            </button>

            {open && (
              <div className="menu">
                <NavLink className="menuItem" to="/todos" onClick={() => setFilter("all")}>
                  All Tasks
                </NavLink>
                <NavLink className="menuItem" to="/todos" onClick={() => setFilter("false")}>
                  Yet to Complete
                </NavLink>
                <NavLink className="menuItem" to="/todos" onClick={() => setFilter("true")}>
                  Completed
                </NavLink>

                <div className="menuDivider" />

                {/* Show current filter as a mini toggle when on /todos */}
                <div className="menuFooter">
                  <span className="menuLabel">Current:</span>
                  <select
                    className="miniSelect"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="false">Active</option>
                    <option value="true">Completed</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <button className="btn btnDanger" onClick={onLogout} type="button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}