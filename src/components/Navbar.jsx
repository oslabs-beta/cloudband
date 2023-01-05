import React from 'react';
import '../componentStyling/Navbar.scss';

function Navbar() {
    return (
        <div className="navbar">
            {/* <nav> */}
                <h1></h1>
                    <ul className="menu-items">
                        <li><a href='#'>
                        {/* <svg width="100" height="100">
                                    <path d="M50,10 L60,90 L90,30 L10,30 L40,90 L50,10" stroke="black" stroke-width="5" fill="none" />
                                </svg> */}Home
                            </a>
                        </li>
                        <li><a href='#'>About</a></li>
                        <li><a href='#'>Contact</a></li>
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Signup</a></li>
                </ul>
            {/* </nav> */}
        </div>
    );
};

export default Navbar;