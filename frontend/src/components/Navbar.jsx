import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/slices/authSlice";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

const Navbar = () => {
    const {isAuthenticated} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <nav>
          <h1>Auth Dashboard</h1>
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {location.pathname === "/register" ? (
                <NavLink to="/login">Login</NavLink>
              ) : (
                <NavLink to="/register">Register</NavLink>
              )}
            </>
          )}
        </nav>
      );
    }
export default Navbar;