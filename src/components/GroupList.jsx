import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, onItemSelect, selectedProf, onClearFiltered }) => {
    return (
        <>
            <ul className="list-group">
                {Object.keys(items).map((key) => (
                    <li
                        className={`list-group-item + ${
                            items[key] === selectedProf ? "active" : null
                        }`}
                        role="button"
                        key={items[key]._id}
                        onClick={() => onItemSelect(items[key])}
                    >
                        {items[key].name}
                    </li>
                ))}
                <li
                    className="list-group-item"
                    role="button"
                    onClick={onClearFiltered}
                >
                    Oчистить
                </li>
            </ul>
        </>
    );
};
GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedProf: PropTypes.object,
    onClearFiltered: PropTypes.func
};
export default GroupList;
