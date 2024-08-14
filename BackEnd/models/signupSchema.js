const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    newFirstname:String,
    newLastname:String,
    newDob:String,
    newEmail:String,
    newPassword:String,
})
const SignUpDetails =mongoose.model("SignUpDetails",signUpSchema)
module.exports=SignUpDetails;