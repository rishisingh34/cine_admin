import { Schema, Document, model, Types } from 'mongoose';
interface Response {
    quesId : string;
    question :string ; 
    ans: string;
}
interface IFeedbackResponse extends Document {
    student: Types.ObjectId; 
    response : Response[];
}

const FeedbackResponseSchema = new Schema<IFeedbackResponse>({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    response : [{
        quesId : { type: String, required: true },
        question: { type: String, required: true },
        ans: { type: String, required: true }
    }]
});

const FeedbackResponseModel = model<IFeedbackResponse>('FeedbackResponse', FeedbackResponseSchema);

export default FeedbackResponseModel;
