import React from "react";
import { useParams } from "react-router-dom";
import UsersPage from "../components/page/usersPage";
import UsersList from "../components/page/usersListPage";
import UserEditPage from "../components/page/userEdit/UserEditPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            {" "}
            {userId
                ? (
                    edit
                        ? (
                            <UserEditPage />
                        )
                        : (
                            <UsersPage userId={userId} />
                        )
                )
                : (
                    <UsersList />
                )}
        </>
    );
};

export default Users;
