import React, { useState } from "react";
import API from "../api";
import Header from "./Header";
import Users from "./Users";

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll());
    const handleDelete = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };
    const handleChange = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                }
                return user;
            })
        );
    };

    return !users.length
        ? <Header users={users} />
        : (
            <>
                <Header users={users} />
                <Users
                    users={users}
                    handleDelete={handleDelete}
                    handleChange={handleChange}
                />
            </>
        );
};

export default App;
