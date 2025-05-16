import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenerateReport = () => {
    const [format, setFormat] = useState('pdf');
    const [email, setEmail] = useState('');
    const [range, setRange] = useState('weekly');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    // Automatically calculate dates when range changes (unless 'custom')
    useEffect(() => {
        const today = new Date();
        let start, end = today.toISOString().split('T')[0];

        if (range === 'weekly') {
            start = new Date(today.setDate(today.getDate() - 7));
        } else if (range === 'monthly') {
            start = new Date(today.setMonth(today.getMonth() - 1));
        } else if (range === 'yearly') {
            start = new Date(today.setFullYear(today.getFullYear() - 1));
        }

        if (range !== 'custom') {
            setStartDate(start.toISOString().split('T')[0]);
            setEndDate(end);
        }
    }, [range]);

    const handleGenerateAndSend = async () => {
        if (!email || !startDate || !endDate) {
            alert('Please fill in all fields');
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            alert('User not authenticated. Please log in again.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:3000/api/transaction-report',
                { range, format, startDate, endDate, sendTo: email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert(response.data.message || 'Report sent successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to send report.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow p-4 mt-4">
            <h5>Generate & Email Report</h5>
            <div className="row mb-3">
                <div className="col-md-3">
                    <label>Format</label>
                    <select className="form-select" value={format} onChange={(e) => setFormat(e.target.value)}>
                        <option value="pdf">PDF</option>
                        <option value="csv">CSV</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <label>Date Range</label>
                    <select className="form-select" value={range} onChange={(e) => setRange(e.target.value)}>
                        <option value="weekly">Last 7 Days</option>
                        <option value="monthly">Last 1 Month</option>
                        <option value="yearly">Last 1 Year</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>

                {range === 'custom' && (
                    <>
                        <div className="col-md-3">
                            <label>Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label>End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <div className="col-md-3 mt-2 mt-md-0">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.com"
                    />
                </div>
            </div>

            <div className="text-end">
                <button className="btn btn-success" onClick={handleGenerateAndSend} disabled={loading}>
                    {loading ? 'Sending...' : 'Generate and Send'}
                </button>
            </div>
        </div>
    );
};

export default GenerateReport;
