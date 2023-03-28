import React, { useState } from "react";
import User from "./User";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = (props) => {
    const count = props.users.length;
    const pageSize = 5;

    const [activePage, setActivePage] = useState(1);

    const userCrop = paginate(props.users, activePage, pageSize, setActivePage);

    const handleActivePage = (pageIndex) => {
        setActivePage(pageIndex);
    };

    return (
        <>
            <table className="table">
                <thead className="border-bottom-0 border-2">
                    <tr>
                        <th>Имя</th>
                        <th>Качества</th>
                        <th>Профессия</th>
                        <th>Встретился, раз</th>
                        <th>Оценка</th>
                        <th>Избранное</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userCrop.map((user) => (
                        <User
                            key={user._id}
                            user={user}
                            handleDelete={props.handleDelete}
                            handleChange={props.handleChange}
                        />
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                activePage={activePage}
                handleActivePage={handleActivePage}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};
export default Users;
