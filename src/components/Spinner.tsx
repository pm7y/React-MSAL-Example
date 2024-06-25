export function Spinner({ msg }: { msg?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div className="flex items-center p-8 space-x-4 text-2xl font-bold bg-white bg-opacity-50 rounded-lg">
        <div className="spinner"></div>
        <div>{msg ?? "Loading..."}</div>
      </div>
    </div>
  );
}
