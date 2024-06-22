import { Router } from "express";
import feedbackController from "../controllers/feedback.controller";
import auth from "../middleware/auth.middleware";   
const router = Router();

router.post('/addFeedBackQuestion',auth, feedbackController.addFeedBackQuestion);
router.post('/updateFeedBackQuestion',auth, feedbackController.updateFeedBackQuestion);
router.post('/deleteFeedBackQuestion',auth, feedbackController.deleteFeedBackQuestion);
// router.get('/feedbacks', feedbackController.feedbacks );

export default router;