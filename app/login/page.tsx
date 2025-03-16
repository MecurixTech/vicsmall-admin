"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import axios from "axios";

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
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login-manager`,
        formData,
      )
      .then((response) => {
        if (response) {
          console.log(response);
          setIsLoading(false);
          if (response.status === 200) {
            if (typeof window !== "undefined") {
              localStorage.setItem("auth", JSON.stringify(response.data.Data));
              toast.success(response.data.Message);
              window.location.reload();
            }
          } else {
            toast.error(response.data.Message);
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("An error occurred!");
        console.log(error);
      });
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="m-8 rounded-lg bg-white p-12 shadow-lg"
    >
      <h1 className="mb-8 text-center text-3xl">Welcome back!</h1>

      <div className="mb-4">
        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full"
          type="email"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="mb-2">
          Password
        </label>
        <input
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full"
          type="password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="h-full w-full rounded-xl bg-accent-900 py-3 font-semibold text-white transition duration-300 hover:bg-orange-600 disabled:opacity-30"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginPage;
