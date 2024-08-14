
import React from 'react';
let server = 'https://marketforrentalequipments-backend-1.onrender.com';
import "../My_Styles/Card.css";

const Card = ({ product, onBookNow }) => {

  const handleBookNow = async () => {
    onBookNow(product);
  };



  return (
    <div className='cards'>
      <div className="card mb-3" style={{ maxWidth: "500px" }}>
        <div className="row no-gutters">
          <div className="col-md-5">
            <img className="image" src={product.image} alt={product.name} />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title"><b>{product.name}</b></h5>
              <p className="card-text"><small className="text-muted">{product.type}</small></p>
              <p className='price'>Rs {product.price}</p>
              {product.available ? (
                <div className='bookbutton'>
                  <button className="btn btn-success">Available</button>
                  <button type="button" className="btn btn-outline-info" onClick={handleBookNow}>
                    Book Now
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-danger"><b>Not Available</b></p>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;








