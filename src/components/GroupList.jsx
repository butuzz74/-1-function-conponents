import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    professions,
    onSelectedProf,
    selectedProf,
    onClearSelected,
    valueProperty,
    contentProperty,
    arrProfessions
}) => {
    return (
        <>
            <ul className="list-group">
                {Object.keys(professions).map((item) => (
                    <li
                        key={professions[item][valueProperty]}
                        className={
                            arrProfessions.includes((professions[item][contentProperty]))
                                ? (
                                    `list-group-item + ${
                                        selectedProf === professions[item]
                                            ? "active"
                                            : ""
                                    }`
                                )
                                : "list-group-item list-group-item-action disabled"
                        }
                        role="button"
                        onClick={() => onSelectedProf(professions[item])}
                    >
                        {professions[item][contentProperty]}
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
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSelectedProf: PropTypes.func.isRequired,
    selectedProf: PropTypes.object,
    onClearSelected: PropTypes.func.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    arrProfessions: PropTypes.array
};
export default GroupList;