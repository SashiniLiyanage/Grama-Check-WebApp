import React from 'react';

const Spinner = props => {
    return (
        <div className='App'>
            <div className='fullscreen'>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    );
};

export default Spinner;