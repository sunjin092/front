import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, annotationPlugin);

interface AnalysisResultProps {
  graphData: {
    '수분': number;
    '탄력': number;
    '색소침착': number;
    '모공': number;
  };
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ graphData }) => {
  const labels = ['색소침착', '수분', '탄력', '모공'];

  // ✅ 색소침착과 모공은 z-score가 클수록 bad → 반전 적용
  const rawZ = {
    색소침착: -graphData['색소침착'],
    수분: graphData['수분'],
    탄력: graphData['탄력'],
    모공: -graphData['모공'],
  };

  // ✅ 좌표 시각화를 위한 +2 보정
  const dataValues = [
    rawZ['색소침착'] + 2,
    rawZ['수분'] + 2,
    rawZ['탄력'] + 2,
    rawZ['모공'] + 2,
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
        ticks: {
          color: '#FF5E99',
          callback: () => '', // 눈금 텍스트 숨김
        },
        title: {
          display: true,
          text: '',
        },
        grid: {},
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
          drawTicks: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;
            const label = context.chart.data.labels?.[index];
            const rawValue = Object.values(rawZ)[index];
            return `${label}: z-score ${rawValue.toFixed(2)}`;
          },
        },
      },
      title: {
        display: true,
        text: '피부 진단 지표',
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
