import React from 'react'
import Card from '../Webpage/Card.jsx'
import { useNavigate } from 'react-router-dom';

const Fans = ({products}) => {
  const navigate = useNavigate();
  const handleBookNow = (product) => {
    navigate('/booknow', { state: product });
  };

    return (
      <div className='homecard'>
      {products.map((products, index) => (
        products.category === 'fan' ? (
          <Card key={index} product={products} onBookNow={handleBookNow} />
        ) : null
      ))}
    </div>
    )
}
export default Fans;