import '../componentStyling/Navbar.scss';

function Navbar() {
  

  return (
    <div className="navbar-wrapper" id="cloud-intro">
      <h1>Cloudband</h1>
      <ul className="menu-items">
        <li>
          <a href="#">Team</a>
        </li>
        <li>
          <a href="#">Github</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
