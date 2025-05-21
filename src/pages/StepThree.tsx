import React, { useEffect, useState } from 'react';
import ProductRecommendations, { Product } from '../components/ProductRecommendations';
import './StepThree.css';

const StepThree: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedResult = localStorage.getItem('analysisResult');
    if (storedResult) {
      try {
        const parsed = JSON.parse(storedResult);

        console.log('✅ 추천 제품 리스트:', parsed.recommend); // 확인용 로그

        if (parsed.recommend && Array.isArray(parsed.recommend)) {
          const convertedProducts: Product[] = parsed.recommend.map((item: any) => ({
            brand: item.브랜드,
            name: item.제품명,
            volumePrice: item['용량/가격'],
            rating: parseFloat(item.별점),
            reviewCount: 0,
            tags: item.태그,
            image: item.이미지,
            link: item.제품링크
          }));

          setProducts(convertedProducts);
        }
      } catch (error) {
        console.error('❌ 분석 결과 파싱 오류:', error);
      }
    } else {
      console.warn('❗ 추천 데이터가 없습니다.');
    }
  }, []);

  return (
    <div className="StepThreeContainer">
      <ProductRecommendations products={products} />
    </div>
  );
};

export default StepThree;
