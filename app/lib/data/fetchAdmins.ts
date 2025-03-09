export default async function fetchAdmins() {
  const response = await fetch(
    "https://vicsmall-backend.onrender.com/v1/api/auth/list-admins/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQxMTIzMTc1LCJpYXQiOjE3NDExMjEzNzUsImp0aSI6ImE2ODdhNzgzNTk2NTRjNTlhN2Q0MDNhMmI5NGYxYzMxIiwidXNlcl9pZCI6IjNjZGNhZTA3LTExOWEtNDkyZC04ZWQ1LTdjYmI4YTU2NzE0NyJ9.SFb3qJqG2HVioeDkomHO8zkHmusJXZhrABHyjfJk0Zc",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch admins");
  }

  return response.json();
}
