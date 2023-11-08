import React from 'react'

function FormTextArea({ inputLabel, value, required, onChangeFunction, maxInput, readOnly}) {
    return (
        <div className="app__form_text_area-wrapper">
            <h3 className="p__opensans app__form_text_area_title">{inputLabel}</h3>
            <textarea className="app__form_text_area" rows="2" cols="75" value={value} required={required} readOnly={readOnly}
                onChange={onChangeFunction} />
            <p className="app__form_text_area_max_input">{`${value.length}/${maxInput}`}</p>

        </div>
    )
}

export default FormTextArea


