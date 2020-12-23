import React from "react"

import Spinner from 'react-bootstrap/Spinner'

const MainLoader = () => (
    <div className="main-loader">
        <p>Loading...</p>
        <Spinner className="main-spinner" animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>    
)
export default MainLoader;