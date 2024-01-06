"use client";
import PropTypes from "prop-types";

import { useReducer, useEffect } from "react";
import { FormContext } from "@/contexts/FormContext";
import { useFetch } from "@/hooks/useFetch";

const formReducer = (prevState, action) => {
  return {
    ...prevState,
    fields: { ...prevState.fields, [action.field]: action.value },
    validations: {
      ...prevState.validations,
      [action.field]: {
        error: action.error,
        success: action.success,
      },
    },
    state: action.state ?? prevState.state,
  };
};
/**
 * A nextjs client component to handle Form
 * @component
 * @param {Object} props component props
 * @property {ReactNode} children children of form to be rendered
 * @property {string} [id] id of the element
 * @property {string} action url to send the form
 * @property {string} [method=POST] HTTP method to send the form, default to POST
 * @property {object} [moreProps] additional props to be passed to form element
 * @returns {ReactNode}
 */
const Form = ({ children, id, action, method = "POST", ...moreProps }) => {
  const [formState, dispatch] = useReducer(formReducer, {
    fields: {},
    validations: {},
    state: { code: 0, message: "idle" },
  });
  const [response, setPayload] = useFetch(action, { method: method });

  const handleSubmit = (e) => {
    e.preventDefault();

    setPayload(formState.fields);
  };
  useEffect(() => {
    /* handle the response here */
    console.log(response);
    return dispatch({
      state: { code: response.code, message: response.status },
    });
  }, [response]);

  return (
    <form
      id={id}
      action={action}
      method={method}
      onSubmit={handleSubmit}
      {...moreProps}
    >
      <FormContext.Provider value={{ formState, dispatch }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};
Form.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  action: PropTypes.string.isRequired,
  method: PropTypes.string,
  className: PropTypes.string,
};
export { Form };
