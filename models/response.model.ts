import mongoose, { Document, Schema, Model , Types} from 'mongoose';
import {IQuestion} from './question.model';

interface IResponse extends Document {
  quesId: IQuestion;
  status: number;
  userId: Types.ObjectId;
  ansId: number;
}

const responseSchema: Schema<IResponse> = new Schema({
  quesId: { type: Schema.Types.ObjectId, ref:'Question', required: true },
  status : { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref:'Student',required: true },
  ansId: { type: Number, required: true },
}, { versionKey : false });

const ResponseModel: Model<IResponse> = mongoose.model<IResponse>('Response', responseSchema);

export default ResponseModel;