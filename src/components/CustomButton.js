import React from "react"

const CustomButton = ({onClickButton, buttonText, disabled}) => {
    return (
        <button className="fs-2 fw-bold btn btn-warning" disabled={disabled} onClick={ onClickButton }>{buttonText}</button>
    )
}
export default CustomButton