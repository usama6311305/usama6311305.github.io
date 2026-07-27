// components/store/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="text-center py-16 bg-red-50 rounded-2xl">
      <span className="text-6xl">⚠️</span>
      <h3 className="text-xl font-semibold text-gray-800 mt-4">Something went wrong</h3>
      <p className="text-gray-600 mt-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
        >
          🔄 Try Again
        </button>
      )}
    </div>
  );
}