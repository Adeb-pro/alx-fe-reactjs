import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        padding: '15px',
        backgroundColor: '#333',
        display: 'flex',
        gap: '20px'
      }}
    >
      <Link style={{ color: '#fff', textDecoration: 'none' }} to="/">Home</Link>
      <Link style={{ color: '#fff', textDecoration: 'none' }} to="/about">About</Link>
      <Link style={{ color: '#fff', textDecoration: 'none' }} to="/services">Services</Link>
      <Link style={{ color: '#fff', textDecoration: 'none' }} to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;