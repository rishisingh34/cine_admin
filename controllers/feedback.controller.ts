import { Request, Response } from 'express';
import FeedbackModel from '../models/feedback.model';

const feedbackController = {
    addFeedBackQuestion : async (req: Request, res: Response): Promise<Response> => {
        try {
            const { question, quesId } = req.body;
            const newFeedback= new FeedbackModel({
                question,
                quesId
            });
            await newFeedback.save();
    
            return res.status(201).json({ message: "Feedback question added successfully."});
        } catch (error) {
            console.error("Error adding feedback question:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },
    updateFeedBackQuestion : async (req: Request, res: Response): Promise<Response> => {
        try {
            const { question, quesNumber } = req.body;
            
            const updatedFeedback = await FeedbackModel.findOneAndUpdate({quesNumber }, { question }, { new: true });
            if (!updatedFeedback) {
                return res.status(404).json({ message: "Feedback entry not found." });
            }
    
            return res.status(200).json({ message: "Feedback entry updated successfully." });
        } catch (error) {
            console.error("Error updating feedback question:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },
    deleteFeedBackQuestion : async (req: Request, res: Response): Promise<Response> => {
        try {
            const { quesId} = req.body;
            const deletedFeedback = await FeedbackModel.findOneAndDelete({quesId});
    
            if (!deletedFeedback) {
                return res.status(404).json({ message: "Feedback entry not found." });
            }
    
            return res.status(200).json({ message: "Feedback entry deleted successfully." });
        } catch (error) {
            console.error("Error deleting feedback question:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },
}

export default feedbackController;