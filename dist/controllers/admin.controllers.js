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
const crypto_1 = __importDefault(require("crypto"));
const question_model_1 = require("../models/question.model");
const mailer_1 = require("../utils/mailer");
const student_model_1 = __importDefault(require("../models/student.model"));
const response_model_1 = __importDefault(require("../models/response.model"));
const console_1 = require("console");
const adminController = {
    addStudent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, studentNumber, branch, gender, residency, email, phone } = req.body;
            const studentExists = yield student_model_1.default.findOne({ studentNumber });
            if (studentExists) {
                return res.status(400).json({ message: "Student already exists." });
            }
            const password = crypto_1.default.randomBytes(8).toString('hex');
            const student = new student_model_1.default({
                name,
                studentNumber,
                branch,
                gender,
                residency,
                email,
                phone,
                password,
                isVerified: true
            });
            yield student.save();
            yield (0, mailer_1.sendPassword)(email, studentNumber, password);
            return res.status(201).json({ message: "Student registered successfully." });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }),
    addQuestion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { question, options, subject, answer } = req.body;
            if (!question || !options || !subject || !answer) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const newQuestion = new question_model_1.Question({
                subject,
                question,
                options,
                answer
            });
            yield newQuestion.save();
            return res.status(201).json({ message: "Question added successfully" });
        }
        catch (err) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }),
    updateQuestion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { quesId, question, options, subject, answer } = req.body;
            if (!question || !options || !subject || !answer) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const updatedQuestion = yield question_model_1.Question.findByIdAndUpdate(quesId, { question, options, subject, answer });
            if (!updatedQuestion) {
                return res.status(404).json({ message: "Question does not exist." });
            }
            return res.status(200).json({ message: "Question updated successfully." });
        }
        catch (error) {
            return res.status(500).json({ message: "internal server error" });
        }
    }),
    deleteQuestion: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { quesId } = req.body;
            const questionExists = yield question_model_1.Question.findByIdAndDelete(quesId);
            if (!questionExists) {
                return res.status(400).json({ message: "Question does not exist." });
            }
            return res.status(200).json({ message: "Question deleted successfully." });
        }
        catch (error) {
            return res.status(500).json({ message: "internal server error" });
        }
    }),
    questions: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const questions = yield question_model_1.Question.find({});
            const groupedQuestions = questions.reduce((acc, question) => {
                const key = question.subject;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(question);
                return acc;
            }, {});
            return res.status(200).json(groupedQuestions);
        }
        catch (err) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }),
    students: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = req.query.page || 1;
            const limit = 20;
            const skip = (parseInt(page) - 1) * limit;
            const students = yield student_model_1.default.find({ isVerified: true }).select('-password -_id').skip(skip).limit(limit);
            return res.status(200).json(students);
        }
        catch (err) {
            return res.status(500).json({ message: "Internal server error." });
        }
    }),
    getStudentTypes: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let boysHostelCount = 0;
            let girlsHostelCount = 0;
            let boysDayScholarCount = 0;
            let girlsDayScholarCount = 0;
            const students = yield student_model_1.default.find();
            students.forEach(student => {
                if (student.gender === 'Male' && student.residency === 'Hostel') {
                    boysHostelCount++;
                }
                else if (student.gender === 'Female' && student.residency === 'Hostel') {
                    girlsHostelCount++;
                }
                else if (student.gender === 'Male' && student.residency === 'Day Scholar') {
                    boysDayScholarCount++;
                }
                else if (student.gender === 'Female' && student.residency === 'Day Scholar') {
                    girlsDayScholarCount++;
                }
            });
            res.status(200).json({
                boysHostel: boysHostelCount,
                girlsHostel: girlsHostelCount,
                boysDayScholar: boysDayScholarCount,
                girlsDayScholar: girlsDayScholarCount,
            });
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    responses: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { studentNumber } = req.body;
            const student = yield student_model_1.default.findOne({ studentNumber });
            if (!student) {
                return res.status(400).json({ message: "Student does not exist." });
            }
            const responses = yield response_model_1.default.find({ userId: student._id }).populate({ path: 'quesId', select: 'question subject options status answer -_id' }).select('-_id -userId -__v');
            const groupedQuestions = responses.reduce((acc, response) => {
                if (response.quesId && response.quesId.subject) {
                    const key = response.quesId.subject;
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(response);
                }
                return acc;
            }, {});
            return res.status(200).json(groupedQuestions);
        }
        catch (err) {
            (0, console_1.log)(err);
            return res.status(500).json({ message: "Internal server error." });
        }
    })
};
exports.default = adminController;
