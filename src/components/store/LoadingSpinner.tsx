// components/store/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-purple-600 text-3xl">🏪</span>
        </div>
      </div>
      <p className="text-gray-500 mt-4">Loading businesses...</p>
    </div>
  );
}