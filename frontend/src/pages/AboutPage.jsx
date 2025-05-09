// frontend/src/pages/AboutPage.jsx

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
        icon: "💰",
        title: "AI-Powered Insights",
        description:
            "Our AI analyzes your past spending to provide real-time suggestions that help you save more and spend smarter.",
    },
    {
        icon: "📊",
        title: "Dynamic Visualizations",
        description:
            "Understand your finances at a glance with interactive charts and personalized dashboards.",
    },
    {
        icon: "🔒",
        title: "Secure & Private",
        description:
            "Your financial data is encrypted end-to-end, ensuring your privacy and security are always protected.",
    },
    {
        icon: "🤖",
        title: "Budget Automation",
        description:
            "Set goals and let our AI auto-adjust your budgets monthly to keep you on track with minimal effort.",
    },
];

const AboutPage = () => {
    return (
        <motion.div
            className="min-h-screen mt-16 sm:mt-20 md:mt-24 px-6 sm:px-10 py-12 bg-gradient-to-r from-indigo-100 to-purple-200 text-gray-800"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1 className="text-4xl mt-5 sm:text-5xl font-bold mb-6 text-center" variants={itemVariants}>
                About SmartBudgetAI
            </motion.h1>

            <motion.p
                className="text-lg sm:text-xl mb-12 max-w-4xl mx-auto text-center leading-relaxed"
                variants={itemVariants}
            >
                SmartBudgetAI is your intelligent partner in personal finance. Powered by AI, our platform tracks expenses,
                predicts spending habits, and helps you build smarter budgets tailored to your lifestyle.
            </motion.p>

            <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 px-2 md:px-10"
                variants={containerVariants}
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start gap-3 transition-transform hover:scale-105 hover:shadow-2xl duration-300"
                        variants={itemVariants}
                    >
                        <div className="text-4xl">{feature.icon}</div>
                        <h2 className="text-xl font-semibold">{feature.title}</h2>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default AboutPage;
