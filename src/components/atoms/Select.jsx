export default function Select({ label, children, ...props }) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <select {...props} className="w-full border p-2 rounded">
        {children}
      </select>
    </div>
  );
}
