import React from 'react';

import {Colors} from './Utils';

const PlayNumber = (props) => {
    const buttonClickEvent = (event) =>{
        props.onClick(props.number, props.status);
    };
    
    return (
        <button 
            className="number" 
            style={{backgroundColor: Colors[props.status]}}
            onClick={buttonClickEvent}> 
            {props.number} 
        </button>
    );
};



export default PlayNumber;