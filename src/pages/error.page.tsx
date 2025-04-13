import { useRouteError } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ErrorPage = () => {
  const error = useRouteError();

  // Type guard to check if it's an error object
  const errorMessage = () => {
    if (error instanceof Error) {
      return error.message; // Safely handle error object
    } else if (typeof error === 'object' && error !== null && 'statusText' in error) {
      return (error as { statusText?: string }).statusText;
    } else {
      return 'An unexpected error occurred';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 flex flex-col items-center">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-6xl mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Something went wrong.</h1>
        <p className="text-gray-600 mb-6 text-center">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-gray-500 italic mb-6">
          {errorMessage()}
        </p>
        <a href="https://www.fundmywish.ca/" className="btn btn-primary btn-wide mb-4">
          Go Back Home
        </a>
        <button
          className="btn btn-outline btn-accent"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
