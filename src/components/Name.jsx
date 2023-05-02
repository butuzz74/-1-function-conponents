import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const Name = ({ user }) => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link to={`/users/${user._id}`} className="nav-link text-decoration-underline">
                    {user.name}
                </Link>
            </li>
        </ul>
    );
};

Name.propTypes = {
    user: PropTypes.object
};
export default Name;
