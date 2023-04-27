import React from "react";
import PropTypes from "prop-types";

const Search = ({ value, onSearch }) => {
    return (
        <div className="input-group mb-3 w-100">
            <input
                type="search"
                className="form-control"
                placeholder="Search"
                value={value}
                onChange={onSearch}
            />
        </div>
    );
};

Search.propTypes = {
    value: PropTypes.string,
    onSearch: PropTypes.func
};

export default Search;
