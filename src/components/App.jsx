import React, { useState, useEffect } from "react";
import API from "../api";
import Users from "./Users";

const App = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
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

    return (
        users && (
            <Users
                users={users}
                handleDelete={handleDelete}
                handleChange={handleChange}
            />
        )
    );
};

export default App;
