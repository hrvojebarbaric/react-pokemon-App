import React from "react";

import Spinner from "react-bootstrap/Spinner";

const Loader = ({ loaderClass }) => (
  <Spinner className={loaderClass} animation="border" role="status">    
  </Spinner>
);
export default Loader;
