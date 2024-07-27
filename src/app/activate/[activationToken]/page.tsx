'use client';

import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ActivationPage = () => {
  const { activationToken } = useParams();

  useEffect(() => {
    try {
      // activate(activationToken);
    } catch (err) {
      console.error(err);
    }
  }, [activationToken]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
        Activation successful! 🎉
        </h1>
        <div className="text-center">
            <span className="text-lg text-green-600">Your account is now active</span>
        </div>
      </div>
    </div>
  );
};

export default ActivationPage;
