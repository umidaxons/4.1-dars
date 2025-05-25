export default function Header({ onNewClick }) {
  return (
    <header className="py-5 shadow-md fixed left-0 right-0 bg-white z-40">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <h1 className="font-medium text-3xl">Todo app</h1>
        <button
          onClick={onNewClick}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          +NEW
        </button>
      </div>
    </header>
  );
}
