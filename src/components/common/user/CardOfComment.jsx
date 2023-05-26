import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Comments from "./Comments";
import API from "../../../api";

const CardOfComment = ({ userId }) => {
    const [comments, setComments] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
        API.users
            .fetchAll()
            .then((data) =>
                setUsers(data.map((el) => ({ name: el.name, _id: el._id })))
            );
    }, []);
    const handleRemoveComment = (id) => {
        API.comments.remove(id);
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    };

    return (
        comments && comments.length
            ? (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <div className="bg-light card-body mb-3">
                            <div className="row">
                                <div className="col">
                                    {comments && users && (
                                        <Comments
                                            comments={comments}
                                            users={users}
                                            onRemove={handleRemoveComment}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            : (null)
    );
};

CardOfComment.propTypes = {
    userId: PropTypes.string
};
export default CardOfComment;
