"use client";

import { X } from "lucide-react";

const Login = () => {
  return (
    <div className="h-screen w-full top-0 z-10 fixed bg-black/10 backdrop-blur-xs flex items-center justify-center">
      <div className="bg-white border rounded-lg w-150 relative border-primary p-8">
        <button className="absolute top-4 right-4">
          <X />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-primary">E-UG</h1>
          <p className="text-xl font-bold mt-4">Student Sign In</p>
          <p>Use your UG credentials to access the voting portal.</p>
        </div>
        <form className="mt-5 space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="id">Student ID</label>
            <input
              className="border border-primary rounded-lg px-4 py-2"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="border border-primary rounded-lg px-4 py-2"
              type="text"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full"
            onClick={(e) => e.preventDefault}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
