import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: '#333',
        padding: '15px',
        display: 'flex',
        gap: '15px'
      }}
    >
      <Link style={{ color: 'white' }} to="/">Home</Link>
      <Link style={{ color: 'white' }} to="/about">About</Link>
      <Link style={{ color: 'white' }} to="/services">Services</Link>
      <Link style={{ color: 'white' }} to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;