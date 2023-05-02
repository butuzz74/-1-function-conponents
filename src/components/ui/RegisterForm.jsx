import React, { useEffect, useState } from "react";
import TextField from "../common/form/TextField";
import API from "../../api";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/SelectField";
import RadioField from "../common/form/RadioField";
import MultiSelectField from "../common/form/MultiSelectField";
import CheckBoxField from "../common/form/CheckBoxField";

const RegisterForm = () => {
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
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
        password: {
            isRequired: { message: "Пароль обязателен к заполнению" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            isMinSymbols: {
                message: "Пароль должен содержать не меньше 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: { message: "Обязательно выберите вашу профессию" }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };
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
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleCange}
                    error={errors.email}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleCange}
                    error={errors.password}
                />
                {professions && (
                    <SelectField
                        label="Выберите вашу профессию"
                        name="profession"
                        value={data.profession}
                        onChange={handleCange}
                        options={professions}
                        error={errors.profession}
                        defaultOptions="Choose..."
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
                        defaultValue={data.qualities}
                        onChange={handleCange}
                        name="qualities"
                        label="Выберите ваши качества"
                    />
                )}
                <CheckBoxField
                    value={data.licence}
                    onChange={handleCange}
                    name="licence"
                    error={errors.licence}
                >
                    Подтвердить <a>лицензионное соглашение</a>
                </CheckBoxField>
                <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-primary w-100 mx-auto"
                >
                    Отправить
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
