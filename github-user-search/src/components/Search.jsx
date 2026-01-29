import { useState } from "react";
import { searchUsersAdvanced } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const PER_PAGE = 10;

  async function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setResults([]);
    fetchUsers(1, true);
  }

  async function fetchUsers(pageToLoad, fresh = false) {
    try {
      setLoading(true);
      setError("");

      const data = await searchUsersAdvanced({
        username,
        location,
        minRepos,
        page: pageToLoad,
        perPage: PER_PAGE,
      });

      setResults((prev) =>
        fresh ? data.users : [...prev, ...data.users]
      );

      setHasMore(pageToLoad * PER_PAGE < data.total);
      setPage(pageToLoad);

    } catch (err) {
      setError("Failed to fetch users. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function loadMore() {
    fetchUsers(page + 1);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        GitHub Advanced User Search
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-lg rounded-2xl p-6 grid gap-4 md:grid-cols-3"
      >
        <input
          type="text"
          placeholder="Username"
          className="border rounded-lg p-3 focus:outline-none focus:ring w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="border rounded-lg p-3 focus:outline-none focus:ring w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Repositories"
          className="border rounded-lg p-3 focus:outline-none focus:ring w-full"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          className="md:col-span-3 bg-black text-white rounded-lg p-3 font-semibold hover:opacity-90 transition"
        >
          Search Users
        </button>
      </form>

      {/* Status */}
      {loading && (
        <p className="text-center mt-6">Loading users...</p>
      )}

      {error && (
        <p className="text-center mt-6 text-red-500">{error}</p>
      )}

      {/* Results */}
      <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {results.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full mx-auto"
            />

            <h2 className="text-xl font-bold text-center mt-3">
              {user.login}
            </h2>

            <p className="text-center text-gray-600">
              📍 {user.location || "Unknown"}
            </p>

            <p className="text-center text-gray-600">
              📦 Repos: {user.public_repos}
            </p>

            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="block mt-4 text-center bg-gray-900 text-white py-2 rounded-lg hover:opacity-90"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && !loading && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:opacity-90"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}