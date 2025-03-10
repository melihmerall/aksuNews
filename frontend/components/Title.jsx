import React from 'react';

const Title = ({ title, className = "" }) => {
    return (
        <div className={`text-2xl font-semibold text-[#222] relative before:absolute before:w-[5px] before:bg-[#5271ff] before:h-full before:left-0 pl-4 ${className}`}>
            {title}
        </div>
    );
};

export default Title;
