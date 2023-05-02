import React, { useEffect, useState } from "react";
import TextField from "../common/form/TextField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/CheckBoxField";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
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
        }
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
        console.log(data);
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
                <CheckBoxField
                    value={data.stayOn}
                    onChange={handleCange}
                    name="stayOn"
                >
                    Оставаться в системе
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

export default LoginForm;
