import React from "react";
import { useParams } from "react-router-dom";
import UsersPage from "../components/page/usersPage";
import UsersList from "../components/page/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    return <> {userId ? <UsersPage userId={userId}/> : <UsersList />}</>;
};

export default Users;
