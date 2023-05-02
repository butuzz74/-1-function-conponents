import React from "react";
import PropTypes from "prop-types";
import Quality from "./Quality";

const QualitiesList = ({ user }) => {
    return (
        <>
            {user.qualities.map((elem) => (
                <Quality key={elem._id} color={elem.color} name={elem.name} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    user: PropTypes.object.isRequired
};
export default QualitiesList;
