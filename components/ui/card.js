export function Card({ children, className }) {
  return <div className={`bg-white rounded-xl shadow p-4 ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}