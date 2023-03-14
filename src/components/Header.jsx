import React from "react";

const Header = (props) => {
  return props.users.length > 4 || props.users.length === 1 ? (
    <h1 className="badge bg-primary fs-2">
      {props.users.length} человек тусанет с тобой сегодня
    </h1>
  ) : (
    <h1 className="badge bg-primary fs-2">
      {props.users.length} человека тусанет с тобой сегодня
    </h1>
  );
};

export default Header;
