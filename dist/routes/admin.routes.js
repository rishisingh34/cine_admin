"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controllers_1 = __importDefault(require("../controllers/admin.controllers"));
const router = (0, express_1.Router)();
router.post('/addStudent', admin_controllers_1.default.addStudent);
router.patch('/updateQuestion', admin_controllers_1.default.updateQuestion);
router.delete('/deleteQuestion', admin_controllers_1.default.deleteQuestion);
router.post('/addQuestion', admin_controllers_1.default.addQuestion);
router.get('/questions', admin_controllers_1.default.questions);
router.get('/getStudentTypes', admin_controllers_1.default.getStudentTypes);
router.get('/students', admin_controllers_1.default.students);
router.get('/responses', admin_controllers_1.default.responses);
exports.default = router;
