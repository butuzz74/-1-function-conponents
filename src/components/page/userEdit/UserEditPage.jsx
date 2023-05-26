import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import TextField from "../../common/form/TextField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import MultiSelectField from "../../common/form/MultiSelectField";
import API from "../../../api";
import { validator } from "../../../utils/validator";

const UserEditPage = () => {
    const params = useParams();
    const history = useHistory();
    const { userId } = params;
    const [data, setData] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        API.users.getById(userId).then((data) => setData(data));
    }, []);
    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (
                typeof id === "object"
                    ? prof.value === id._id
                    : prof.value === id
            ) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        if (Object.keys(elements[0]).some((key) => key === "_id")) {
            return elements;
        } else {
            const qualitiesArray = [];
            for (const elem of elements) {
                for (const quality in qualities) {
                    if (elem.value === qualities[quality].value) {
                        qualitiesArray.push({
                            _id: qualities[quality].value,
                            name: qualities[quality].label,
                            color: qualities[quality].color
                        });
                    }
                }
            }
            return qualitiesArray;
        }
    };
    const handleCange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна к заполнению"
            },
            isEmail: {
                message: "Электронная почта введена некорректно"
            }
        },
        name: {
            isRequired: { message: "Имя обязательно к заполнению" }
        }
    };
    const defaultValueMultiSelect = () => {
        const defaultValue = [];
        for (let i = 0; i < data.qualities.length; i++) {
            for (let j = 0; j < qualities.length; j++) {
                if (qualities[j].value === data.qualities[i]._id) {
                    defaultValue.push(qualities[j]);
                }
            }
        }
        return defaultValue;
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        const dataEdit = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        };
        API.users.update(dataEdit._id, dataEdit);
        history.goBack();
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };
    return (
        data && (
            <div className="container mt-5">
                <div className="d-flex justify-content-start">
                    <button
                        className="btn btn-primary"
                        onClick={() => history.goBack()}
                    >
                        Назад
                    </button>
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        <h3>Edit</h3>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя пользователя"
                                name="name"
                                value={data.name}
                                onChange={handleCange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleCange}
                                error={errors.email}
                            />
                            {professions && (
                                <SelectField
                                    label="Выберите вашу профессию"
                                    name="profession"
                                    value={data.profession.name}
                                    onChange={handleCange}
                                    options={professions}
                                />
                            )}
                            <RadioField
                                label="Выберите ваш пол"
                                onChange={handleCange}
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                            />
                            {qualities && (
                                <MultiSelectField
                                    options={qualities}
                                    defaultValue={defaultValueMultiSelect()}
                                    onChange={handleCange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                            )}
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Отправить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};
export default UserEditPage;
