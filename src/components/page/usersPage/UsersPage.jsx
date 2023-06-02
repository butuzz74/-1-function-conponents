import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import API from "../../../api";
import CardOfUser from "../../common/user/CardOfUser";
import CardOfQuality from "../../common/user/CardOfQuality";
import CardOfMeeting from "../../common/user/CardOfMeeting";
import Container from "../../ui/Container";
import Wrapper from "../../ui/Wrapper";
import CardOfNewComment from "../../common/user/CardOfNewComment";
import CardOfComment from "../../common/user/CardOfComment";

const UsersPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    const [comments, setComments] = useState();
    const [usersList, setUsersList] = useState();

    useEffect(() => {
        API.comments.fetchCommentsForUser(userId).then((data) =>
            setComments(
                data.sort(function(a, b) {
                    return +b.created_at - +a.created_at;
                })
            )
        );
        API.users
            .fetchAll()
            .then((data) =>
                setUsersList(data.map((el) => ({ name: el.name, _id: el._id })))
            );
    }, [comments]);
    const handleRemoveComment = (id) => {
        API.comments.remove(id);
        API.comments.fetchCommentsForUser(userId).then((data) =>
            setComments(
                data.sort(function(a, b) {
                    return +b.created_at - +a.created_at;
                })
            )
        );
    };

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleGoToEditUses = () => {
        history.push(`/users/${userId}/edit`);
    };
    if (user) {
        return (
            <Container>
                <Wrapper className={"col-md-4 mb-3"}>
                    <CardOfUser
                        name={user.name}
                        profession={user.profession.name}
                        rate={user.rate}
                        onClick={handleGoToEditUses}
                    />
                    <CardOfQuality user={user} />
                    <CardOfMeeting completedMeetings={user.completedMeetings} />
                </Wrapper>
                <Wrapper className={"col-md-8"}>
                    <CardOfNewComment userId={userId} />
                    <CardOfComment
                        userId={userId}
                        comments={comments}
                        users={usersList}
                        onRemove={handleRemoveComment}
                    />
                </Wrapper>
            </Container>
        );
    }
    return <h1>Loading</h1>;
};
UsersPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UsersPage;
