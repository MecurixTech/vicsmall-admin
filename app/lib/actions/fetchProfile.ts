"use server";

export default async function fetchProfile() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin-profile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
}
