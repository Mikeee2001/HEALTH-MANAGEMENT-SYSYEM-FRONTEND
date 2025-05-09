import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear(); // ✅ Get current year dynamically

    return (
        <div>
        <footer className="bg-primary text-white text-center py-3">
            <p className="mb-0 fw-bold">To God be the Glory - {currentYear}</p>
            <p className="mb-0 fw-bold">This website is Program & Design by Michael Lafuente Macas and Michelle Lafuente Macas</p>
        </footer>
        </div>
    );
};

export default Footer;
