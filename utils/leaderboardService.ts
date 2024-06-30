import mongoose, { Types, PipelineStage } from 'mongoose';
import ResponseModel from '../models/response.model'; 
import Student from '../models/student.model'

interface IStudentLeaderboard {
  name: string;
  studentNumber: string;
  gender: string;
  branch: string;
  residency: string;
  score: number;
}

async function calculateLeaderboard(): Promise<IStudentLeaderboard[]> {
  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: 'questions', 
        localField: 'quesId',
        foreignField: 'quesId',
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

  const results = await ResponseModel.aggregate(pipeline).exec();
  return results as IStudentLeaderboard[];
}

export default calculateLeaderboard;