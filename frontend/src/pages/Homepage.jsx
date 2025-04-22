import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">SmartFinance</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              <li className="nav-item"><a className="btn btn-primary ms-3" href="/login">Login</a></li>
            </ul>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <motion.section
        className="text-white bg-primary py-5 text-center mt-5"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Take Control of Your Finances</h1>
          <p className="lead">SmartFinance helps you track expenses, manage budgets, and reach your goals effortlessly.</p>
          <a href="/register" className="btn btn-light btn-lg mt-3">Get Started</a>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <motion.div whileHover={{ scale: 1.05 }} className="p-4">
                <img src="https://img.icons8.com/color/96/money--v1.png" alt="track" className="mb-3" />
                <h5>Track Transactions</h5>
                <p>Automatically record your income and expenses in real-time.</p>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div whileHover={{ scale: 1.05 }} className="p-4">
                <img src="https://img.icons8.com/color/96/budget.png" alt="budget" className="mb-3" />
                <h5>Manage Budgets</h5>
                <p>Set spending limits and visualize your progress with smart reports.</p>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div whileHover={{ scale: 1.05 }} className="p-4">
                <img src="https://img.icons8.com/color/96/statistics.png" alt="reports" className="mb-3" />
                <h5>Financial Reports</h5>
                <p>Get actionable insights with charts, graphs, and summaries.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Why Choose SmartFinance?</h2>
          <p className="lead">We provide the simplest way to take control of your money. Designed for modern individuals and families, our tool simplifies budgeting, tracks expenses, and helps you plan your future.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <form className="mx-auto" style={{ maxWidth: '500px' }}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Your Name" required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Your Email" required />
            </div>
            <div className="mb-3">
              <textarea className="form-control" rows="4" placeholder="Your Message" required></textarea>
            </div>
            <button className="btn btn-primary w-100">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
