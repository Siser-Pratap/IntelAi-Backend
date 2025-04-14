

const SignUpPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
            <form
                className="bg-gray-900 shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-sm transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-white">
                    Sign Up
                </h2>
                <div className="mb-4">
                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-105"
                        type="button"
                    >
                        Sign Up
                    </button>
                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-600 transform transition-all duration-300"
                        href="/sign-in"
                    >
                        Already have an account?
                    </a>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;