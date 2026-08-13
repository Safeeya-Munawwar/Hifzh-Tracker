import not_found from "../assets/not_found.gif";
import { Link } from "react-router-dom";

import useAuthStore from "../lib/authStore";
import { getHomePathByRole } from "../lib/roles";

export default function NotFound() {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);

  const isLoggedIn = Boolean(user && accessToken);
  const role = user?.role;

  const homePath = isLoggedIn ? getHomePathByRole(role) : "/";

  return (
    <div className="min-h-[90vh] bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Main Heading */}
      <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-800 mb-4">
        404
      </h1>

      {/* Subheading */}
      <p className="text-lg sm:text-xl text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Image Illustration */}
      <img
        src={not_found}
        alt="Page not found illustration"
        className="w-64 sm:w-96 animate-fadeIn"
      />

      {/* Back Home Button */}
      <Link
        to={homePath}
        className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
