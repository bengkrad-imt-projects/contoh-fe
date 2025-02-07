import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-bengkrad.png"; 

function NavbarP() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">
        <div className="logout-link">
          Logout
        </div>
      </span>
      <span className="navbar-brand">
        <div className="nav-link">
          Dashboard
        </div>
      </span>
      <span className="navbar-brand">
        <Link to="/" className="nav-link">
          Pemilihan Jadwal
        </Link>
      </span>
      <div className="navbar-right">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    </nav>
  );
}

export default NavbarP;