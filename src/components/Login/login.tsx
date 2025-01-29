import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { PieChart } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const navigate = useNavigate();

  const onSubmitSuccess = (jwtToken: string) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    navigate("/dashboard");
  };

  const onSubmitFailure = (err: string | unknown) => {
    console.log(err);
    setStatus(true);
    setErrmsg("An error occurred. Please try again.");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userDetails = {
      email,
      password,
    };
    const url = "http://localhost:3005/login";
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
      onSubmitSuccess(data.jwtToken);
    } catch (error) {
      console.log(error);
      onSubmitFailure(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-50 via-blue-100 to-white flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md shadow-xl border border-gray-300 rounded-lg p-8 bg-white">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <PieChart className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-800">PortfolioX</span>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-600">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded bg-gray-100 border-gray-400 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-100"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-500 hover:text-blue-400"
            >
              Forgot password?
            </button>
          </div>

          {status && <p className="text-red-500 text-sm">{errMsg}</p>}

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Sign in</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
