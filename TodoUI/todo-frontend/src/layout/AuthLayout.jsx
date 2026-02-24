export default function AuthLayout({ children }) {
  return (
    <div className="authPage">
      <div className="authCard">{children}</div>
    </div>
  );
}
