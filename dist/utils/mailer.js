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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPassword = exports.sendMail = void 0;
const nodemailer_1 = require("nodemailer");
const env_config_1 = require("../config/env.config");
const transporter = (0, nodemailer_1.createTransport)({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: env_config_1.EMAIL,
        pass: env_config_1.PASS,
    }
});
const sendMail = (to, link) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.sendMail({
            from: env_config_1.EMAIL,
            to,
            subject: "Verification Email",
            html: `Please click on the link to verify your email. <br> <a href=${link}>Click here</a>`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMail = sendMail;
const sendPassword = (to, studentNumber, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.sendMail({
            from: env_config_1.EMAIL,
            to,
            subject: "Login Credentials for CINE",
            html: `Thank you for registering in CINE. <br> Your login credentials are <br> Student Number: ${studentNumber} <br> password : ${password}. <br> Please keep it safe. <br> `
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendPassword = sendPassword;
