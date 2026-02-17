import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/blog/123">Blog Post 123</Link>
      </nav>
    </div>
  );
}