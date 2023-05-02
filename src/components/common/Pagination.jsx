import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
    const { itemsCount, pageSize, handleActivePage, activePage } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pageCount + 1);
    if (pageCount === 1) {
        return null;
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map((el) => {
                    return (
                        <li className="page-item" key={"page" + el}>
                            <button
                                className={
                                    "page-link" +
                                    (el === activePage ? " active" : "")
                                }
                                onClick={() => handleActivePage(el)}
                            >
                                {el}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    handleActivePage: PropTypes.func.isRequired,
    activePage: PropTypes.number.isRequired
};
export default Pagination;
