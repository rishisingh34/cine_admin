import Admin from '../models/admin.model';
import { Request, Response } from 'express';
import crypto from "crypto";
import Question from '../models/question.model';
import StudentModel from "../models/student.model";
import ResponseModel from '../models/response.model';
import Visited from '../models/visited.model';
import Token from '../middleware/token.middleware';
import {sendPassword} from "../utils/mailer";

const adminController = {
    login: async (req: Request, res: Response): Promise<Response> => {
        try {
            const { username, password }: { username: string; password: string } = req.body;
            const admin= await Admin.findOne({ username, password });

            if (!admin) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            const accessToken = Token.signAccessToken(admin.id);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return res.status(200).json({ message: "Login Successful" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
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
    updateQuestion: async(req:Request,res:Response):Promise<Response>=>{
        try {
            const {questionnId,question,options,answer} = req.body;
            const questionExists = await Question.findOneAndUpdate({quesId:questionnId},{question,options,answer});
            if(!questionExists){
                return res.status(400).json({message:"Question does not exist."});
            }
            return res.status(200).json({message:"Question updated successfully."});
        }
        catch(error){
            return res.status(500).json({message:"internal server error"});
        }
    }
}

export default adminController;
