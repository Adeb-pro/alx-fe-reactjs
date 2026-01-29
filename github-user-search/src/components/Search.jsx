import { useState } from "react";
import { fetchUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e, newPage = 1) => {
    e?.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const data = await fetchUsers({
        username,
        location,
        repos,
        page: newPage,
      });

      setUsers(newPage === 1 ? data.items : [...users, ...data.items]);
      setPage(newPage);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <form
        onSubmit={(e) => handleSearch(e, 1)}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <input
          className="p-2 border rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="p-2 border rounded"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="p-2 border rounded"
          type="number"
          placeholder="Min Repos"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
        />

        <button
          className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800"
          type="submit"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-6">Loading...</p>}
      {error && <p className="mt-6 text-red-500">Looks like we cant find the user</p>}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded flex gap-4 items-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {users.length > 0 && !loading && (
        <button
          onClick={() => handleSearch(null, page + 1)}
          className="mt-8 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;