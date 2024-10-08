import exp from 'constants';
import mongoose, { Document, Schema, Model } from 'mongoose';

interface IOption {
  desc: string;
  id: number;
}

interface IQuestion extends Document {
  subject: string;
  question: string;
  options: IOption[];
  answer: number;
}

const optionSchema: Schema<IOption> = new Schema({
  desc: { type: String, required: true },
  id: { type: Number, required: true }
}, { _id: false }); 

const questionSchema: Schema<IQuestion> = new Schema({
  subject: { type: String, required: true },
  question: { type: String, required: true },
  options: [optionSchema], 
  answer: { type: Number, required: true }
}, { versionKey: false });

const Question: Model<IQuestion> = mongoose.model<IQuestion>('Question', questionSchema);

export { IQuestion, Question };