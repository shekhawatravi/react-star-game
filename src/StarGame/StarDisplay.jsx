import React from 'react';

import Utils from './Utils';

const StarDisplay = (props) => {
    return(
        <>
            {Utils.range(1, props.count).map( (startId, index ) => {
                return (<div key={startId} className="star" />);
            }) }
        </>
    );
};

export default StarDisplay;