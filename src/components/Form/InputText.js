"use client";
import PropTypes from "prop-types";

import { useFormContext } from "@/contexts/FormContext";

/**
 * A nextjs Form Component to handle text based input
 * @component
 * @param {Object} props component props
 * @property {string} name required, name of the input element
 * @property {string} [type] type of the input element, default to "text"
 * @property {string} [className] class names to be passed to input element
 * @property {string} [defaultValue] initial value of the input
 * @property {function} [onChange] additional onChange handler
 * @property {Object} [moreProps] additional props to be passed to input element
 * @returns {ReactNode}
 */
const InputText = ({
  name,
  type = "text",
  className,
  defaultValue = "",
  onChange,
  ...moreProps
}) => {
  const { formState, dispatch } = useFormContext();

  const fieldValue = formState.fields[name];
  return (
    <input
      type={type}
      name={name}
      className={className}
      value={fieldValue ?? defaultValue}
      onChange={(e) => {
        dispatch({
          field: name,
          value: e.target.value,
          error: "",
          success: "",
        });
        if (onChange) return onChange(e);
        return;
      }}
      {...moreProps}
    />
  );
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf([
    "text",
    "number",
    "date",
    "password",
    "tel",
    "datetime-local",
    "time",
    "email",
    "url",
  ]),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};
export { InputText };
