import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, currentSort, colums }) => {
    const handleSort = (item) => {
        if (currentSort.iter === item) {
            onSort({
                ...currentSort,
                order: currentSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <thead className="border-bottom-0 border-2">
            <tr>
                {Object.keys(colums).map((colum) => (
                    <th
                        key={colum}
                        onClick={
                            colums[colum].iter
                                ? () => handleSort(colums[colum].iter)
                                : undefined
                        }
                        role={colums[colum].iter ? "button" : undefined}
                    >
                        {colums[colum].name}
                        {colums[colum].iter && currentSort.order === "asc" && colums[colum].iter === currentSort.iter
                            ? (
                                <i className="bi bi-caret-up-fill"></i>
                            )
                            : colums[colum].iter && currentSort.order === "desc" && colums[colum].iter === currentSort.iter
                                ? (
                                    <i className="bi bi-caret-down-fill"></i>
                                )
                                : undefined}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired,
    colums: PropTypes.object.isRequired
};
export default TableHeader;
