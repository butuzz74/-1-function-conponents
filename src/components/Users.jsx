import React, { useState, useEffect } from "react";
import User from "./User";
import Pagination from "./Pagination";
import GroupList from "./GroupList";
import Header from "./Header";
import API from "../api";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = (props) => {
    const { users, handleDeleteUser, handleNothingFavorite } = props;
    const pageSize = 2;

    const [activePage, setActivePage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [deactiveProf, setDeactiveProf] = useState();

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const handleActivePage = (pageIndex) => {
        setActivePage(pageIndex);
    };

    const handleSelectedProf = (item) => {
        setSelectedProf(item);
        setDeactiveProf(item.name);
    };
    console.log(deactiveProf);
    const handleClearSelected = () => {
        setSelectedProf();
    };
    const filteredUsers = selectedProf
        ? users.filter(
            (user) =>
                _.isEqual(user.profession, selectedProf)
                // Или так
            // JSON.stringify(user.profession) ===
            //   JSON.stringify(selectedProf)
        )
        : users;

    const userCrop = paginate(
        filteredUsers,
        activePage,
        pageSize,
        setActivePage
    );
    const itemsCount = filteredUsers.length;

    useEffect(() => {
        if (!filteredUsers.length) {
            setSelectedProf();
        }
    }, [filteredUsers]);

    return (
        <div>
            {users && professions &&
                (<><div className="d-flex">
                    <div className="d-flex flex-column flex-shrink-0 p-3 width=200px group">
                        {professions && (
                            <GroupList
                                professions={professions}
                                onSelectedProf={handleSelectedProf}
                                selectedProf={selectedProf}
                                onClearSelected={handleClearSelected}
                            />
                        )}
                    </div>
                    <div className="d-flex flex-column">
                        <Header users={filteredUsers} />
                        {users.length
                            ? (
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
                                                    handleDeleteUser={
                                                        handleDeleteUser
                                                    }
                                                    handleNothingFavorite={
                                                        handleNothingFavorite
                                                    }
                                                />
                                            ))
                                            : null}
                                    </tbody>
                                </table>
                            )
                            : null}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={itemsCount}
                        pageSize={pageSize}
                        activePage={activePage}
                        handleActivePage={handleActivePage}
                    />
                </div></>)
            }
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleDeleteUser: PropTypes.func.isRequired,
    handleNothingFavorite: PropTypes.func.isRequired
};
export default Users;
