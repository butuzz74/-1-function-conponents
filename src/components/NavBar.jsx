import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <ul className="nav nav-pills mt-2">
            <li className="nav-item">
                <Link to="/" className="nav-link text-decoration-underline">
                    Main
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/login"
                    className="nav-link text-decoration-underline"
                >
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/users"
                    className="nav-link text-decoration-underline"
                >
                    Users
                </Link>
            </li>
        </ul>
    );
};

export default NavBar;
