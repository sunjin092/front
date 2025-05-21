import React, { useEffect, useState } from 'react';
import ProductRecommendations, { Product } from '../components/ProductRecommendations';
import data from '../data/data.json';  // data.json 경로에 맞게 수정하세요
import './StepThree.css';

const StepThree: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // data.json의 recommend 배열을 Product[] 형태로 변환
    if (data && data.recommend) {
      const convertedProducts: Product[] = data.recommend.map((item: any) => ({
        brand: item.브랜드,
        name: item.제품명,
        volumePrice: item['용량/가격'],
        rating: parseFloat(item.별점),
        reviewCount: 0,  // 리뷰 개수 정보가 없으니 0 또는 생략 가능
        tags: item.태그,
        image: item.이미지,
        link: '',  // 링크 정보 없으면 빈 문자열
      }));

      setProducts(convertedProducts);
    }
  }, []);

  return (
    <div className="StepThreeContainer">
      <ProductRecommendations products={products} />
    </div>
  );
};

export default StepThree;
