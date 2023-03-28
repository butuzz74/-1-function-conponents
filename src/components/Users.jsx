import React, { useState, useEffect } from "react";
import User from "./User";
import Pagination from "./Pagination";
import GroupList from "./GroupList";
import Header from "./Header";
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
        ? props.users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        : props.users;

    const userCrop = paginate(
        filteredUsers,
        activePage,
        pageSize,
        setActivePage
    );
    const count = filteredUsers.length;
    console.log(props.users);
    return (
        <>
            <div className="d-flex">
                <div className="d-flex flex-column flex-shrink-0 p-3 width=200px">
                    <Header users={filteredUsers} />
                    {items && (
                        <GroupList
                            items={items}
                            onSelectedProf={handleSelectedProf}
                            selectedProf={selectedProf}
                            onClearSelected={handleClearSelected}
                        />
                    )}
                </div>
                <div className="d-flex flex-column">
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
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    activePage={activePage}
                    handleActivePage={handleActivePage}
                />
            </div>
        </>
    );
};
Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleDelete: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
};
export default Users;
