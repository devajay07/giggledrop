const mongoose = require('mongoose');
// require('dotenv').config();

const dbConnect = ()=>{
    const url = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD);
    mongoose.set('strictQuery', false);
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB', error);
      });
}

module.exports = dbConnect;
