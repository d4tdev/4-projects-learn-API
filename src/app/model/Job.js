import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
   company: {
      type: String,
      required: [true, 'product company must be provided'],
      maxLength: 50,
   },
   position: {
      type: String,
      required: [true, 'product position must be provided'],
      maxLength: 100,
   },
   status: {
      type: String,
      enum: ['interview','declined','pending'],
      default: 'pending',
   },
   createdBy: {
      type:mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'product user must be provided']
   }
}, {timestamps: true})

export default mongoose.model('Job', JobSchema);
