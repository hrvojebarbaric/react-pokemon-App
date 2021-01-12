import React from "react";

import Loader from "./Loader";

const MainLoader = () => (
  <div className="main-loader">
    <p>Loading...</p>
    <Loader loaderClass={"main-spinner"} />    
  </div>
);
export default MainLoader;
