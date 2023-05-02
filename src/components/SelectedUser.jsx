import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import API from "../api";

const SelectedUser = () => {
    const [selectedUser, setUser] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const handleToAllUsers = () => {
        history.push("/users");
    };

    useEffect(() => {
        API.users.getById(id).then((data) => setUser(data));
    }, []);
    return selectedUser !== undefined && selectedUser.length !== 0
        ? (
            <div className="card w-25 m-3">
                <div className="card-body">
                    <h5 className="card-title">Имя : {selectedUser.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                    Профессия : {selectedUser.profession.name}
                    </li>
                    <li className="list-group-item">
                    Качества :{" "}
                        {selectedUser.qualities.map((elem) => (
                            <span
                                key={elem._id}
                                className={`badge bg-${elem.color} ms-2`}
                            >
                                {elem.name}
                            </span>
                        ))}
                    </li>
                    <li className="list-group-item">
                    Встретился, раз : {selectedUser.completedMeetings}
                    </li>
                    <li className="list-group-item">
                    Oценка : {selectedUser.rate}
                    </li>
                </ul>
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleToAllUsers()}
                    >
                    Все пользователи
                    </button>
                </div>
            </div>
        )
        : (
            <h1>Loading...</h1>
        );
};

export default SelectedUser;
