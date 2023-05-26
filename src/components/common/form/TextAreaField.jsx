import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ name, id, rows, value, onChange, label, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (<>
        <label htmlFor={id} className="form-label">
            {label}
        </label>
        <textarea
            className={error ? "form-control is-invalid" : "form-control"}
            id={id}
            name={name}
            rows={rows}
            value={value}
            onChange={handleChange}
        ></textarea>
        {error && <div className="invalid-feedback">{error}</div>}
    </>);
};

TextAreaField.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    rows: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    error: PropTypes.string
};
export default TextAreaField;
