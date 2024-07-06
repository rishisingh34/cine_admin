import { Router } from "express";
import feedbackController from "../controllers/feedback.controller";
const router = Router();

router.post('/addFeedBackQuestion', feedbackController.addFeedBackQuestion);
router.get('/getFeedBackQuestions',  feedbackController.getFeedBackQuestions);
router.patch('/updateFeedBackQuestion', feedbackController.updateFeedBackQuestion);
router.delete('/deleteFeedBackQuestion', feedbackController.deleteFeedBackQuestion);
router.get('/feedbacks', feedbackController.feedbacks );

export default router;