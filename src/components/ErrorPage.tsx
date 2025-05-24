export default function ErrorPage({ msg }: { msg: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md w-full bg-white border border-red-200 rounded-lg shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">⚠️ Oops!</h1>
        <p className="text-gray-700 text-sm">{msg}</p>
      </div>
    </div>
  );
}
