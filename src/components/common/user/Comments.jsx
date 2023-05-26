import React from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";

const Comments = ({ comments, users, onRemove }) => {
    return (
        <>
            {comments.map((comment) => (
                <Comment
                    key={comment._id}
                    content={comment.content}
                    users={users}
                    userId={comment.userId}
                    pageId={comment.pageId}
                    onRemove={onRemove}
                    id={comment._id}
                    createdAt={comment.created_at}
                />
            ))}
        </>
    );
};

Comments.propTypes = {
    comments: PropTypes.array,
    users: PropTypes.array,
    onRemove: PropTypes.func
};
export default Comments;
