import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import API from "../../../api";
import QualitiesList from "../../ui/qualities/QualitiesList";

const UsersPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleGoToAllUsers = () => {
        history.push("/users");
    };
    const handleGoToEditUses = () => {
        history.push(`/users/${userId}/edit`);
    };
    console.log(user);
    if (user) {
        return (
            <>
                <h1>Имя: {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <h2>Качества: {<QualitiesList user={user} />} </h2>
                <h2>Встретился, раз: {user.completedMeetings} </h2>
                <h2>Оценка: {user.rate} </h2>
                <button className="me-2" onClick={handleGoToAllUsers}>
                    Все пользователи
                </button>
                <button className="me-2" onClick={handleGoToEditUses}>
                        Редактировать данные клиента
                </button>
            </>
        );
    }
    return <h1>Loading</h1>;
};
UsersPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UsersPage;
