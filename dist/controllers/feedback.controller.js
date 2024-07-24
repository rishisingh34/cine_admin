"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_model_1 = __importDefault(require("../models/feedback.model"));
const feedbackResponse_model_1 = __importDefault(require("../models/feedbackResponse.model"));
const feedbackController = {
    addFeedBackQuestion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { question } = req.body;
            if (!question) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const newFeedback = new feedback_model_1.default({
                question
            });
            yield newFeedback.save();
            return res.status(201).json({ message: "Feedback question added successfully." });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }),
    getFeedBackQuestions: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const feedbacks = yield feedback_model_1.default.find();
            return res.status(200).json(feedbacks);
        }
        catch (error) {
            console.error("Error fetching feedback questions:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }),
    updateFeedBackQuestion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { question, quesId } = req.body;
            if (!question || !quesId) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const updatedFeedback = yield feedback_model_1.default.findByIdAndUpdate(quesId, { question }, { new: true });
            if (!updatedFeedback) {
                return res.status(404).json({ message: "Feedback entry not found." });
            }
            return res.status(200).json({ message: "Feedback entry updated successfully." });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }),
    deleteFeedBackQuestion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { quesId } = req.body;
            const deletedFeedback = yield feedback_model_1.default.findByIdAndDelete(quesId);
            if (!deletedFeedback) {
                return res.status(404).json({ message: "Feedback entry not found." });
            }
            return res.status(200).json({ message: "Feedback entry deleted successfully." });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }),
    feedbacks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = req.query.page || 1;
            const limit = 20;
            const skip = (parseInt(page) - 1) * limit;
            const feedbacks = yield feedbackResponse_model_1.default.find().skip(skip).limit(limit)
                .populate({
                path: 'student',
                select: 'name studentNumber gender residency branch email phone'
            }).lean().exec();
            return res.status(200).json(feedbacks);
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    })
};
exports.default = feedbackController;
