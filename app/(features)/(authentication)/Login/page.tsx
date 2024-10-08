"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize the router instance

  const handleLogin = async () => {
    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      if (response.data.success) {

        localStorage.setItem("token", response.data.token);

        router.push("/home");
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="flex h-screen text-black">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form className="w-2/3" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Dont have an account?{" "}
          <a href="/Register" className="text-blue-500">
            Register
          </a>
        </p>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-blue-500 hidden md:block"></div>
    </div>
  );
}
