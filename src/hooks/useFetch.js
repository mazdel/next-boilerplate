"use client";

import { useState, useEffect } from "react";

/**
 * @typedef {Object} HttpOptions
 * @property {string} method - HTTP Method
 * @property {Object} [body] - HTTP payload
 */

/**
 * Custom hooks to handle fetch
 * @function
 * @name useFetch
 * @param {string} url - url to fetch
 * @param {HttpOptions} httpOptions - HTTP Options
 * @returns {Array} contains two elements:
 * - {object} response - fetch response
 * - {function} setPayload - payload setter
 */
export const useFetch = (url, httpOptions) => {
  const [payload, setPayload] = useState(httpOptions?.body ?? {});
  const [response, setResponse] = useState({
    status: "loading",
    code: 503,
    data: undefined,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setResponse({
      status: "loading",
      code: 503,
      data: undefined,
    });

    (async () => {
      try {
        let requestOptions = {
          ...httpOptions,
          headers: {
            ...httpOptions.headers,
            "Content-Type": "application/json",
          },
          signal: signal,
        };

        if (payload && Object.keys(payload).length > 0) {
          requestOptions = {
            ...requestOptions,
            body: JSON.stringify(payload),
          };
        }
        const httpResponse = await fetch(url, requestOptions);
        const statusCode = httpResponse.status;
        const responseJson = await httpResponse.json();

        if (statusCode !== 200) throw { data: responseJson, code: statusCode };

        setResponse({
          status: "success",
          code: statusCode,
          data: responseJson,
        });
      } catch (error) {
        setResponse({
          status: "error",
          data: error.data ?? error,
          code: error.code ?? 501,
        });
      }
    })();
    return () => {
      controller.abort("timeout");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return [response, setPayload];
};
