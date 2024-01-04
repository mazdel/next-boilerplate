"use client";

import PropTypes from "prop-types";
import { useFormContext } from "@contexts/FormContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

/**
 * A nextjs Form Component to handle button
 * @component
 * @param {object} props component props
 * @property {ReactNode} children children of form to be rendered
 * @property {string} [form] form id to be submitted
 * @property {string} [className] class names to be passed to input element
 * @property {string} [type] type of the button
 * @property {function} [onClick] onclick handler
 * @returns {ReactNode}
 */
const Button = ({
  children,
  form,
  className,
  type = "button",
  onClick,
  ...moreProps
}) => {
  const { formState } = useFormContext();
  const loadingIcon = <FontAwesomeIcon icon={faCircleNotch} spin />;

  return (
    <button
      type={type}
      className={className}
      form={form}
      onClick={(e) => {
        if (onClick) return onClick(e);
      }}
      {...moreProps}
    >
      {formState.state.message === "loading" ? loadingIcon : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  form: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};
export { Button };
