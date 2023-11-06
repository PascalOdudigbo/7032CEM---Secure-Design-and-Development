import React, { useState } from 'react'
import { IconContext } from "react-icons";
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'


function Dropdown({items, buttonText, clickFunction}) {
    const [itemsDisplay, setItemsDisplay] = useState(false);
    const iconStyles = {color: "white" };

    return (
        <div className='app__dropdown'>
            <div className='app__dropdown-button-icons-wrapper' onClick={()=> setItemsDisplay(prevItemsDisplay => !prevItemsDisplay)}>
                <p className="p__opensans app__dropdown-button">{buttonText}</p>
                <IconContext.Provider value={{ size: "20px", className: "app__dropdown-arrow-icons" }}>
                    {itemsDisplay ? <AiOutlineUp style={iconStyles} /> : <AiOutlineDown style={iconStyles}/>}
                </IconContext.Provider>
            </div>


            <div className="app__dropdown-items" style={{display: itemsDisplay ? "block" : "none"}}>
                {items?.map(item => <p key={items?.indexOf(item)} className={"p__opensans"} onClick={() => { clickFunction(item) }}>{item}</p>)}
            </div>

        </div>
    )
}

export default Dropdown;
