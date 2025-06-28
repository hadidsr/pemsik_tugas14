export default function Modal({ children, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <button className="mb-4 text-right text-red-600" onClick={onClose}>✕</button>
          {children}
        </div>
      </div>
    );
  }