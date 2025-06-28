export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative animate-fadeIn">
        {/* Tombol Close */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Judul */}
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {/* Isi Modal */}
        <div>{children}</div>
      </div>
    </div>
  );
}
