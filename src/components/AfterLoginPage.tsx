import Link from "next/link";

export const AfterLoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-5">
      <div className="bg-white p-8 sm:p-12 rounded-lg shadow-2xl max-w-md w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Account Created
        </h2>
        <p className="text-gray-600 mb-8">
          We have sent an email to your provided email address. Please follow
          the link in the email to activate your account.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/" className="no-underline">
            <span className="bg-blue-500 text-sm sm:text-lg text-white py-2 px-3 rounded-full sm:px-4 hover:bg-blue-600 transition duration-300 ease-in-out">
              Go to Home
            </span>
          </Link>
          <Link href="/sign-up" className="no-underline">
            <span className="bg-green-500 text-sm sm:text-lg text-white py-2 px-3 sm:px-4 rounded-full hover:bg-green-600 transition duration-300 ease-in-out">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
