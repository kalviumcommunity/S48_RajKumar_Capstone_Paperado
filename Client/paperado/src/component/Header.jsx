import { Link } from "react-router-dom";
import './Css/Header.css'

const Header = () => {
  return (
    <nav className="navbar">
      <p className="webname">Paperado</p>
      <ul className="menu">
        <li><Link to="/">Add Post</Link></li>
        <li><Link to="/">Users</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
