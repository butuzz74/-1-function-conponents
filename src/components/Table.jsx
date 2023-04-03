import React from "react";
import PropTypes from "prop-types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ currentSort, onSort, colums, userCrop, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader
                        currentSort={currentSort}
                        onSort={onSort}
                        colums={colums}
                    />
                    {userCrop
                        ? (
                            <TableBody data={userCrop} colums={colums} />
                        )
                        : null}
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    currentSort: PropTypes.object,
    onSort: PropTypes.func,
    userCrop: PropTypes.array,
    colums: PropTypes.object,
    children: PropTypes.array
};
export default Table;
