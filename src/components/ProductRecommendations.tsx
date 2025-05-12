// src/components/ProductRecommendations.tsx

import React from 'react';

interface Product {
    category: string;
    brand: string;
    name: string;
    tags: string[];
    volumePrice: string;
    }

    interface ProductRecommendationsProps {
    products: Product[];
    }

    const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ products }) => {
    return (
        <div>
        <h2 className="recommend-title">당신에게 추천하는 화장품 TOP 5</h2>
        <ul className="product-list">
            {products.map((product, idx) => (
            <li key={idx} className="product-card">
                <div className="product-header">
                {product.category} - {product.brand}
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-tags">{product.tags.join(' ')}</div>
                <div className="product-volume">{product.volumePrice}</div>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default ProductRecommendations;
