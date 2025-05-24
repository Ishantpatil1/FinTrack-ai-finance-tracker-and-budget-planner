import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const features = [
    {
        image: "https://cdn-icons-png.flaticon.com/512/9799/9799759.png",
        title: "Smart Insights",
        description:
            "Our AI analyzes your past spending to provide real-time suggestions that help you save more and spend smarter.",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/512/4149/4149658.png",
        title: "Dynamic Visualizations",
        description:
            "Understand your finances at a glance with interactive charts and personalized dashboards.",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png",
        title: "Secure & Private",
        description:
            "Your financial data is encrypted end-to-end, ensuring your privacy and security are always protected.",
    },
    {
        image: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
        title: "Budget Automation",
        description:
            "Set goals and let our AI auto-adjust your budgets monthly to keep you on track with minimal effort.",
    },
];

const AboutPage = () => {
    return (
        <motion.div
            className="container mt-5 pt-5"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                className="text-center mb-4"
                variants={itemVariants}
            >
                <strong>About Smart Finance Tracker</strong>
            </motion.h1>

            <motion.p
                className="text-center lead mb-5"
                variants={itemVariants}
            >
                SmartBudgetAI is your intelligent partner in personal finance. Powered by AI, our platform tracks expenses,
                predicts spending habits, and helps you build smarter budgets tailored to your lifestyle.
            </motion.p>

            <div className="row">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="col-md-6 col-lg-3 mb-4"
                        variants={itemVariants}
                    >
                        <div className="card h-100 shadow-sm border-0 transition-transform" style={{ transition: 'transform 0.3s' }}>
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="card-img-top p-3"
                                style={{ height: "120px", objectFit: "contain" }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{feature.title}</h5>
                                <p className="card-text text-muted">{feature.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default AboutPage;
