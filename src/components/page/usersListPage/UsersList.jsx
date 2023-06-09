import React, { useState, useEffect } from "react";
import Pagination from "../../common/Pagination";
import UsersTable from "../../ui/UsersTable";
import GroupList from "../../common/GroupList";
import Header from "../../ui/Header";
import Preloader from "../../common/Preloader";
import API from "../../../api";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";
import Search from "../../Search";

const UsersList = () => {
    const pageSize = 8;

    const [users, setUsers] = useState();
    const [activePage, setActivePage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [search, setSearch] = useState("");

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };
    const handleNothingFavorite = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                }
                return user;
            })
        );
    };

    const handleActivePage = (pageIndex) => {
        setActivePage(pageIndex);
    };

    const handleSelectedProf = (item) => {
        setSearch("");
        setSelectedProf(item);
    };
    const handleClearSelected = () => {
        setSelectedProf();
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearch = (e) => {
        setSelectedProf();
        setSearch(e.target.value);
    };

    if (users && professions) {
        const usersSearch = users.filter((item) =>
            item.name
                .split(" ")
                .join("")
                .toLowerCase()
                .includes(search.split(" ").join("").toLowerCase())
        );
        const arrProfessions = users.map((item) => item.profession.name);
        const filteredUsers = selectedProf
            ? users.filter((user) => _.isEqual(user.profession, selectedProf))
            : usersSearch.length !== 0
                ? usersSearch
                : users;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.iter],
            [sortBy.order]
        );

        const userCrop = paginate(
            sortedUsers,
            activePage,
            pageSize,
            setActivePage
        );
        const itemsCount = filteredUsers.length;

        if (!filteredUsers.length) {
            setSelectedProf();
        }

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
                                <Search
                                    value={search}
                                    onSearch={handleSearch}
                                />
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
    } else {
        return <Preloader />;
    }
};

export default UsersList;
