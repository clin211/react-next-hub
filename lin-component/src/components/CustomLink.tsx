import React from 'react'

const CustomLink = ({ href, children }: { href?: string; children: React.ReactNode }) => {
    return (
        <div>
            <a href={href}>{children}</a>
        </div>
    );
};

export default CustomLink