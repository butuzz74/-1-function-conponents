import React from "react";
import PropTypes from "prop-types";

const Quality = (props) => {
    const { color, name } = props;
    return <span className={`badge bg-${color} ms-2`}>{name}</span>;
};
Quality.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Quality;
