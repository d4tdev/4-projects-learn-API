import mongoose from 'mongoose';
require('dotenv').config();

const connect = async () => {
   try {
      await mongoose.connect(process.env.URL_DB, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         // useCreateIndex: true,
         // useFindAndModify: false,
      })
      console.log('Connected to MongoDB');
   } catch (error) {
      console.log(error)
   }
};

export default { connect };