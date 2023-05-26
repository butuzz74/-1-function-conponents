import React from "react";
import PropTypes from "prop-types";
const Wrapper = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};
Wrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    className: PropTypes.string
};
export default Wrapper;
