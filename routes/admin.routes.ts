import { Router } from "express";
import adminController from "../controllers/admin.controllers";
import auth from "../middleware/auth.middleware";   
const router = Router();

router.post('login', adminController.login); 
router.post('addStudent',auth, adminController.addStudent);


export default router;