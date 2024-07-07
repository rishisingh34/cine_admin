import mongoose, { Document, Schema, Model } from 'mongoose';
interface IVisited extends Document {
  userId: mongoose.Types.ObjectId;
  quesId: mongoose.Types.ObjectId[];
}
const visitedSchema: Schema<IVisited> = new Schema({
  quesId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
}, {versionKey : false } );
const Visited: Model<IVisited> = mongoose.model<IVisited>('Visited', visitedSchema);
export default Visited;