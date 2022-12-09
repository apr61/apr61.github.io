import logo from "../../assets/images/logo.svg";
import "./header.css";

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="SPLITTER" />
      </div>
    </header>
  );
}

export default Header;
