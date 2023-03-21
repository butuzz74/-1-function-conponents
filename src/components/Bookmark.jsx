import React from "react";
import PropTypes from "prop-types";

const Bookmark = (props) => {
    const { id, bookmark, handleChange } = props;
    return (
        <div className="bookmark" onClick={() => handleChange(id)}>
            {!bookmark
                ? <i className="bi bi-bookmark"></i>
                : <i className="bi bi-bookmark-fill"></i>
            }
        </div>
    );
};
Bookmark.propTypes = {
    id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired
};
export default Bookmark;
