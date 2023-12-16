import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars'
import { FaStar } from "react-icons/fa"
interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

export const ProductPage = () => {
  const API_URL = "https://fakestoreapi.com/products";

  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();

  async function fetchProductData() {
    try {
      const res = await fetch(API_URL);
      const data: Product[] = await res.json();
      console.log(data)
      const selectedProduct = data.find((p) => p.id == id);
      console.log(selectedProduct)
      setProduct(selectedProduct || null)
      
    } catch (error) {
      console.log("Error comes", error);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [id]);
  console.log(product)
  return (
    <div style={{ maxHeight: '100vh',maxWidth:'85%',margin: '0 auto' }}>
      <h1>Product Details</h1>
      {product ? (
        <div className='home-containers'>
          <div className='left'>
            <img src={product.image} className='products-image' />
          </div>
          <div className='right-product-desc'>
            <h1>{product.title}</h1>
            <h2 style={{fontSize:16,fontWeight:400}}>{product.description}</h2>
           
            <ReactStars
              count={5}
              value={product.rating.rate}
              size={30}
              edit={false}
              activeColor="#ffd700"
              emptyIcon={<FaStar />}
              fullIcon={<FaStar />}
              />
              <h3 style={{color:'green',fontWeight:600,fontSize:24}}>$:{product.price}</h3>
            <h2>No of people Purchase {product.rating.count}+</h2>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
