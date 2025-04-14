import { Link } from "react-router-dom";

const NotFoundPage = () => {
return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <div className="text-center">
            <div className="relative">
                {/* Animated Image */}
                <img
                    src="/assets/404.png" // Replace with the path to your image
                    alt="404 Error"
                    className="w-64 h-64 mx-auto animate-bounce"
                />
            </div>
            <p className="text-xl mt-4 mb-6 animate-pulse ">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-105 hover:text-blue-500"
            >
                Go Back Home
            </Link>
        </div>
    </div>
);
};

export default NotFoundPage;