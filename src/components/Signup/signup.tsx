import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { PieChart } from "lucide-react";


const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  
  const onSubmitSuccess = (jwtToken:string) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    const navigate = useNavigate();
      navigate('/')
  }
  const onSubmitFailure = (err: string | unknown) => {
    setStatus(true);
    setErrmsg("mistake");
  }

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    console.log(1)
    const userDetails = {
      username,
      email,
      password,
    };
    const url = "http://localhost:3005/signup/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    console.log(1)
    try{
      const response = await fetch(url, options);
      console.log(response)
      if (! response.ok) {
        const errorData = await response.text();
        console.error('Eroor:', errorData)
        setErrmsg(errorData)
        setStatus(true)
        return;
      }
      console.log(1)
        const data = await response.json();
        console.log(data);
        onSubmitSuccess(data.jwtToken);
    }
    catch(error){
      console.log(error)
      onSubmitFailure(error)
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <PieChart className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">PortfolioX</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Create an account
          </h2>
          <p className="text-gray-400">Start your investment journey today</p>
        </div>

        <form onSubmit={() => handleSubmit} className="space-y-6">

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="name"
                type="text"
                value={username}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                required
              />
            </div>
            {status && <p className="mt-2 text-sm text-gray-400">
              {errMsg}
            </p>}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <span>Create account</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
