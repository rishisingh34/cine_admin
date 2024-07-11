"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedback_controller_1 = __importDefault(require("../controllers/feedback.controller"));
const router = (0, express_1.Router)();
router.post('/addFeedBackQuestion', feedback_controller_1.default.addFeedBackQuestion);
router.get('/getFeedBackQuestions', feedback_controller_1.default.getFeedBackQuestions);
router.patch('/updateFeedBackQuestion', feedback_controller_1.default.updateFeedBackQuestion);
router.delete('/deleteFeedBackQuestion', feedback_controller_1.default.deleteFeedBackQuestion);
router.get('/feedbacks', feedback_controller_1.default.feedbacks);
exports.default = router;
