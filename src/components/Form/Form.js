"use client";
import PropTypes from "prop-types";

import { useReducer, useState, useMemo } from "react";
import { FormContext } from "@/contexts/FormContext";

/**
 * A nextjs client component to handle Form
 * @component
 * @param {Object} props component props
 * @property {ReactNode} children children of form to be rendered
 * @property {string} [id] id of the element
 * @property {string} action url to send the form
 * @property {string} [method=POST] HTTP method to send the form, default to POST
 * @property {function} [onSuccess] A function which triggered after the form got a success response which used as the only parameter
 * @property {object} [moreProps] additional props to be passed to form element
 * @returns {ReactNode}
 */
const Form = ({
  children,
  id,
  action,
  method = "POST",
  onSuccess,
  defaultFieldsValue = {},
  ...moreProps
}) => {
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

  const [formState, dispatch] = useReducer(formReducer, {
    fields: defaultFieldsValue ?? {},
    validations: {},
    state: { code: 0, message: "idle" },
  });

  const [response, setResponse] = useState({
    status: "idle",
    code: 0,
    data: undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse({
      code: 503,
      data: undefined,
      status: "loading",
    });
    dispatch({
      field: "_all",
      error: undefined,
    });

    try {
      const fetchResponse = await fetch(action, {
        method: method,
        body: JSON.stringify(formState.fields),
        headers: { "Content-Type": "application/json" },
      });

      if (fetchResponse.status !== 200) throw { fetchResponse };

      let result = await fetchResponse.json();
      return setResponse({
        code: fetchResponse.status,
        data: result,
        status: "success",
      });
    } catch (error) {
      const { fetchResponse, ...restError } = error;
      if (restError) {
        console.error(restError);
      }
      if (fetchResponse.headers.get("Content-Type") !== "application/json") {
        const result = await fetchResponse.text();
        return setResponse({
          code: fetchResponse.status,
          data: result,
          status: "error",
        });
      }
      const result = await fetchResponse.json();
      return setResponse({
        code: fetchResponse.status,
        data: result,
        status: "error",
      });
    }
  };

  useMemo(() => {
    /* handle the response here */

    if (response.code >= 200 && response.code < 300) {
      onSuccess(response);
    }
    if (response.code > 400 && response.code < 500) {
      dispatch({
        field: "_all",
        error: response.data.error?.message,
      });
    }
    return dispatch({
      state: { code: response.code, message: response.status },
    });
  }, [onSuccess, response]);

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
  defaultFieldsValue: PropTypes.object,
  onSuccess: PropTypes.func,
};
export { Form };
