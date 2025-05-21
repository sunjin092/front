import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation'; // ✅ 추가
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, annotationPlugin); // ✅ 플러그인 등록

interface AnalysisResultProps {
  graphData: {
    '수분': number;
    '탄력': number;
    '색소침착 개수': number;
    '모공 개수': number;
  };
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ graphData }) => {
  const labels = ['색소침착 개수', '수분', '탄력', '모공 개수'];

  // -2를 0으로 offset 주기 위해 모두 +2
  const dataValues = [
    graphData['색소침착 개수'] + 2,
    graphData['수분'] + 2,
    graphData['탄력'] + 2,
    graphData['모공 개수'] + 2,
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'z-score',
        data: dataValues,
        backgroundColor: '#4FC3F7',
        borderRadius: 5,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 4,
        title: {
          display: true,
          text: '',
        },
        grid: {
          // drawOnChartArea: false,
          // drawTicks: false,
          // drawBorder: false,
        },
        ticks: {
          callback: function (value: number) {
            return value === 2 ? '' : '';
          },
          color: '#FF5E99',
        },
      },
      y: {
        ticks: {
          color: '#000',
          font: {
            size: 15,
            weight: 'bold',
          },
        },
        grid: {
          // drawOnChartArea: false,
          drawTicks: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '피부 진단 지표 (z-score)',
        font: {
          size: 18,
        },
      },
      annotation: {
        annotations: {
          averageLine: {
            type: 'line',
            xMin: 2,
            xMax: 2,
            borderColor: '#FF5E99',
            borderWidth: 2,
            borderDash: [6, 4],
            label: {
              content: '선택한 나이대 평균',
              enabled: true,
              position: 'start',
              backgroundColor: 'rgba(255, 94, 153, 0.1)',
              color: '#FF5E99',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '500px', height: '400px', marginTop: '40px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AnalysisResult;
