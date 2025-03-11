export default async function fetchAdmins(accessToken: string) {
  const response = await fetch(
    "https://vicsmall-backend.onrender.com/v1/api/auth/list-admins/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch admins");
  }

  return response.json();
}
