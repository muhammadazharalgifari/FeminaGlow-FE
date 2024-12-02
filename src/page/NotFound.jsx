import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">
          404
        </h1>
        <div className="bg-indigo-500 px-2 text-sm text-white rounded rotate-12 inline-block">
        Page Not Found
        </div>
        <p className="mt-4 text-gray-600 text-lg">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="relative inline-block text-sm font-medium text-indigo-600 group"
          >
            <span className="absolute inset-0 transition-transform transform -translate-x-2 -translate-y-2 bg-indigo-600 group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="relative block px-8 py-3 bg-white border border-current">
              Go Home
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
