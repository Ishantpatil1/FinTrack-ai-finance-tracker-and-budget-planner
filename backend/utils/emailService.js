const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

async function sendReceiptEmail(toEmail, filePath, data) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        secure: true,
        port: 465
    });

    const htmlBody = `
        <h3>Your Expense Receipt</h3>
        <p><strong>Amount:</strong> ₹${data.amount}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Category:</strong> ${data.category}</p>
        ${data.note ? `<p><strong>Note:</strong> ${data.note}</p>` : ''}
        <p>Thank you for using our Expense Tracker!</p>
    `;

    await transporter.sendMail({
        from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: 'Your Expense Receipt',
        html: htmlBody,
        attachments: [
            {
                filename: 'receipt.pdf',
                path: filePath
            }
        ]
    });
}

const sendReportEmail = async (toEmail, filePath, range) => {
    try {
        console.log("📤 Preparing email...");

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS  // your app password
            }
        });

        const attachment = fs.readFileSync(filePath);
        console.log("📎 Attachment loaded from file path.");

        const info = await transporter.sendMail({
            from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: `Your ${range} Transaction Report`,
            text: `Attached is your ${range} transaction report.`,
            attachments: [
                {
                    filename: `Transaction_Report_${range}.pdf`,
                    content: attachment,
                    contentType: 'application/pdf'
                }
            ]
        });

        console.log("✅ Email sent response:", info.response);
    } catch (err) {
        console.error("🚨 Error sending email:", err);
        throw err;
    }
};

module.exports = { sendReceiptEmail, sendReportEmail };



