import React from "react"

import Spinner from 'react-bootstrap/Spinner'

const LoaderImage = () => (
    <Spinner className="spinner" animation="border" role="status">
        <span className="sr-only">Loading...</span>
    </Spinner>
)
export default LoaderImage;