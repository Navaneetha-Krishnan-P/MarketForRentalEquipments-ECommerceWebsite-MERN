import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

let server = 'https://market-for-rental-equipments-e-commerce-website-mern.vercel.app';

export const Booknow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  const total = parseFloat(product.price.split('/')[0]);

  const today = new Date().toISOString().split('T')[0];

  const formik = useFormik({
    initialValues: {
      fullname: '',
      address: '',
      fromDate: '',
      toDate: '',
      totalDays: 0
    },
    validate: values => {
      const errors = {};
      if (!values.fullname) {
        errors.fullname = 'Enter Full Name';
      }
      if (!values.address) {
        errors.address = 'Enter Address';
      }
      if (!values.fromDate) {
        errors.fromDate = 'Enter From Date';
      }
      if (!values.toDate) {
        errors.toDate = 'Enter To Date';
      }
      if (!values.totalDays) {
        errors.totalDays = 'Enter Total No. of Days / Months';
      } else if (isNaN(values.totalDays)) {
        errors.totalDays = 'Total No. of Days should be an integer';
      }
      return errors;
    },
    onSubmit: async values => {
      const totalAmount = Math.round(total * values.totalDays * 100);

      if (isNaN(totalAmount) || totalAmount < 100) {
        alert("Total amount should be at least Rs 1 (100 paise)");
        return;
      }

      try {
        const orderResponse = await axios.post(server + '/createOrder', { amount: totalAmount });
        const order = orderResponse.data;
        console.log('order: ', order);

        if (window.Razorpay) {
          const options = {
            key: 'rzp_test_HPtpbhH8zAW0B5',
            amount: totalAmount,
            currency: 'INR',
            name: product.name,
            description: 'Product Purchase',
            order_id: order.id,
            handler: async (response) => {
              try {
                await axios.post(server + '/updateProductAvailability', { id: product.id, available: false });
                navigate('/');
              } catch (error) {
                console.error('Error updating product availability:', error);
              }
            },
            prefill: {
              name: values.fullname,
              email: 'customer@example.com',
              contact: '9999999999'
            },
            theme: {
              color: '#3399cc'
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          console.error('Razorpay SDK not available');
        }
      } catch (error) {
        console.error('Error creating Razorpay order:', error);
      }
    }
  });

  return (
    <div>
      <div className='cards'>
        <div className="card mb-3" style={{ maxWidth: "700px" }}>
          <div className="row no-gutters">
            <div className="col-md-5">
              <img className="image" src={product.image} alt={product.name} />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title"><b>{product.name}</b></h5>
                <p className="card-text"><small className="text-muted">{product.type}</small></p>
                <p className='price'>Rs {product.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ color: "red", textAlign: "center" }}><p><b>For Order Confirmation, Enter all the below Details !</b></p></div>

      <div className='login'>
        <form className='userinfo' onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname"><b>Full Name</b></label><br />
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            /><br />
            {formik.touched.fullname && formik.errors.fullname ? (
              <div className="error" style={{ color: 'red' }}>{formik.errors.fullname}</div>
            ) : null}
          </div><br />

          <div className="form-group">
            <label htmlFor="address"><b>Address for Delivery</b></label><br />
            <textarea
              style={{ width: "300px" }}
              className="textarea"
              placeholder='Kindly enter your full address, it will be used for your delivery!'
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows="3"
            ></textarea>
            {formik.touched.address && formik.errors.address ? (
              <div className="error" style={{ color: 'red' }}>{formik.errors.address}</div>
            ) : null}
          </div><br />

          <div>
            <label htmlFor="fromDate"><b>From Date</b></label><br />
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={formik.values.fromDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={today}
            /><br />
            {formik.touched.fromDate && formik.errors.fromDate ? (
              <div className="error" style={{ color: 'red' }}>{formik.errors.fromDate}</div>
            ) : null}
          </div><br />

          <div>
            <label htmlFor="toDate"><b>To Date</b></label><br />
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={formik.values.toDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={today}
            /><br />
            {formik.touched.toDate && formik.errors.toDate ? (
              <div className="error" style={{ color: 'red' }}>{formik.errors.toDate}</div>
            ) : null}
          </div><br />

          <div className="form-group">
            <label htmlFor="totalDays"><b>Total No. of Days / Months</b></label><br />
            <input
              type="text"
              id="totalDays"
              name="totalDays"
              value={formik.values.totalDays}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            /><br />
            {formik.touched.totalDays && formik.errors.totalDays ? (
              <div className="error" style={{ color: 'red' }}>{formik.errors.totalDays}</div>
            ) : null}
          </div><br />

          <div><b>Total Amount = Rs {total * formik.values.totalDays} </b></div><br />

          <div className='buttongroup'>
            <button type="submit" className="btn btn-success"><b>Pay to Confirm Order</b></button>
          </div><br />
          <p>
            Your order will be delivered to your address on time!
          </p>
        </form>
      </div>
    </div>
  );
};











