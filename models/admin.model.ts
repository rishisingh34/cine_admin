import mongoose, { Document, Schema, Model } from 'mongoose';
interface IAdmin extends Document {
  username : string ;
  password : string ;
}

const adminSchema: Schema<IAdmin> = new Schema({
  username : { type : String, required : true , unique : true },
  password : { type : String, required : true }
});

const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;


// question id { 1 - 50 or 60 } denotes the exact question and its category no need for category 
// options.id { 1 - 4 } denotes the option number
// answer { 1 - 4 } denotes the correct option number