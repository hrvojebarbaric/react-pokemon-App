import React from "react";
import { useHistory } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <div className="container text-center">
      <div className="buttons-next-prev">
        <CustomButton buttonText={"Back"} onClick={() => history.goBack()} />
      </div>
      <h1 className="main-loader">404 - Page not Found!</h1>
    </div>
  );
};
export default NotFoundPage;
