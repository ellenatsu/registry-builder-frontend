
import { useNavigate } from "react-router-dom";


const FallbackUI = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-3xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="text-lg text-gray-700 mt-2">
        An unexpected error occurred. Please try the following:
      </p>
      <ul className="list-disc list-inside mt-4 text-gray-600">
        <li>Refresh the page</li>
        <li>Go back to the previous page</li>
        <li>Contact support if the issue persists</li>
      </ul>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary px-6 py-2"
        >
          Refresh Page
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary px-6 py-2"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FallbackUI;
