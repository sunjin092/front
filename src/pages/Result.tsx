// src/pages/Result.tsx

import React, { useEffect, useState } from 'react';
import './Result.css';
import AnalysisResult from '../components/AnalysisResult';
import ProductRecommendations from '../components/ProductRecommendations';

interface AnalysisResult {
  pores: number;
  elasticity: number;
  moisture: number;
}

interface Product {
  category: string;
  brand: string;
  name: string;
  tags: string[];
  volumePrice: string;
}

const sampleProducts: Product[] = [
  {
    category: '수분크림',
    brand: '라네즈',
    name: '워터뱅크 블루 히알루로닉 크림',
    tags: ['#수분공급', '#피부진정', '#저자극'],
    volumePrice: '50ml / 38,000원',
  },
  {
    category: '에센스',
    brand: '이니스프리',
    name: '그린티 씨드 세럼',
    tags: ['#보습', '#피부탄력', '#저자극'],
    volumePrice: '80ml / 25,000원',
  },
  {
    category: '토너',
    brand: '닥터지',
    name: '레드 블레미쉬 수딩 토너',
    tags: ['#피부진정', '#수분공급', '#비건뷰티'],
    volumePrice: '200ml / 20,000원',
  },
  {
    category: '크림',
    brand: '센텔리안24',
    name: '마데카 크림',
    tags: ['#피부재생', '#주름개선', '#저자극'],
    volumePrice: '50ml / 32,000원',
  },
  {
    category: '앰플',
    brand: '미샤',
    name: '타임 레볼루션 나이트 리페어 앰플',
    tags: ['#탄력강화', '#주름개선', '#수분공급'],
    volumePrice: '50ml / 36,000원',
  },
];

const Result: React.FC = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('analysisResult');
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      setResult({
        pores: 472,
        elasticity: 0.5,
        moisture: 0.84,
      });
    }
  }, []);

  if (!result) return <div>분석 결과를 불러오는 중입니다...</div>;

  return (
        <div className="result-container">
            

            {/* 분석 결과 박스 */}
            <div className="analysis-result-box">
                
                <AnalysisResult pores={result.pores} elasticity={result.elasticity} moisture={result.moisture} />
            </div>

            {/* 화장품 추천 박스 */}
            <div className="product-recommendations-box">
                <ProductRecommendations products={sampleProducts} />
            </div>
        </div>
    );
};

export default Result;
