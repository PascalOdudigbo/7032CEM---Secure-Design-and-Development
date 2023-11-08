import React from 'react'

function FormInputReadOnly({inputLabel, type, value }) {
    return (
        <div className='app__form-input-container'>
            <h3 className='app__form-input-label'>{inputLabel}</h3>
            <input className='app__form-input' type={type} value={value} readOnly={true}/>
        </div>
    )
}

export default FormInputReadOnly
