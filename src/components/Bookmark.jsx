import React from "react";
import PropTypes from "prop-types";

const Bookmark = (props) => {
    const { id, bookmark, handleNothingFavorite } = props;
    return (
        <div className="bookmark" onClick={() => handleNothingFavorite(id)}>
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
    handleNothingFavorite: PropTypes.func.isRequired
};
export default Bookmark;
