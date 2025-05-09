// frontend/src/components/ReportChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportChart = ({ data }) => {
  const formattedData = Object.entries(data).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie data={formattedData} dataKey="value" nameKey="name" outerRadius={100}>
        {formattedData.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ReportChart;
