import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-auto">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Smart Finance App. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
