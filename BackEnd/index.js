const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");

const AdminDetails = require("./models/adminSchema");
const SignUpDetails = require("./models/signupSchema");
const ProductDetails = require("./models/productsSchema");

const app = express();
app.use(express.json());
app.use(cors({origin:["https://market-for-rental-equipments-e-commerce-website-mern-v5yl.vercel.app"]}));
app.use(parser.json());


require("dotenv").config();
const port = process.env.PORT || 5001;

const username = "new_user-01";
const password = "Krish2309";
const cluster = "cluster0";
const dbname = "RentalMarket";

const uri = `mongodb+srv://${username}:${password}@${cluster}.hotzxyg.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Atlas connection successful!"))
  .catch((err) => console.error("MongoDB Atlas connection error:", err));

// To get product details
app.get("/productDetails", async (req, res) => {
  try {
    const products = await ProductDetails.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products details", error });
  }
});

// To get admin details
app.get("/admin", async (req, res) => {
  try {
    const adminDetails = await AdminDetails.find({});
    res.status(200).json(adminDetails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin details", error });
  }
});

// To get login details
app.get("/login", async (req, res) => {
  try {
    const loginDetails = await SignUpDetails.find({});
    res.status(200).json(loginDetails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching login details", error });
  }
});

// To add and get signup details
app.post("/signUp", async (req, res) => {
  let firstName = req.body.newFirstname;
  let lastName = req.body.newLastname;
  let dob = req.body.newDob;
  let newEmail = req.body.newEmail;
  let newPassword = req.body.newPassword;

  const signUpDetails = new SignUpDetails({
    newFirstname: firstName,
    newLastname: lastName,
    newDob: dob,
    newEmail: newEmail,
    newPassword: newPassword,
  });
  await signUpDetails.save();
  const loginDetails = await SignUpDetails.find({});
  res.status(200).send(loginDetails);
});

// To add and get product details
app.post("/products", async (req, res) => {
  const { id, category, name, type, image, price, search, available } = req.body;

  const productDetails = new ProductDetails({
    id,
    category,
    name,
    type,
    image,
    price,
    search,
    available,
  });

  try {
    await productDetails.save();
    console.log("Product saved:", productDetails); 
    const getProductDetails = await ProductDetails.find({});
    res.status(200).send(getProductDetails);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).send({ message: "Error saving product", error });
  }
});

app.get("/product/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await ProductDetails.findOne({ id: productId });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// To update product details
app.put("/product/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const updatedProduct = await ProductDetails.findOneAndUpdate(
      { id: productId },
      req.body,
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// To delete a product
app.delete("/product/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await ProductDetails.findOneAndDelete({ id: productId });
    if (deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

// To update password
app.post("/updatePassword", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await SignUpDetails.findOneAndUpdate(
      { newEmail: email },
      { newPassword: newPassword },
      { new: true }
    );
    if (user) {
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error });
  }
});

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order endpoint
app.post("/createOrder", async (req, res) => {
  try {
    const order = await razorpayInstance.orders.create({
      amount: req.body.amount,
      currency: "INR",
      receipt: "order_rcptid_" + Math.floor(Math.random() * 1000),
    });
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

// Update product availability
app.post("/updateProductAvailability", async (req, res) => {
  const { id, available } = req.body;
  try {
    const product = await ProductDetails.findOneAndUpdate(
      { id },
      { available },
      { new: true }
    );
    if (product) {
      res.status(200).json({ message: "Product availability updated", product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product availability", error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




