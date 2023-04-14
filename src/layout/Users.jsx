import React from "react";
import { useParams } from "react-router-dom";
import UsersPage from "../components/UsersPage";
import UsersList from "../components/UsersList";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UsersPage userId={userId}/> : <UsersList />}</>;
};

export default Users;
