import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArr =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    const handleChange = (value) => {
        onChange({ name, value });
    };

    return optionsArr.length > 0 && (
        <div className="mb-4">
            <label className="form-label pe-3">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                options={optionsArr}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};
export default MultiSelectField;
