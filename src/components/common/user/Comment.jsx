import React from "react";
import PropTypes, { number, string } from "prop-types";
import { timestamp } from "../../../utils/timestamp";
import Avatar from "../../ui/Avatar";

const Comment = ({
    pageId,
    content,
    users,
    onRemove,
    id,
    userId,
    createdAt
}) => {
    const getNameUserComment = (id, arr) => {
        const a = arr.filter((el) => el._id === id);
        return a[0].name;
    };
    const name = getNameUserComment(userId, users);
    const time = timestamp(createdAt);
    return (
        <>
            <div className="d-flex flex-start">
                <Avatar
                    className={"rounded-circle shadow-1-strong me-3"}
                    alt={"avatar"}
                    width={"65"}
                    height={"65"}
                />
                <div className="flex-grow-1 flex-shrink-1">
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-1">
                                {name} <span className="small">{time}</span>
                            </p>
                            <button
                                className="btn btn-sm text-primary d-flex align-items-center"
                                onClick={() => onRemove(id)}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <p className="small mb-0">{content}</p>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
};

Comment.propTypes = {
    content: PropTypes.string,
    users: PropTypes.array,
    pageId: PropTypes.string,
    onRemove: PropTypes.func,
    id: PropTypes.string,
    userId: PropTypes.string,
    createdAt: PropTypes.oneOfType([string, number])
};
export default Comment;
