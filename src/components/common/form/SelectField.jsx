import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOptions,
    options,
    error,
    name
}) => {
    const optionsArr =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInvalidClasses = () => {
        return `form-control + ${error ? "is-invalid" : ""}`;
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInvalidClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value={defaultOptions ? "" : value}>
                    {defaultOptions || value}
                </option>
                {optionsArr &&
                    optionsArr.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}{" "}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
SelectField.propTypes = {
    label: PropTypes.string,
    defaultOptions: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    name: PropTypes.string
};

export default SelectField;
