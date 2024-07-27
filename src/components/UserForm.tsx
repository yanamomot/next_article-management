"use client";

import { useStore } from "@/store/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const UserForm = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [PasswordErrorMessage, setPasswordErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasEmailError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setHasPasswordError(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    setHasEmailError(!email);
    setHasPasswordError(!password);

    let emailEmpty = false;
    let passwordEmpty = false;
    let shortPassword = false;

    if (!email) {
      setEmailErrorMessage("Email must not be empty");
      setHasEmailError(true);
      emailEmpty = true;
    }

    if (!password) {
      setPasswordErrorMessage("Password must not be empty");
      setHasPasswordError(true);
      passwordEmpty = true;
    } else if (password.length <= 6) {
      setPasswordErrorMessage("Password should have at least 8 characters");
      setHasPasswordError(true);
      shortPassword = true;
    }

    if (shortPassword || emailEmpty || passwordEmpty) {
      setLoading(false);
      return;
    }

    try {
      if (pathname === "/login") {
        // await login(email, password);
        setError("");
        setTimeout(() => {
          router.push("/success-login");
        }, 400);
      } else {
        // await signUp(email, password);
        setError("");
        setTimeout(() => {
          router.push("/admin-panel");
        }, 400);
      }
    } catch (err) {
      setError("Something went wrong :(");
    } finally {
      reset();
    }
  };
  // #region reset
  const reset = () => {
    setEmail("");
    setPassword("");

    setHasEmailError(false);
    setEmailErrorMessage("");

    setHasPasswordError(false);
    setPasswordErrorMessage("");

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg md:w-1/3 lg:w-1/4 xl:w-1/5 max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {pathname === "/login" ? "Log in" : "Sign up"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="e.g. bobsmith@gmail.com"
            className="border border-gray-300 rounded-lg w-full py-2 px-4"
          />
          <p className={`text-sm text-red-600 mt-1 ${!hasEmailError ? "hidden" : ""}`}>
            {emailErrorMessage}
          </p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="********"
            className="border border-gray-300 rounded-lg w-full py-2 px-4"
          />
          <p className={`text-sm text-red-600 mt-1 ${!hasPasswordError ? "hidden" : ""}`}>
            {PasswordErrorMessage}
          </p>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 transition duration-300 ease-in-out"
        >
          {pathname === "/login" ? "Log in" : "Sign up"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          {pathname === "/login"
            ? "Do not have an account? "
            : "Already have an account? "}
          <Link href={pathname === "/login" ? "/sign-up" : "/login"}>
            <span className="text-blue-500 hover:underline">
              {pathname === "/login" ? "Sign up" : "Log in"}
            </span>
          </Link>
        </p>
      </div>
    </div>
  </div>
  
  );
};
