import express from 'express';
const router=express.Router();
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getCompany, getCompanyById, registercompany, updateCompany } from '../controllers/company.controller.js';
import { singleUpload } from '../middlewares/multer.js';

router.route("/register").post(isAuthenticated,registercompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById)
router.route("/update/:id").put(isAuthenticated, singleUpload,updateCompany);

export default router;