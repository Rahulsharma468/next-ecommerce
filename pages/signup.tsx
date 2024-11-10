import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error registering user");
      }

      setSuccess("User registered successfully. Redirecting to login...");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    // <div className="container">
    //   <div className="flex items-center justify-center min-h-screen">
    //     <div className="flex flex-col items-center card shadow-md">
    //       <form className="card-body w-96" onSubmit={handleSubmit}>
    //         <h1 className="text-4xl my-8">Sign Up</h1>
    //         {!!error && <p className="text-error">ERROR: {error}</p>}
    //         {!!success && <p className="text-success">{success}</p>}
    //         <input
    //           type="text"
    //           className="input input-bordered"
    //           placeholder="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <input
    //           type="password"
    //           className="input input-bordered"
    //           placeholder="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <button className="btn" type="submit">
    //           Sign Up
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="flex h-screen text-black">
      {/* Left side with form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-gray-100 p-6">
        <h2 className="text-3xl font-bold mb-6">Register</h2>
        <form className="w-2/3" onSubmit={handleSubmit}>
          {/* Username Field */}
          {/* <div className="mb-4">
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div> */}

          {/* Email Field */}
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

          {/* Password Field */}
          <div className="mb-6">
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
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
          >
            Register
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>

      {/* Right side with background */}
      <div className="hidden md:block w-1/2 bg-blue-500">
        {/* Optionally, add an image or keep the solid color */}
      </div>
    </div>
  );
};

export default SignupPage;
