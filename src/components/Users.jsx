import React, { useState, useEffect } from "react";
import User from "./User";
import Pagination from "./Pagination";
import GroupList from "./GroupList";
import API from "../api";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = (props) => {
    const pageSize = 2;

    const [activePage, setActivePage] = useState(1);
    const [items, setItems] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        API.professions.fetchAll().then((data) => setItems(data));
    }, []);

    const handleActivePage = (pageIndex) => {
        setActivePage(pageIndex);
    };

    const handleSelectedProf = (item) => {
        setSelectedProf(item);
    };
    const handleClearSelected = () => {
        setSelectedProf();
    };
    const filteredUsers = selectedProf
        ? props.users.filter((user) => user.profession === selectedProf)
        : props.users;

    const userCrop = paginate(
        filteredUsers,
        activePage,
        pageSize,
        setActivePage
    );
    const count = filteredUsers.length;
    return (
        <>
            {items && (
                <GroupList
                    items={items}
                    onSelectedProf={handleSelectedProf}
                    selectedProf={selectedProf}
                    onClearSelected={handleClearSelected}
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
                    {userCrop
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
