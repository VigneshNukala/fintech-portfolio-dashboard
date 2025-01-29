import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { PieChart } from "lucide-react";

const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    navigate("/login");
  };

  const onSubmitFailure = () => {
    setStatus(true);
    setErrmsg("Something went wrong. Please try again.");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userDetails = {
      username,
      email,
      password,
    };
    const url = "http://localhost:3005/signup";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error:", errorData);
        setErrmsg(errorData);
        setStatus(true);
        return;
      }
      const data = await response.json();
      console.log(data);
      onSubmitSuccess();
    } catch (error) {
      console.log(error);
      onSubmitFailure();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-50 via-blue-100 to-white flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md shadow-xl border border-gray-300 rounded-lg p-8 bg-white">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <PieChart className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-semibold text-gray-800">
              PortfolioX
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Create an account
          </h2>
          <p className="text-gray-600">Start your investment journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="name"
                type="text"
                value={username}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 text-gray-800 pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 text-gray-800 pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 text-gray-800 pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                required
                autoComplete="current-password"
              />
            </div>
            {status && <p className="mt-2 text-sm text-red-500">{errMsg}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Create account</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
