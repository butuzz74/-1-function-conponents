import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
    console.log(props.users.length);
    if (!props.users.length || props.users.length === 0) {
        return <h1 className="badge bg-danger fs-2">
            Никто не тусанет с тобой сегодня </h1>;
    } else {
        return props.users.length > 4 || props.users.length === 1
            ? <h1 className="badge bg-primary fs-2">
                {props.users.length} человек тусанет с тобой сегодня{" "}
            </h1>
            : <h1 className="badge bg-primary fs-2">
                {props.users.length} человека тусанет с тобой сегодня
            </h1>;
    };
};
Header.propTypes = {
    users: PropTypes.array.isRequired
};

export default Header;
