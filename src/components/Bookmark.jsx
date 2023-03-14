import React from "react";

const Bookmark = (props) => {
  const { id, bookmark, handleChange } = props;
  return (
    <div className="bookmark" onClick={() => handleChange(id)}>
      {!bookmark ? (
        <i className="bi bi-bookmark"></i>
      ) : (
        <i className="bi bi-bookmark-fill"></i>
      )}
    </div>
  );
};

export default Bookmark;
