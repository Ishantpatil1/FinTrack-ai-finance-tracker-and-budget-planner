import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
        const [menuOpen, setMenuOpen] = useState(false);
        const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center gap-2 text-accent" to="/">
                   <img
    src="/logo2.jpg"
    alt="FinTrack Logo"
    className="rounded-circle"
    style={{ width: '30px', height: '30px', objectFit: 'cover' }}
/>
                    <h3 className="fw-bold mb-0">FinTrack</h3>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setMenuOpen((s) => !s)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                     <Link className="nav-link text-light" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                                </li>
                                <li className="nav-item">
                                     <Link className="nav-link text-light" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                                </li>
                                <li className="nav-item">
                                     <Link className="nav-link text-light" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                                </li>
                                <li className="nav-item">
                                     <Link className="nav-link text-light" to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                     <Link className="nav-link text-light" to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                     <Link className="nav-link text-light" to="/ai-budget" onClick={() => setMenuOpen(false)}>AI Budget Planner</Link>
                                </li>
                                <li className="nav-item">
                                     <button className="nav-link btn p-0 text-danger" onClick={() => { setMenuOpen(false); handleLogout(); }}>
                                        Logout
                                     </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
