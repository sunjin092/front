// src/components/AnalysisResult.tsx

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

interface AnalysisResultProps {
  pores: number;
  elasticity: number;
  moisture: number;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ pores, elasticity, moisture }) => {
  const getColor = (value: number) => {
    if (value < 0.5) return '#F28C8C';
    if (value < 0.8) return '#6FCF97';
    return '#A2D5F2';
  };

  const chartData = [
    {
      name: '탄력도',
      value: elasticity,
      color: getColor(elasticity),
    },
    {
      name: '수분도',
      value: moisture,
      color: getColor(moisture),
    },
  ];

  return (
    <div>
        <h2 className="title">피부 분석 결과</h2>
        <div className="legend">
                        <div className="legend-box low">낮음</div>
                        <div className="legend-box medium">중간</div>
                        <div className="legend-box high">높음</div>
                        </div>
        <h3 className="subtitle">모공 수</h3>
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[{ name: '모공 수', value: pores, color: '#F4A9A8' }]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" isAnimationActive>
                <Cell fill="#F4A9A8" />
            </Bar>
            </BarChart>
        </ResponsiveContainer>

        <h3 className="subtitle">피부 상태</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" isAnimationActive>
                {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
                ))}
            </Bar>
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
};

export default AnalysisResult;
