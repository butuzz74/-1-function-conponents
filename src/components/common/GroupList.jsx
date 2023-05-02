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
    const professionsArr = Array.isArray(professions) ? professions : Object.values(professions);
    return (
        <>
            <ul className="list-group">
                {professionsArr.map((item) => (
                    <li
                        key={item[valueProperty]}
                        className={
                            arrProfessions.includes((item[contentProperty]))
                                ? (
                                    `list-group-item + ${
                                        selectedProf === item
                                            ? "active"
                                            : ""
                                    }`
                                )
                                : "list-group-item list-group-item-action disabled"
                        }
                        role="button"
                        onClick={() => onSelectedProf(item)}
                    >
                        {item[contentProperty]}
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
