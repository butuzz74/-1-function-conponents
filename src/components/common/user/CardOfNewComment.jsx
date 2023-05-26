import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/TextAreaField";
import SelectField from "../form/SelectField";

const CardOfNewComment = ({ userId }) => {
    const initialState = {
        name: "",
        content: ""
    };
    const [users, setUsers] = useState();
    const [allUsers, setAllUsers] = useState();
    const [value, setValue] = useState(initialState);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        API.users.fetchAll().then((data) => {
            const filterUsers = data.filter(user => user._id !== userId);
            const usersList = filterUsers.map((user) => ({
                label: user.name,
                value: user.name
            }));
            setUsers(usersList);
        });
        API.users.fetchAll().then(data => setAllUsers(data));
    }, []);
    const handleCange = (target) => {
        setValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле обязательно к заполнению"
            }
        },
        content: {
            isRequired: { message: "Поле обязательно к заполнению" }
        }
    };
    const validate = () => {
        const errors = validator(value, validatorConfig);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [value]);
    const isValid = Object.keys(errors).length === 0;
    const handleSendComment = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const user = allUsers.filter((user) => user.name === value.name);
        const comment = {
            content: value.content,
            userId,
            pageId: user[0]._id
        };
        API.comments.add(comment);
        setValue(initialState);
    };

    return (
        users && (
            <div className="card mb-2">
                <div className="card-body">
                    <div>
                        <SelectField
                            name={"name"}
                            value={value.name}
                            onChange={handleCange}
                            label={"New comment"}
                            options={users}
                            defaultOptions={"Выберите пользователя"}
                            error={errors.name}
                        />

                        <div className="mb-4">
                            <TextAreaField
                                label={"Сообщение"}
                                id={"content"}
                                name={"content"}
                                rows={"3"}
                                value={value.content}
                                onChange={handleCange}
                                error={errors.content}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary"
                            onClick={handleSendComment}
                        >
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};
CardOfNewComment.propTypes = {
    userId: PropTypes.string
};

export default CardOfNewComment;
