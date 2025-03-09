"use server";

export default async function updateProfile(
  formData: {
    full_name: string;
    phone_number: string;
    about_me: string;
  },
  accessToken: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin-profile`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  console.log("RESPOPNSE: " + response);

  return response.json();
}
