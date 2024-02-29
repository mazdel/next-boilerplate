"use client";

import PropTypes from "prop-types";
import { useFormContext } from "@/contexts/FormContext";

/**
 * A nextjs component to handle Form Validation Information
 * @param {Object} props Props Object
 * @property {string} field Form field name that validated
 * @property {string} [className] general className
 * @property {string} [classError] className used for error validation
 * @property {string} [classSuccess] className used for success validation
 * @returns {ReactNode}
 */
const ValidationInfo = ({
  field,
  className,
  classError,
  classSuccess,
  ...moreProps
}) => {
  const { formState } = useFormContext();
  let info, validationClassName;
  const validation = formState.validations[field];
  if (validation) {
    info = validation.error ?? validation.success;
    validationClassName = validation.error ? classError : classSuccess;
  }
  return (
    <>
      {info && (
        <div className={`${className} ${validationClassName}`} {...moreProps}>
          {info}
        </div>
      )}
    </>
  );
};
ValidationInfo.propTypes = {
  field: PropTypes.string.isRequired,
  className: PropTypes.string,
  classError: PropTypes.string,
  classSuccess: PropTypes.string,
};

export default ValidationInfo;
