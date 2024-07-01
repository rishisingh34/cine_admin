import mongoose, { Document, Schema, Model, Types} from 'mongoose';

interface IVisited extends Document {
  userId: Types.ObjectId;
  quesId: Types.ObjectId[];
}

const visitedSchema: Schema<IVisited> = new Schema({
  quesId: [{ type: Schema.Types.ObjectId, ref:'Question', required: true }],
  userId: { type: Schema.Types.ObjectId, ref:'Student', required: true },
});

const Visited: Model<IVisited> = mongoose.model<IVisited>('Visited', visitedSchema);

export default Visited;

// userId denotes mongoose object id of the user
// quesId array of numbers that are visited by the user