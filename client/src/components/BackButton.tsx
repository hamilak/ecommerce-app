import React from "react"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <>
            <button style={{ backgroundColor: 'transparent', borderBottom: '1px solid' }} onClick={handleBack}>Back</button>
        </>
    )
}

export default BackButton