import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  lat:       { type: Number, required: true },
  lng:       { type: Number, required: true },
  time:      { type: Date,   required: true },
});
 
export default mongoose.model('Location', locationSchema);