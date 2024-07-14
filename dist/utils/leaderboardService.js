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
const response_model_1 = __importDefault(require("../models/response.model"));
function calculateLeaderboard() {
    return __awaiter(this, void 0, void 0, function* () {
        const pipeline = [
            {
                $lookup: {
                    from: 'questions',
                    localField: 'quesId',
                    foreignField: '_id',
                    as: 'questionDetails',
                },
            },
            {
                $unwind: '$questionDetails',
            },
            {
                $project: {
                    userId: 1,
                    isCorrect: {
                        $cond: [{ $eq: ['$ansId', '$questionDetails.answer'] }, 4, 0],
                    },
                },
            },
            {
                $group: {
                    _id: '$userId',
                    totalScore: { $sum: '$isCorrect' },
                },
            },
            {
                $lookup: {
                    from: 'students',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'studentDetails',
                },
            },
            {
                $unwind: '$studentDetails',
            },
            {
                $project: {
                    name: '$studentDetails.name',
                    studentNumber: '$studentDetails.studentNumber',
                    gender: '$studentDetails.gender',
                    branch: '$studentDetails.branch',
                    residency: '$studentDetails.residency',
                    score: '$totalScore',
                },
            },
            {
                $sort: { score: -1 },
            },
        ];
        const results = yield response_model_1.default.aggregate(pipeline).exec();
        return results;
    });
}
exports.default = calculateLeaderboard;
