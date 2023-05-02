import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import API from "../api";
import QualitiesList from "./QualitiesList";

const UsersPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, [userId]);
    const handleGoToAllUsers = () => {
        history.push("/users");
    };
    if (user) {
        return (
            <>
                <h1>Имя: {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <h2>Качества: {<QualitiesList user={user} />} </h2>
                <h2>Встретился, раз: {user.completedMeetings} </h2>
                <h2>Оценка: {user.rate} </h2>
                <button onClick={handleGoToAllUsers}>Все пользователи</button>
            </>
        );
    }
    return <h1>Loading</h1>;
};
UsersPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UsersPage;
