import React from "react";
import Bookmark from "./Bookmark";
import Qualities from "./Qualities";
import PropTypes from "prop-types";

const User = (props) => {
    const { user, handleDelete, handleChange } = props;
    return (
        <tr>
            <th>{user.name}</th>
            <td>
                {user.qualities.map((elem) => (
                    <Qualities
                        key={elem._id}
                        color={elem.color}
                        name={elem.name}
                    />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <Bookmark
                    bookmark={user.bookmark}
                    id={user._id}
                    handleChange={handleChange}
                />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
User.propTypes = {
    user: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default User;
