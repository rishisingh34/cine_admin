import { Request, Response } from 'express';
import FeedbackModel from '../models/feedback.model';
import FeedbackResponseModel from '../models/feedbackResponse.model';

const feedbackController = {
    addFeedBackQuestion : async (req: Request, res: Response): Promise<Response> => {
        try {
            const { question } = req.body;
            if (!question) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const newFeedback= new FeedbackModel({
                question
            });
            await newFeedback.save();

            return res.status(201).json({ message: "Feedback question added successfully."});
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    },
    getFeedBackQuestions : async (req: Request, res: Response): Promise<Response> => {
        try {
            const feedbacks = await FeedbackModel.find();
            return res.status(200).json(feedbacks);
        } catch (error) {
            console.error("Error fetching feedback questions:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },
    updateFeedBackQuestion : async (req: Request, res: Response): Promise<Response> => {
        try {
            const { question, quesId  } = req.body;
            if(!question || !quesId) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const updatedFeedback = await FeedbackModel.findByIdAndUpdate(quesId , { question }, { new: true });
            if (!updatedFeedback) {
                return res.status(404).json({ message: "Feedback entry not found." });
            }
    
            return res.status(200).json({ message: "Feedback entry updated successfully." });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    },
    deleteFeedBackQuestion : async (req: Request, res: Response): Promise<Response> => {
        try {
            const { quesId} = req.body;
            const deletedFeedback = await FeedbackModel.findByIdAndDelete(quesId);    
            if (!deletedFeedback) {
                return res.status(404).json({ message: "Feedback entry not found." });
            }    
            return res.status(200).json({ message: "Feedback entry deleted successfully." });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    },
    feedbacks : async (req: Request, res: Response): Promise<Response> => {
        try {
            const page=req.query.page || 1;
            const limit=20;
            const skip=(parseInt(page as string)-1)*limit;
            const feedbacks = await FeedbackResponseModel.find().skip(skip).limit(limit)
            .populate({
                path: 'student',
                select: 'name studentNumber gender residency branch email phone' 
            }).lean().exec();

            return res.status(200).json(feedbacks);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }   
}

export default feedbackController;