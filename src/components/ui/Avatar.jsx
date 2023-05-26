import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ className, alt, width, height }) => {
    return (
        <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`}
            className={className}
            alt={alt}
            width={width}
            height={height}
        />
    );
};

Avatar.propTypes = {
    className: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};

export default Avatar;
