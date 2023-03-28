import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    onSelectedProf,
    selectedProf,
    onClearSelected
}) => {
    return (
        <>
            <ul className="list-group">
                {Object.keys(items).map((item) => (
                    <li
                        key={items[item]._id}
                        className={`list-group-item + ${
                            selectedProf === items[item] ? "active" : ""
                        }`}
                        role="button"
                        onClick={() => onSelectedProf(items[item])}
                    >
                        {items[item].name}
                    </li>
                ))}
                <li
                    className="list-group-item active mt-2"
                    role="button"
                    onClick={onClearSelected}
                >
                    Очистить
                </li>
            </ul>
        </>
    );
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSelectedProf: PropTypes.func.isRequired,
    selectedProf: PropTypes.object,
    onClearSelected: PropTypes.func.isRequired
};
export default GroupList;
