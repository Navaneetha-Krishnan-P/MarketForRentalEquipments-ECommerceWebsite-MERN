import React, { useState, useEffect } from 'react';
import Card from './Card';
import "../My_Styles/Home.css";
import { useNavigate } from 'react-router-dom';
import { Text } from './Text';

const Home = ({ products, searchData }) => {
  const [home, setHome] = useState([]);
  const navigate = useNavigate();

  let keywords = [];
  let matchedProducts = [];

  const fetchData = () => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].search && typeof products[i].search === 'string') {
        keywords.push(products[i].search.split(","));
      }
    }
    for (let j = 0; j < keywords.length; j++) {
      for (let k = 0; k < keywords[j].length; k++) {
        if (searchData.toLowerCase().trim() === keywords[j][k].toLowerCase().trim()) {
          matchedProducts.push(products[j]);
        }
      }
    }
    setHome(matchedProducts);
  };
  

  useEffect(() => {
    fetchData();
  }, [searchData]);

  const handleBookNow = (product) => {
    navigate('/booknow', { state: product });
  };

  return (
    <div>
      {searchData === "" ? (
        <div className='homecard'>
          {products.map((all, index) => (
            <div key={index}>
              <Card product={all} onBookNow={handleBookNow} />
            </div>
          ))}
        </div>
      ) : (
        <div className='homecard'>
          {home.map((search, index) => (
            <div key={index}>
              <Card product={search} onBookNow={handleBookNow} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;


