"use client";

import Image from "next/image";
import { useState } from "react";
import login from "../lib/actions/login";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const LoginPage: React.FC = () => {
  const auth =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("auth") || "{}");

  if (auth.access) {
    redirect("/");
  }

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await login(formData);
    if (response) {
      setIsLoading(false);
      if (response.Success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("auth", JSON.stringify(response.Data));
          toast.success(response.Message);
          window.location.reload();
        }
      } else {
        toast.error(response.Message);
      }
    }
    console.log(response);
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex min-h-screen items-center justify-center bg-gray-100"
    >
      <div className="relative h-[589px] w-[656px] rounded-2xl bg-white shadow-lg">
        <div className="absolute left-[241px] top-[101px] text-center">
          <h1 className="text-2xl font-medium text-gray-900">Welcome back!</h1>
        </div>

        <div className="absolute left-[87px] top-[202px]">
          <label className="text-sm font-medium text-gray-600">Email</label>
        </div>

        <div className="absolute left-[86px] top-[224px] h-[45px] w-[485px]">
          <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 p-2">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="text"
              placeholder="Enter your email"
              className="ml-2 w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        <div className="absolute left-[87px] top-[296px]">
          <label className="text-sm font-medium text-gray-600">Password</label>
        </div>

        <div className="absolute left-[86px] top-[318px] h-[45px] w-[485px]">
          <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 p-2">
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
            />
            <button>
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="absolute left-[86px] top-[447px] h-[50px] w-[485px]">
          <button
            type="submit"
            disabled={isLoading}
            className="h-full w-full rounded-lg bg-accent-900 font-semibold text-white transition duration-300 hover:bg-orange-600 disabled:opacity-30"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
        <div className="absolute left-[473px] top-[367px]">
          <a
            href="#"
            className="text-sm font-semibold text-gray-600 hover:text-gray-800"
          >
            Forgot password?
          </a>
        </div>

        <div className="absolute left-[299px] top-[25px]">
          <Image
            src="/vicsmall-logo.svg"
            alt="Vicsmall logo"
            height={48}
            width={48}
          />
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
