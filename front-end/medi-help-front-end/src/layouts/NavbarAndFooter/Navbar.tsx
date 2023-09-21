import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading} from "../utils/SpinnerLoading";

export const Navbar = () => {

  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />
  }

  const handleLogout = async () => oktaAuth.signOut();

  return (
    <nav className="navbar navbar-expand-md navbar-dark main-color">
      <div className="container-fluid">
        <span className="navbar-brand">
          <Link className="nav-link" to="/home">
            <img
              src={require("./../../images/App-logos/medi-help-logo-no-bg.png")}
              height="50"
              alt="Logo"
            />
          </Link>
        </span>

        <form className="d-flex flex-grow-1">
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
          className="navbar-toggler m-1"
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
          <ul className="navbar-nav ms-auto">
            {authState.isAuthenticated &&
                <li className='nav-item'>
                  <Link type="button" className='btn btn-outline-dark m-1' to='/profile'>
                    Profile
                  </Link>
                </li>
            }
            {!authState.isAuthenticated?
                <li className="nav-item m-1">
                  <Link type="button" className="btn btn-outline-dark" to='/login'>
                    Sign in
                  </Link>
                </li>
                :
                <li className="nav-item m-1">
                  <button className='btn btn-outline-dark' onClick={handleLogout}>Logout</button>
                </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};
