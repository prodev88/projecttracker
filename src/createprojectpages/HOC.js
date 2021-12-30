import { useParams } from "react-router-dom";

import React from "react";

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const p = useParams();
    return <Component {...props} p={p} />;
  };
}
export default withMyHook;
