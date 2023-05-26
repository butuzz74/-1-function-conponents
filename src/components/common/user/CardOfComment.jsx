import React from "react";
import PropTypes from "prop-types";
import Comments from "./Comments";
// import API from "../../../api";

const CardOfComment = ({ userId, comments, users, onRemove }) => {
    // const [comments, setComments] = useState();
    // const [users, setUsers] = useState();

    // useEffect(() => {
    //     API.comments
    //         .fetchCommentsForUser(userId)
    //         .then((data) => setComments(data.sort(function(a, b) { return +a.created_at - +b.created_at; })));
    //     API.users
    //         .fetchAll()
    //         .then((data) =>
    //             setUsers(data.map((el) => ({ name: el.name, _id: el._id })))
    //         );
    // }, []);
    // const handleRemoveComment = (id) => {
    //     API.comments.remove(id);
    //     API.comments
    //         .fetchCommentsForUser(userId)
    //         .then((data) => setComments(data.sort(function(a, b) { return +a.created_at - +b.created_at; })));
    // };

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
                                            onRemove={onRemove}
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
    userId: PropTypes.string,
    onRemove: PropTypes.func,
    comments: PropTypes.array,
    users: PropTypes.array
};
export default CardOfComment;
