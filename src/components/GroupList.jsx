import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    professions,
    onSelectedProf,
    selectedProf,
    onClearSelected
}) => {
    return (
        <>
            <ul className="list-group">
                {Object.keys(professions).map((item) => (
                    <li
                        key={professions[item]._id}
                        className={`list-group-item + ${
                            selectedProf === professions[item] ? "active" : ""
                        }`}
                        role="button"
                        onClick={() => onSelectedProf(professions[item])}
                    >
                        {professions[item].name}
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
    professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSelectedProf: PropTypes.func.isRequired,
    selectedProf: PropTypes.object,
    onClearSelected: PropTypes.func.isRequired
};
export default GroupList;
