import React, { useState } from "react";
import "./FloatingToggleButton.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const FloatingToggleButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();
    const record = () => {
        alert("Record   ");
        navigate("/record"); // Navigate to the record page when the record button is clicked
    }

    return (
        <div className="floating-container">
            <div className={`fab-menu ${isOpen ? "open" : ""}`}>
                <button className="fab-button" onClick={toggleMenu}>
                    <span className="fab-icon">•••</span>
                </button>
                {isOpen && (
                    <div className="fab-actions">
                        <button className="fab-action">
                            <i className="fa fa-circle"></i>
                            <span onClick={() => {
                                record();
                            }}>Record</span>
                        </button>
                        <button className="fab-action">
                            <i className="fa fa-upload"></i>
                            <span>Publish</span>
                        </button>
                        <button className="fab-action">
                            <i className="fa fa-check"></i>
                            <span>Select All</span>
                        </button>
                        <button className="fab-action">
                            <i className="fa fa-plus"></i>
                            <span>Import</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FloatingToggleButton;
