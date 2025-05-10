import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div>

      {/* Hero Section */}
      <motion.section
        className=" text-center mt-5"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <h1 className="display-1 fw-bold"
            style={{
              background: 'linear-gradient(90deg,rgb(81, 0, 255),rgb(169, 27, 235))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >Manage Your Finances <br /> with Intelligence </h1>
          <p className="lead"><b>An AI-powered financial management platform that helps you track, <br /> analyze, and optimize your spending with real-time insights.</b></p>
          <button className='btn btn-light btn-lg mt-3 text-white'>
            <a class="icon-link icon-link-hover link-success link-underline-success link-underline-opacity-25" href="/register">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" class="bi" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg>
            </a>
          </button>
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
