import axios from "axios";

export const fetchUsers = async ({
  username,
  location,
  repos,
  page = 1,
}) => {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (repos) query += `repos:>=${repos}`;

  const response = await axios.get(
    "https://api.github.com/search/users",
    {
      params: {
        q: query.trim(),
        page,
        per_page: 10,
      },
      headers: {
        Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
          ? `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
          : undefined,
      },
    }
  );

  return response.data;
};