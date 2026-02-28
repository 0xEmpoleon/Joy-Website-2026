import React from 'react';

interface WidgetProps {
    children: React.ReactNode;
    className?: string;
    gridSpan?: string;
}

const Widget: React.FC<WidgetProps> = ({ children, className = '', gridSpan = 'col-span-4' }) => {
    return (
        <div className={`genesis-widget ${gridSpan} ${className}`}>
            <div className="genesis-widget-inner">
                {children}
            </div>
        </div>
    );
};

export default Widget;
