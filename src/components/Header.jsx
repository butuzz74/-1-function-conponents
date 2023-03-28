import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
    const { users } = props;
    if (!users.length) {
        return <h1 className="badge bg-danger fs-2">
            Никто не тусанет с тобой сегодня </h1>;
    } else {
        return users.length > 4 || users.length === 1
            ? <h1 className="badge bg-primary fs-2">
                {users.length} человек тусанет с тобой сегодня{" "}
            </h1>
            : <h1 className="badge bg-primary fs-2">
                {users.length} человека тусанет с тобой сегодня
            </h1>;
    };
};
Header.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Header;
