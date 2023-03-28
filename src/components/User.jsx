import React from "react";
import Bookmark from "./Bookmark";
import Quality from "./Quality";
import PropTypes from "prop-types";

const User = (props) => {
    const { user, handleDeleteUser, handleNothingFavorite } = props;
    return (
        <tr>
            <th>{user.name}</th>
            <td>
                {user.qualities.map((elem) => (
                    <Quality
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
                    handleNothingFavorite={handleNothingFavorite}
                />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
User.propTypes = {
    user: PropTypes.object.isRequired,
    handleDeleteUser: PropTypes.func.isRequired,
    handleNothingFavorite: PropTypes.func.isRequired
};

export default User;
