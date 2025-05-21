import React from 'react';

export interface Product {
  brand: string;
  name: string;
  volumePrice: string;
  rating: number;
  reviewCount?: number;
  tags: string[];
  image: string;
  link?: string;
}

interface ProductRecommendationsProps {
  products: Product[];
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ products }) => {
  return (
    <div className='result-box'>
      <h2 className="recommend-title">당신에게 추천하는 화장품 TOP 5</h2>
      <ul className="product-list">
        {products.map((product, idx) => (
          <li key={idx} className="product-card">
            {/* 텍스트 정보 */}
            <div className="product-info">
              <div className="product-header">{product.brand}</div>
              <div className="product-name">{product.name}</div>
              <div className="product-tags">
                {product.tags.map((tag, i) => (
                  <span key={i} className="product-tag">#{tag} </span>
                ))}
              </div>
              <div className="product-volume">{product.volumePrice}</div>
              <div className="product-rating">⭐ {product.rating}</div>
            </div>

            {/* 이미지 및 링크 */}
            <div className="product-media">
              <img src={product.image} alt={product.name} className="product-image" />
              {product.link && (
                <div className="product-link">
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    제품 보러가기 🔗
                  </a>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRecommendations;
