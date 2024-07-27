type Props = {
  error?: string;
  setError?: (err: string) => void;
  success?: string;
  setSuccess?: (message: string) => void;
};

export const Banner: React.FC<Props> = ({
  error,
  setError,
  success,
  setSuccess,
}) => {
  return (
    <div
      className={`relative top-2 right-2 text-white ${
        error ? "bg-red-500" : "bg-green-500"
      }`}
    >
      <div className="flex justify-center items-center">
        {error && (
        <p className="p-7 pr-3 pl-3 mb-0">{error}</p>
        )}
        {success && (
        <p className="p-7 pr-3 pl-3 mb-0">{success}</p>
        )}

        <button
          className="absolute top-2 right-2 text-white"
          onClick={() => (error ? setError!("") : setSuccess!(""))}
        >
          <svg
            className="w-5 h-5 ml-5 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
