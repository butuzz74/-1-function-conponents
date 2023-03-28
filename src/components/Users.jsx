import React, { useState, useEffect } from "react";
import User from "./User";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./GroupList";

import API from "../api";

const Users = (props) => {
    const pageSize = 5;

    const [activePage, setActivePage] = useState(1);
    const [items, setItems] = useState();
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        API.professions.fetchAll().then((data) => setItems(data));
    }, []);

    const filteredUsers = selectedProf
        ? props.users.filter((user) => user.profession === selectedProf)
        : props.users;

    const userCrop = paginate(
        filteredUsers,
        activePage,
        pageSize,
        setActivePage
    );
    console.log(userCrop);
    const count = filteredUsers.length;

    const handleActivePage = (pageIndex) => {
        setActivePage(pageIndex);
    };

    const handleProfessionSelect = (params) => {
        setSelectedProf(params);
    };

    const handleClearFiltered = () => {
        setSelectedProf();
    };
    return (
        <>
            {items && (
                <GroupList
                    items={items}
                    onItemSelect={handleProfessionSelect}
                    selectedProf={selectedProf}
                    onClearFiltered={handleClearFiltered}
                />
            )}
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
                    {userCrop.length
                        ? userCrop.map((user) => (
                            <User
                                key={user._id}
                                user={user}
                                handleDelete={props.handleDelete}
                                handleChange={props.handleChange}
                            />
                        ))
                        : null}
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
