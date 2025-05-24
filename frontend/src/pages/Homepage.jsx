import React from 'react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div>

      {/* Hero Section */}
      <motion.section
        className="text-center mt-5"
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
          >
            Manage Your Finances <br /> with Intelligence
          </h1>
          <p className="lead mt-3">
            <b>An AI-powered financial management platform that helps you track,<br />
              analyze, and optimize your spending with real-time insights.</b>
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className='btn btn-dark btn-lg mt-4'
          >
            <a className="text-white text-decoration-none" href="/register">
              Get Started →
            </a>
          </motion.button>
        </div>
      </motion.section>
      <br />

      {/* AI Finance Image Section - Dark Theme, Responsive, Image Left */}
      <motion.section
        className="py-5"
        style={{
          backgroundColor: '#121212',
          color: '#f1f1f1',
        }}
        initial={{ opacity: 0, scale: 0.9, y: 100 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <div className="container d-flex flex-column-reverse flex-md-row align-items-center justify-content-between gap-4">
          {/* Text Content */}
          <div className="text-center text-md-start mt-4 mt-md-0">
            <motion.h2
              className="fw-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ fontSize: '2rem' }}
            >
              Smarter Tool. Smarter Money Management.
            </motion.h2>
            <p className="mt-3" style={{ fontSize: '1.1rem', color: '#cccccc' }}>
              Harness the power of AI to track spending, optimize savings, and predict future financial trends. Your intelligent budgeting partner is here.
            </p>
          </div>

          {/* Image Content */}
          <motion.img
            src="/finance.jpg"
            alt="AI Smart Finance Illustration"
            className="shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            style={{
              width: '80%',
              maxWidth: '500px',
              borderRadius: '20px',
              boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
            }}
          />
        </div>
      </motion.section>



      {/* Features Section */}
      <section id="features" className="py-5 ">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Powerful Tools to Empower You</h2>
          <div className="row text-center g-4">

            <div className="col-md-4">
              <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-dark text-white">
                <img src="https://img.icons8.com/color/96/money--v1.png" alt="Track Transactions" className="mb-3" />
                <h5>Track Transactions</h5>
                <p>Automatically record and categorize your income & expenses with real-time AI support.</p>
              </motion.div>
            </div>

            <div className="col-md-4">
              <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-white">
                <img src="https://img.icons8.com/color/96/budget.png" alt="Budgeting" className="mb-3" />
                <h5>Smart Budgeting</h5>
                <p>Create customized budgets with intelligent recommendations based on your lifestyle and goals.</p>
              </motion.div>
            </div>

            <div className="col-md-4">
              <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-white">
                <img src="https://img.icons8.com/color/96/statistics.png" alt="Analytics" className="mb-3" />
                <h5>Visual Analytics</h5>
                <p>Stay informed with interactive charts and visual summaries of your financial trends.</p>
              </motion.div>
            </div>

            <div className="col-md-4">
              <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-white">
                <img src="https://img.icons8.com/color/96/scan-stock.png" alt="Auto Scan" className="mb-3" />
                <h5>Auto Scan with AI</h5>
                <p>Snap receipts or bills and let AI extract and log the data for quick transaction entries.</p>
              </motion.div>
            </div>

            <div className="col-md-4">
              <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-white">
                <img src="https://img.icons8.com/color/96/voice-presentation.png" alt="Voice Assistant" className="mb-3" />
                <h5>Voice Assistant</h5>
                <p>Just speak to log your expenses. Our AI assistant makes money tracking easier than ever.</p>
              </motion.div>
            </div>

            <div className="col-md-4">
              <motion.div whileHover={{ scale: 1.05 }} className="p-4 shadow rounded bg-dark text-white">
                <img src="https://img.icons8.com/color/96/email.png" alt="Daily Reports" className="mb-3" />
                <h5>Daily Email Reports</h5>
                <p>Receive a personalized summary of your financial activity directly to your inbox every day.</p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
      <br />
      {/* How It Works Section */}
      <section className="bg-dark py-5 text-white text-center">
        <div className="container">
          <h2 className="mb-4">How SmartFinance Works</h2>
          <div className="row">
            <div className="col-md-3">
              <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                <h5>1. Sign Up</h5>
                <p>Create a secure account and connect your financial sources.</p>
              </motion.div>
            </div>
            <div className="col-md-3">
              <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                <h5>2. Add or Track</h5>
                <p>Transactions are added and categorized automatically in real-time.</p>
              </motion.div>
            </div>
            <div className="col-md-3">
              <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                <h5>3. Set Budgets</h5>
                <p>Set financial budgets or reducing debt.</p>
              </motion.div>
            </div>
            <div className="col-md-3">
              <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                <h5>4. Grow</h5>
                <p>Receive personalized suggestions and insights to improve your financial health.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <br />

      {/* About Section */}
      <section id="about" className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Why Choose SmartFinance?</h2>
          <p className="lead">We offer more than just expense tracking. Our platform provides AI-driven insights, simplifies your budgeting journey, and ensures you never lose track of your financial goals. Trusted by students, professionals, and entrepreneurs across India.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Have a Question?</h2>
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

      {/* Sponsorship Section */}
      {/* <section className="bg-white py-4 text-center border-top">
        <div className="container">
          <p className="lead mb-0">
            <strong>Sponsored by:</strong> <span style={{ color: '#5e17eb'}}> <a href="https://www.ezioinfotech.com/" style={{}}>Ezio InfoTech Pvt Ltd</a> </span>
          </p>
        </div>
      </section> */}


      {/* Footer Call-to-Action */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <h4 className="mb-3">Ready to Take Control of Your Finances?</h4>
          <a href="/register" className="btn btn-outline-light btn-lg">Join SmartFinance Now</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
