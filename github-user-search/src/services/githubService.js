const BASE_URL = "https://api.github.com";

export async function searchUsersAdvanced({
  username,
  location,
  minRepos,
  page = 1,
  perPage = 10,
}) {
  let queryParts = [];

  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>=${minRepos}`);

  const query = queryParts.join(" ");

  const url = `${BASE_URL}/search/users?q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}`;

  // 🔐 optional auth header (helps with rate limits)
  const headers = import.meta.env.VITE_GITHUB_TOKEN
    ? {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      }
    : {};

  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error("GitHub search failed");
  }

  const data = await res.json();

  // Fetch detailed profiles for richer UI data
  const detailedUsers = await Promise.all(
    data.items.map(async (user) => {
      const r = await fetch(user.url, { headers });
      return r.json();
    })
  );

  return {
    users: detailedUsers,
    total: data.total_count,
  };
}