import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import UsersTable from "./UsersTable";
import GroupList from "./GroupList";
import Header from "./Header";
import API from "../api";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = (props) => {
    const { users, handleDeleteUser, handleNothingFavorite } = props;
    const pageSize = 8;

    const [activePage, setActivePage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    const arrProfessions = users.map((item) => item.profession.name);

    const handleActivePage = (pageIndex) => {
        setActivePage(pageIndex);
    };

    const handleSelectedProf = (item) => {
        setSelectedProf(item);
    };
    const handleClearSelected = () => {
        setSelectedProf();
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const filteredUsers = selectedProf
        ? users.filter((user) => _.isEqual(user.profession, selectedProf))
        : users;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);

    const userCrop = paginate(sortedUsers, activePage, pageSize, setActivePage);
    const itemsCount = filteredUsers.length;

    useEffect(() => {
        if (!filteredUsers.length) {
            setSelectedProf();
        }
    }, [filteredUsers]);

    return (
        <div>
            {users && professions && (
                <>
                    <div className="d-flex">
                        <div className="d-flex flex-column flex-shrink-0 p-3 width=200px group">
                            {professions && (
                                <GroupList
                                    professions={professions}
                                    onSelectedProf={handleSelectedProf}
                                    selectedProf={selectedProf}
                                    onClearSelected={handleClearSelected}
                                    arrProfessions={arrProfessions}
                                />
                            )}
                        </div>
                        <div className="d-flex flex-column">
                            <Header users={filteredUsers} />
                            {users.length
                                ? (
                                    <UsersTable
                                        userCrop={userCrop}
                                        handleDeleteUser={handleDeleteUser}
                                        handleNothingFavorite={
                                            handleNothingFavorite
                                        }
                                        onSort={handleSort}
                                        currentSort={sortBy}
                                    />
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
                    </div>
                </>
            )}
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleDeleteUser: PropTypes.func.isRequired,
    handleNothingFavorite: PropTypes.func.isRequired
};
export default Users;
