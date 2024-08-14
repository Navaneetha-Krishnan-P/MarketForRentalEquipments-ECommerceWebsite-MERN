import React from 'react'
import Card from '../Webpage/Card.jsx'
import { useNavigate } from 'react-router-dom';

const Bikes = ({products}) => {
  const navigate = useNavigate();
  const handleBookNow = (product) => {
    navigate('/booknow', { state: product });
  };

    return (
      <div className='homecard'>
      {products.map((products, index) => (
        products.category === 'bike' ? (
          <Card key={index} product={products} onBookNow={handleBookNow} />
        ) : null
      ))}
    </div>
    )
}
export default Bikes;