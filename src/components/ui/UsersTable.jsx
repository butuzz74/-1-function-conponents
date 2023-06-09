import React from "react";
import { Table, TableBody, TableHeader } from "../common/table";
import PropTypes from "prop-types";
import Bookmark from "../common/Bookmark";
import QualitiesList from "./qualities";
import { Link } from "react-router-dom";

const UsersTable = ({
    userCrop,
    handleDeleteUser,
    currentSort,
    handleNothingFavorite,
    onSort
}) => {
    const colums = {
        name: {
            iter: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList user={user} />
        },
        profession: { iter: "profession.name", name: "Профессия" },
        completedMeetings: {
            iter: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: {
            iter: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    bookmark={user.bookmark}
                    id={user._id}
                    handleNothingFavorite={handleNothingFavorite}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user._id)}
                >
                    Delete
                </button>
            )
        }
    };
    return (
        <Table
            colums={colums}
            currentSort={currentSort}
            userCrop={userCrop}
            onSort={onSort}
        >
            <TableHeader
                currentSort={currentSort}
                onSort={onSort}
                colums={colums}
            />
            {userCrop ? <TableBody data={userCrop} colums={colums} /> : null}
        </Table>
    );
};

UsersTable.propTypes = {
    userCrop: PropTypes.array,
    handleDeleteUser: PropTypes.func.isRequired,
    handleNothingFavorite: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired
};
export default UsersTable;
