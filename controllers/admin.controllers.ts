import { Request, Response } from 'express';
import crypto from "crypto";
import Question from '../models/question.model';   
import {sendPassword} from "../utils/mailer";
import StudentModel from '../models/student.model'
import { log } from 'console';

const adminController = {
    addStudent: async(req:Request,res:Response):Promise<Response>=>{
        try {
            const {name,studentNumber,branch,gender,residency,email,phone} = req.body;
            const studentExists = await StudentModel.findOne({studentNumber});
            if(studentExists){
                return res.status(400).json({message:"Student already exists."});
            }
            const password:string= crypto.randomBytes(8).toString('hex');
            const student = new StudentModel({
                name,
                studentNumber,
                branch,
                gender,
                residency,
                email,
                phone,
                password,
                isVerified:true
            });
            await student.save();
            await sendPassword(email,studentNumber,password);
            return res.status(201).json({message:"Student registered successfully."});
        } catch (error) {
            return res.status(500).json({message:"Internal server error."});
        }
    },
    addQuestion : async (req:Request,res:Response):Promise<Response>=>{
        try {
            const {question , options , subject, answer } = req.body;
            if (!question || !options || !subject || !answer) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const newQuestion = new Question({
                subject,
                question,
                options,
                answer
              });
        
              await newQuestion.save();
        
              return res.status(201).json({ message: "Question added successfully" });
        } catch (err) {
            return res.status(500).json({message:"Internal server error."});            
        }
    },
    updateQuestion: async(req:Request,res:Response):Promise<Response>=>{
        try {
            const {quesId,question,options,subject , answer} = req.body;
            if (!question || !options || !subject || !answer) {
                return res.status(400).json({ message: "All fields are required." });
            }
            const updatedQuestion = await Question.findByIdAndUpdate(quesId , {question,options,subject,answer});            
            if (!updatedQuestion) {
                return res.status(404).json({ message: "Question does not exist." });
            }    
            return res.status(200).json({message:"Question updated successfully."});
        }
        catch(error){
            return res.status(500).json({message:"internal server error"});
        }
    },
    deleteQuestion: async(req:Request,res:Response):Promise<Response>=>{
        try {
            const {quesId} = req.body;
            const questionExists = await Question.findByIdAndDelete(quesId);
            if(!questionExists){
                return res.status(400).json({message:"Question does not exist."});
            }
            return res.status(200).json({message:"Question deleted successfully."});
        }
        catch(error){
            return res.status(500).json({message:"internal server error"});
        }
    },
    questions : async (req : Request, res : Response ) : Promise<Response>  => {
        try {
            const questions = await Question.find({});
            const groupedQuestions=questions.reduce((acc,question)=>{
                const key=question.subject;
                if(!acc[key]){
                    acc[key]=[];
                }
                acc[key].push(question);
                return acc;
            },{} as {[key: string]: any});
            return res.status(200).json(groupedQuestions);
        } catch (err) {
            return res.status(500).json({message:"Internal server error."});
        }
    },
    students : async (req : Request, res : Response ) : Promise<Response> => {
        try {
            const students = await StudentModel.find().select('-password -_id'); 
            return res.status(200).json(students);
        } catch (err) {
            return res.status(500).json({message:"Internal server error."});
        }
    }, 
    getStudentTypes : async (req: Request, res: Response) => {
        try {
            let boysHostelCount = 0;
            let girlsHostelCount = 0;
            let boysDayScholarCount = 0;
            let girlsDayScholarCount = 0;
    
            const students = await StudentModel.find();
            students.forEach(student => {
                if (student.gender === 'Male' && student.residency === 'Hostel') {
                    boysHostelCount++;
                } else if (student.gender === 'Female' && student.residency === 'Hostel') {
                    girlsHostelCount++;
                } else if (student.gender === 'Male' && student.residency === 'Day Scholar') {
                    boysDayScholarCount++;
                } else if (student.gender === 'Female' && student.residency === 'Day Scholar') {
                    girlsDayScholarCount++;
                }
            });
            res.status(200).json({
                boysHostel: boysHostelCount,
                girlsHostel: girlsHostelCount,
                boysDayScholar: boysDayScholarCount,
                girlsDayScholar: girlsDayScholarCount,
            });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default adminController;