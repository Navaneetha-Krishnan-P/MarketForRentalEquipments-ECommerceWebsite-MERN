const mongoose = require('mongoose');


const adminDetailsSchema = new mongoose.Schema({
    adminId: String,
    adminEmail: String,
    adminPw:String,
});
const AdminDetails = mongoose.model('AdminDetails', adminDetailsSchema);
module.exports = AdminDetails;



 