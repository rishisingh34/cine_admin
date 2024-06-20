import { Request, Response } from 'express';
import Question from '../models/question.model';
import ResponseModel from '../models/response.model';
import Visited from '../models/visited.model';
import Token from '../middleware/token.middleware';
import Admin from '../models/admin.model';

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
    }
}

export default adminController;
