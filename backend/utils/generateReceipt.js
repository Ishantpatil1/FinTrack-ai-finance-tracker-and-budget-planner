const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateReceipt(data, filePath) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc.fontSize(22).text('Expense Receipt', { align: 'center' }).moveDown();
        doc.fontSize(14).text(`Amount: ₹${data.amount}`);
        doc.text(`Date: ${data.date}`);
        doc.text(`Category: ${data.category}`);
        if (data.note) {
            doc.text(`Note: ${data.note}`);
        }
        doc.moveDown().text('Thank you for using our service!', { align: 'center' });

        doc.end();

        stream.on('finish', () => resolve());
        stream.on('error', (err) => reject(err));
    });
}

module.exports = generateReceipt;
