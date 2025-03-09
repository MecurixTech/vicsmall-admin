import { Admin } from "../../data/dummyTypes";

export default async function createAdmin(admin: Admin) {
  const response = await fetch(
    "https://vicsmall-backend.onrender.com/v1/api/auth/create-manager/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create admin");
  }

  return response.json();
}
