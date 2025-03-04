"use client";

import { Admin } from "@/app/data/dummyTypes";
import createAdmin from "@/app/lib/actions/createAdmin";
import { Formik, Form, Field } from "formik";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AdminSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<Admin>({
    email: "",
    full_name: "",
    country_code: "+234",
    phone_number: "",
    password: "",
    confirm_password: "",
    is_manager: true,
    is_active: true,
    is_deleted: true,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (values: Admin) => {
    // Handle form submission
    console.log("Form submitted", values);
    setIsLoading(true);
    const response = await createAdmin(values);
    console.log(response);
    setIsLoading(false);
    if (!response.Success) {
      toast.error(response.Message || "Failed to create admin");
      return;
    }
    toast.success(response.Message || "Admin created successfully");
    formRef.current?.reset();
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form ref={formRef} className="mx-auto sm:w-3/5">
          <h1 className="mb-4 text-3xl">Admin Sign Up</h1>
          <div className="mb-4">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <Field
              name="email"
              id="email"
              type="text"
              className="w-full border border-gray-200 bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2" htmlFor="full_name">
              Full Name
            </label>
            <Field
              name="full_name"
              id="full_name"
              type="text"
              className="w-full border border-gray-200 bg-white"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label className="mb-2" htmlFor="country_code">
                Country Code
              </label>
              <Field
                name="country_code"
                id="country_code"
                type="text"
                className="w-full border border-gray-200 bg-white"
                required
              />
            </div>
            <div className="mb-4 flex-[5]">
              <label className="mb-2" htmlFor="phone_number">
                Phone Number
              </label>
              <Field
                name="phone_number"
                id="phone_number"
                type="text"
                className="w-full border border-gray-200 bg-white"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-2" htmlFor="password">
              Password
            </label>
            <Field
              name="password"
              id="password"
              type="password"
              className="w-full border border-gray-200 bg-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2" htmlFor="confirm_password">
              Confirm Password
            </label>
            <Field
              name="confirm_password"
              id="confirm_password"
              type="password"
              className="w-full border border-gray-200 bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="button button-accent w-full py-3"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Sign up"}
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default AdminSignUp;
