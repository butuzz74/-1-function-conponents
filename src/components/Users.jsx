import React from "react";
import User from "./User";

const Users = (props) => {
  return (
    <table className="table">
      <thead className="border-bottom-0 border-2">
        <tr>
          <th>Имя</th>
          <th>Качества</th>
          <th>Профессия</th>
          <th>Встретился, раз</th>
          <th>Оценка</th>
          <th>Избранное</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => (
          <User
            key={user._id}
            user={user}
            handleDelete={props.handleDelete}
            handleChange={props.handleChange}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Users;
