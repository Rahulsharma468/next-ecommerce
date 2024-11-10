import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const callbackUrl = decodeURI((router.query?.callbackUrl as string) || "/");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else if (result?.ok) {
      // Now, instead of checking the user object directly in result, rely on the session
      const session = await fetch("/api/auth/session").then((res) =>
        res.json()
      );
      if (session?.user?.role === "admin") {
        router.push("/admin"); // Redirect admin to the /admin page
      } else {
        router.push(callbackUrl); // Redirect to the callbackUrl if not an admin
      }
    }
  };

  return (
    // <div className="container">
    //   <div className="flex items-center justify-center min-h-screen">
    //     <div className="flex flex-col items-center card shadow-md">
    //       <form className="card-body w-96" onSubmit={handleSubmit}>
    //         <h1 className="text-4xl my-8">Sign In</h1>
    //         {error && <p className="text-error">ERROR: {error}</p>}
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
    //           Sign In
    //         </button>
    //         <Link className="btn btn-outline" href="/signup">
    //           Sign Up
    //         </Link>
    //       </form>
    //     </div>
    //   </div>
    // </div>
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
          <Link href="/signup" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-blue-500 hidden md:block"></div>
    </div>
  );
};

export default SignInPage;
