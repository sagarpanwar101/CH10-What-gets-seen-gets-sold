import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.log('error::',error);
    return (
      <div>
        <h1>Oops! Something went wrong.</h1>
       {error && <div>{error}</div>}
      </div>
    );
  };

export default Error;