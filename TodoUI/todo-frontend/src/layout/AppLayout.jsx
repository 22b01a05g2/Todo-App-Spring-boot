import Navbar from "../components/Navbar";

export default function AppLayout({ children, onLogout, filter, setFilter }) {
  return (
    <div className="appShell">
      <Navbar onLogout={onLogout} filter={filter} setFilter={setFilter} />
      <main className="container">{children}</main>
    </div>
  );
}