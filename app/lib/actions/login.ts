"use server";

export default async function login(formData: {
  email: string;
  password: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login-manager`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
}
