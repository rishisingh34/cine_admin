import { Router } from "express";
import adminController from "../controllers/admin.controllers";
const router = Router();

router.post('/addStudent',  adminController.addStudent);
router.patch('/updateQuestion', adminController.updateQuestion);
router.delete('/deleteQuestion', adminController.deleteQuestion);
router.post('/addQuestion', adminController.addQuestion);
router.get('/questions',  adminController.questions ); 
router.get('/getStudentTypes',  adminController.getStudentTypes) ; 
router.get('/students', adminController.students)

export default router;