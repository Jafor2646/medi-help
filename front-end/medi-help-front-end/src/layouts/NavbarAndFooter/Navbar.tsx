export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark main-color">
      <div className="container-fluid">
        <span className="navbar-brand">
          <a className="nav-link" href="#">
            <img
              src={require("./../../images/medi-help-logo-no-bg.png")}
              height="50"
              alt="Logo"
            />
          </a>
        </span>

        <form className="d-flex flex-fill">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-dark" type="submit">
            Search
          </button>
        </form>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {/* <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                {" "}
                Search Books
              </a>
            </li>
          </ul> */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item m-1">
              <a type="button" className="btn btn-outline-dark" href="#">
                Sign in
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
