const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateTransactionReport(transactions, filePath, timeFrame) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc.fontSize(20).text(`Transaction Report - ${timeFrame}`, { align: 'center' });
        doc.moveDown();

        transactions.forEach((tx, index) => {
            doc.fontSize(14).text(`${index + 1}. Date: ${tx.date.toDateString()}`);
            doc.text(`   Amount: ₹${tx.amount}`);
            doc.text(`   Category: ${tx.category}`);
            doc.text(`   Type: ${tx.type}`);
            if (tx.note) doc.text(`   Note: ${tx.note}`);
            doc.moveDown();
        });

        doc.end();

        stream.on('finish', () => resolve());
        stream.on('error', (err) => reject(err));
    });
}

module.exports = generateTransactionReport;
