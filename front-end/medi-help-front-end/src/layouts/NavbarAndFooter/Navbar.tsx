import {Link, useHistory} from "react-router-dom";
import React, {useContext, useState} from "react";
import {UserContext} from "../../Auth/UserContext";
import {GlobalContext} from "../../Auth/GlobalContext";

export const Navbar = () => {
  const history = useHistory();

  const {setglobalThreadId, setglobalThreadDate, setglobalUserId, setglobalSearchText} = useContext(GlobalContext);

  const {isAuthorised,setisAuthorised, setcurrent_user_id, current_user_id, setcurrent_user_type } = useContext(UserContext);

  const [searchText, setsearchText] = useState("");

  const logoutClicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setisAuthorised('false');
    setcurrent_user_id("");
    setcurrent_user_type("");
  }

  const ProfileClicked = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setglobalUserId(current_user_id);
    history.push('/profile');
  }

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
            onChange={event => {
              setsearchText(event.currentTarget.value);
            }}
          />
          <button className="btn btn-outline-dark" type="submit" onClick={event => {
            if (searchText.length>0) {
              setglobalSearchText(searchText);
              setsearchText("");
              history.push('/search');
            }
          }}>
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
            {isAuthorised == 'true' &&
                <li className='nav-item'>
                  <a type="button" className='btn btn-outline-dark m-1' href="#" onClick={ProfileClicked}>
                    Profile
                  </a>
                </li>
            }
            {isAuthorised == 'true'?
                <li className="nav-item m-1">
                    <button type="button" className="btn btn-outline-dark" onClick={logoutClicked}>
                      Logout
                    </button>
                  </li>
                :
                <li className="nav-item m-1">
                  <Link type="button" className="btn btn-outline-dark" to='/login'>
                    Sign in
                  </Link>
                </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};
