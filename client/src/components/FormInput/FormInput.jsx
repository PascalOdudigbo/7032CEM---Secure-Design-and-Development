import React from 'react'

function FormInput({inputLabel, type, value, placeholder, required, onChangeFunction }) {
    return (
        <div className='app__form-input-container'>
            <h3 className='app__form-input-label'>{inputLabel}</h3>
            <input className='app__form-input' type={type} value={value} placeholder={placeholder} required={ required} onChange={onChangeFunction} />
        </div>
    )
}

export default FormInput
