import React, { useState, useRef } from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';

const AddTransactionForm = ({ fetchTransactions }) => {
  const [mode, setMode] = useState('manual'); // manual | ocr
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    category: '',
    note: '',
    type: 'income',
    date: '',
    isRecurring: false,
    frequency: '',
    endDate: '',
  });

  const [ocrImage, setOcrImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [ocrLoading, setOcrLoading] = useState(false);
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:3000/api/addnewtransaction',
        newTransaction,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTransactions();
      setNewTransaction({
        amount: '',
        category: '',
        note: '',
        type: 'income',
        date: '',
        isRecurring: false,
        frequency: '',
        endDate: '',
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleOcrImageChange = (e) => {
    const file = e.target.files[0];
    setOcrImage(file);
    setOcrText('');
  };

  const formatDate = (rawDate) => {
    const parts = rawDate.split(/[\/\-]/);
    if (parts.length !== 3) return '';
    if (parts[2].length === 2) parts[2] = '20' + parts[2];
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  };

  const handleOcrScan = () => {
    if (!ocrImage) return;
    setOcrLoading(true);

    Tesseract.recognize(
      ocrImage,
      'eng',
      { logger: (m) => console.log(m) }
    ).then(async ({ data: { text } }) => {
      setOcrText(text);
      try {
        const response = await axios.post('http://localhost:3000/api/extract', { text });
        const extracted = response.data;
        const formattedDate = extracted.date ? formatDate(extracted.date) : '';
        setNewTransaction((prev) => ({
          ...prev,
          ...extracted,
          date: formattedDate,
          type: 'expense',
        }));
      } catch (error) {
        console.error('Error sending OCR text to backend:', error);
      }
      setOcrLoading(false);
    }).catch(err => {
      console.error('Tesseract error:', err);
      setOcrLoading(false);
    });
  };

  // 🎤 Speech Recognition
  const handleStartListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in your browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = async (event) => {
      const speechText = event.results[0][0].transcript;
      console.log('🎙️ Speech recognized:', speechText);
      try {
        const response = await axios.post('http://localhost:3000/api/extract', { text: speechText });
        const extracted = response.data;
        const formattedDate = extracted.date ? formatDate(extracted.date) : '';
        setNewTransaction((prev) => ({
          ...prev,
          ...extracted,
          date: formattedDate,
        }));
      } catch (err) {
        console.error('Speech to transaction error:', err);
      }
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <div className="d-flex justify-content-around mb-3">
        <button
          className={`btn ${mode === 'manual' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setMode('manual')}
        >
          Manual Entry
        </button>
        <button
          className={`btn ${mode === 'ocr' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setMode('ocr')}
        >
          Scan With (AI)
        </button>
      </div>

      {mode === 'manual' ? (
        <>
          <h4>Add Transaction Manually</h4>
          <form onSubmit={handleAddTransaction}>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                name="amount"
                value={newTransaction.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="category"
                value={newTransaction.category}
                onChange={handleChange}
                placeholder="Category"
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                name="note"
                value={newTransaction.note}
                onChange={handleChange}
                placeholder="Note"
              />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                name="type"
                value={newTransaction.type}
                onChange={handleChange}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                name="date"
                value={newTransaction.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isRecurring"
                name="isRecurring"
                checked={newTransaction.isRecurring}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="isRecurring">
                <h4>Recurring Transaction</h4>
                <p>Setup schedule for recurring transaction</p>
              </label>
            </div>

            {newTransaction.isRecurring && (
              <>
                <div className="mb-3">
                  <label>Frequency</label>
                  <select
                    className="form-select"
                    name="frequency"
                    value={newTransaction.frequency}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>End Date (optional)</label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={newTransaction.endDate}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-success w-100">
              Add Transaction
            </button>
          </form>

          {/* 🎤 Speech to Transaction Button */}
          <button
            className="btn btn-outline-secondary mt-3 w-100"
            onClick={handleStartListening}
            disabled={isListening}
          >
            {isListening ? 'Listening...' : '🎤 Speak Transaction'}
          </button>
        </>
      ) : (
        <>
          <h4>Upload Receipt Image</h4>
          <input type="file" accept="image/*" onChange={handleOcrImageChange} className="form-control mb-3" />
          <button onClick={handleOcrScan} disabled={ocrLoading || !ocrImage} className="btn btn-secondary mb-3 w-100">
            {ocrLoading ? 'Scanning...' : 'Scan & Autofill'}
          </button>
          {ocrText && (
            <div className="alert alert-light">
              <strong>Extracted Text:</strong>
              <pre className="mb-0">{ocrText}</pre>
            </div>
          )}
          <button onClick={handleAddTransaction} className="btn btn-success w-100" disabled={!newTransaction.amount}>
            Add Transaction from OCR
          </button>
        </>
      )}
    </div>
  );
};

export default AddTransactionForm;
