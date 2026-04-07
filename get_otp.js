const mongoose = require('mongoose');
const OTP = require('./models/OTP');

mongoose.connect('mongodb://127.0.0.1:27017/mindguard').then(async () => {
   const otps = await OTP.find({});
   console.log("AVAILABLE OTPS IN DB:");
   console.log(otps);
   process.exit(0);
});
